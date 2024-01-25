import { KeyCombos } from './KeyCombo.ts'
import { print, println, HIDE_CURSOR, SHOW_CURSOR, PREFIX, asPromptText, CLEAR_LINE, highlightText, createRenderer, moveCursor, PRIMARY_COLOR, RESET_COLOR, getConsoleSize } from './util.ts'
import { TextRange, textSearch } from './text-util.ts'

export interface ListOptions {
  /**
   * The maximum amount of items visible at one time.
   *
   * Default: The amount of items passed in.
   */
  windowSize?: number
  /**
   * The pattern to repeat for when there are more items either above or below
   * the current window.
   *
   * Default: `-`
   */
  moreContentPattern?: string
  /**
   * The pattern to repeat for when there are no additional items either above
   * or below the current window.
   *
   * Default: `=`
   */
  noMoreContentPattern?: string
  /**
   * Whether or not to offset the selected item while going through the item
   * list. If there are more items above or below (if enabled) it will select
   * the next to last or first of the window always leaving 1 item offset if
   * more items are available.
   *
   * Default: `true`
   */
  offsetWindowScroll?: boolean
  /**
   * Should the options be able to be filtered.
   *
   * With filtering enabled any key the user is inputting will go into a search
   * field. The list will then filter the options by their label.
   *
   * This option accepts an object for more granular control of the filtering
   * and sorting of the results.
   *
   * Default: `false`
   */
  filtering?: Partial<TextFilteringOptions> | boolean
  /**
   * Place all options on one line with a separator between.
   *
   * When the inline mode is enabled the up and down actions are replaced with
   * left and right.
   *
   * Default: `false`
   */
  inline?: Partial<InlineOptions> | boolean
}

export interface InlineOptions {
  /**
   * The separator that will appear in between items in the list.
   *
   * Default: `/`
   */
  separator: string
}

export interface TextFilteringOptions {
  /**
   * Specify how to sort the filtered list.
   *
   * - `none` specifies that the ordering should not change from what was
   *   specified by the option list.
   * - `rank` specifies that the items will be sorted by the specificity of the
   *   matched values. Higher match equals higher rank / further up the list.
   *
   * Default: `rank`
   */
  sorting: 'none' | 'rank'
  /**
   * Should the matching parts of the labels be highlighted.
   *
   * Default: `false`
   */
  highlight: boolean
  /**
   * Should the options that does not match still be in the list.
   *
   * Default: `true`
   */
  showOnlyMatching: boolean
  /**
   * When searching should the search string contents also match on letter casing.
   *
   * Default: `false`
   */
  matchCase: boolean
}

const DEFAULT_TEXT_FILTERING: TextFilteringOptions = {
  sorting: 'rank',
  highlight: false,
  showOnlyMatching: true,
  matchCase: false
}

const DEFAULT_INLINE: InlineOptions = {
  separator: '/'
}

const DEFAULT_NO_MORE_CONTENT_PATTERN = '='
const DEFAULT_MORE_CONTENT_PATTERN = '-'
const CURSOR_CHARACTER = '>'
const NON_CURSOR_CHARACTER = ' '
const LINE_COLOR_CURSOR = PRIMARY_COLOR
const LINE_COLOR_UNSELECTED = '\x1b[90m'

/**
 * Creates a list of selectable items from which one item can be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
 *
 * The options parameter can also be a plain object where the key is the label and the value is the
 * result.
 *
 * This control supports filtering by the label set by the option. To get started with the default
 * configuration set the `filtering` list option to true. It will try to match the characters
 * input with the label values.
 *
 * The filtering has support to be able to search by exact label value, highlight the sections on
 * the label that is matching the string, only sort the options by the string instead to removing
 * the non matching options, and sort the options by specificity rank or the specified manual sorting.
 *
 * Controls:
 * - `Ctrl+c` will have the question canceled and return `undefined`.
 * - `Ctrl+d` will exit the whole script no questions asked with a `Deno.exit()`.
 * - `Up` arrow will move the selected item up once if able.
 * - `Down` arrow will move the selected item down once if able.
 * - `Home` will move the selected item up to the start if able.
 * - `End` will move the selected item down to the end if able.
 * - `PageUp` will move the selected item up by the actual list window size if able.
 * - `PageDown` will move the selected item down by the actual list window size if able.
 * - `Enter` will return the currently selected item.
 *
 * Requires `--unstable` until Deno version 1.27.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The selected option or `undefined` if canceled or empty.
 */
export default async function list<T = string>(label: string, options: string[] | Record<string, T>, listOptions?: ListOptions): Promise<T | undefined> {
  const possibleOptions: { label: string, value: T, id: string, matchingTextRanges: TextRange[] }[] = []
  if (Array.isArray(options)) options.forEach((value, index) => possibleOptions.push({
    value: value as unknown as T,
    label: value,
    id: '' + index,
    matchingTextRanges: []
  }))
  else Object.entries(options).forEach(([label, value], index) => possibleOptions.push({
    value,
    label,
    id: '' + index,
    matchingTextRanges: []
  }))

  if (possibleOptions.length === 0) return undefined
  let searchText = ''
  let searchTextIndex = 0
  let selectedIndex = 0
  let indexOffset = 0
  let printedLines = 1
  let visibleOptions = possibleOptions
  const filteringOptions: TextFilteringOptions = Object.assign(
    {},
    DEFAULT_TEXT_FILTERING,
    typeof listOptions?.filtering === 'object'
      ? listOptions?.filtering ?? {}
      : {}
  )
  const inlineOptions: InlineOptions = Object.assign(
    {},
    DEFAULT_INLINE,
    typeof listOptions?.inline === 'object'
      ? listOptions?.inline ?? {}
      : {}
  )
  const inlineEnabled = listOptions?.inline === true || typeof listOptions?.inline === 'object'
  const filteringEnabled = listOptions?.filtering === true || typeof listOptions?.filtering === 'object'
  const desiredWindowSize = Math.min(possibleOptions.length, Math.max(1, listOptions?.windowSize ?? possibleOptions.length))
  const noMoreContentPattern = listOptions?.noMoreContentPattern ?? DEFAULT_NO_MORE_CONTENT_PATTERN
  const moreContentPattern = listOptions?.moreContentPattern ?? DEFAULT_MORE_CONTENT_PATTERN
  const longestItemLabelLength = Math.max(15, possibleOptions.map(it => it.label.length).sort((a, b) => b - a)[0] + 4)
  if (!filteringEnabled) await print(HIDE_CURSOR)
  return createRenderer({
    label,
    onExit: () => print(SHOW_CURSOR),
    clear: () => {
      if (filteringEnabled) {
        return print(moveCursor(printedLines - 1, 'down') + (CLEAR_LINE + moveCursor(1, 'up')).repeat(printedLines - 1) + CLEAR_LINE)
      } else {
        return print((CLEAR_LINE + moveCursor(1, 'up')).repeat(printedLines - 1) + CLEAR_LINE)
      }
    },
    async prompt() {
    if (inlineEnabled) {
      let out = PREFIX + asPromptText(label)
      for (let index = 0; index < possibleOptions.length; index++) {
        const option = possibleOptions[index]
        const lineColor = selectedIndex === indexOffset + index ? LINE_COLOR_CURSOR : LINE_COLOR_UNSELECTED
        const label = option.label
        out += `${lineColor}${label}${RESET_COLOR}${index + 1 === possibleOptions.length ? '' : inlineOptions.separator}`
      }
      await print(out)
    } else {
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const showNarrowWindow = actualWindowSize < visibleOptions.length
        const len = Math.min(actualWindowSize, visibleOptions.length)

        let out = PREFIX + asPromptText(label)
        if (filteringEnabled) {
          out += `[${(visibleOptions.length+'').padStart((''+possibleOptions.length).length)}/${possibleOptions.length}] Search: ${searchText}`
        }
        const promptLineLength = 3 + label.length + (!filteringEnabled ? 0 : 12 + (''+possibleOptions.length).length * 2)
        out += '\n'
        if (showNarrowWindow) {
          if (indexOffset !== 0) out += moreContentPattern.repeat(Math.ceil(longestItemLabelLength / moreContentPattern.length)).slice(0, longestItemLabelLength) + '\n'
          else out += noMoreContentPattern.repeat(Math.ceil(longestItemLabelLength / noMoreContentPattern.length)).slice(0, longestItemLabelLength) + '\n'
        }

        for (let index = 0; index < len; index++) {
          const option = visibleOptions[indexOffset + index]
          const lineColor = selectedIndex === indexOffset + index ? LINE_COLOR_CURSOR : LINE_COLOR_UNSELECTED
          const current = selectedIndex === indexOffset + index
            ? CURSOR_CHARACTER
            : NON_CURSOR_CHARACTER
          let label = option.label
          if (filteringEnabled && filteringOptions.highlight)
          for (const match of option.matchingTextRanges.reverse()) {
            const before = label.slice(0, match.start)
            const after = label.slice(match.end)
            label = before + highlightText(label.slice(match.start, match.end), { underline: true, shouldHighlight: false }) + lineColor + after
          }
          out += `${lineColor}${current} ${label}${RESET_COLOR}${index + 1 === len ? '' : '\n'}`
        }

        if (showNarrowWindow) {
          if (indexOffset + actualWindowSize !== visibleOptions.length) out += '\n' + moreContentPattern.repeat(Math.ceil(longestItemLabelLength / moreContentPattern.length)).slice(0, longestItemLabelLength)
          else out += '\n' + noMoreContentPattern.repeat(Math.ceil(longestItemLabelLength / noMoreContentPattern.length)).slice(0, longestItemLabelLength)
        }
        printedLines = len + 1 + (showNarrowWindow ? 2 : 0)
        if (filteringEnabled) {
          out += moveCursor(len > 0 ? printedLines - 1 : 1, 'up') + moveCursor(500, 'left') + moveCursor(promptLineLength + searchTextIndex, 'right')
        }
        await print(out)
      }
    },
    actions: [
      [KeyCombos.parse('up'), async ({clear,prompt}) => {
        if (inlineEnabled) return
        const newIndex = Math.min(Math.max(selectedIndex - 1, 0), visibleOptions.length - 1)
        if (newIndex === selectedIndex) return
        selectedIndex = newIndex

        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (listOptions?.offsetWindowScroll ?? true)

        if (offsetWindowScroll && selectedIndex !== 0) indexOffset = selectedIndex - 1 < indexOffset ? selectedIndex - 1 : indexOffset
        else indexOffset = selectedIndex < indexOffset ? selectedIndex : indexOffset
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('down'), async ({clear,prompt}) => {
        if (inlineEnabled) return
        const newIndex = Math.min(Math.max(selectedIndex + 1, 0), visibleOptions.length - 1)
        if (newIndex === selectedIndex) return
        selectedIndex = newIndex

        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (listOptions?.offsetWindowScroll ?? true)

        if (offsetWindowScroll && selectedIndex !== visibleOptions.length - 1) indexOffset = selectedIndex >= indexOffset + actualWindowSize - 2 ? selectedIndex - actualWindowSize + 2 : indexOffset
        else indexOffset = selectedIndex >= indexOffset + actualWindowSize - 1 ? selectedIndex - actualWindowSize + 1 : indexOffset
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('home'), async ({clear,prompt}) => {
        const newIndex = 0
        if (newIndex === selectedIndex) return
        selectedIndex = newIndex
        indexOffset = 0
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('end'), async ({clear,prompt}) => {
        const newIndex = visibleOptions.length - 1
        if (newIndex === selectedIndex) return
        selectedIndex = newIndex
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        indexOffset = Math.max(0, newIndex - actualWindowSize + 1)
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('pageup'), async ({clear,prompt}) => {
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const newIndex = Math.max(0, selectedIndex - actualWindowSize)

        if (newIndex === selectedIndex) return
        selectedIndex = newIndex
        indexOffset = newIndex
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('pagedown'), async ({clear,prompt}) => {
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (listOptions?.offsetWindowScroll ?? true)

        const newIndex = Math.min(visibleOptions.length - 1, selectedIndex + actualWindowSize)
        if (newIndex === selectedIndex) return

        selectedIndex = newIndex
        indexOffset = Math.min(visibleOptions.length - actualWindowSize - 1, newIndex)
        if (indexOffset === visibleOptions.length - actualWindowSize - 1 && offsetWindowScroll) {
          indexOffset += 1
        }
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('enter'), async ({clear}) => {
        await clear()
        await println(PREFIX + asPromptText(label) + highlightText(visibleOptions[selectedIndex].label))
        return { result: visibleOptions[selectedIndex].value }
      }],
      // Search Input
      [KeyCombos.parse('left'), async ({clear,prompt}) => {
        if (inlineEnabled) {
          const newIndex = Math.min(Math.max(selectedIndex - 1, 0), visibleOptions.length - 1)
          if (newIndex === selectedIndex) return
          selectedIndex = newIndex

          await clear()
          await prompt()
        } else {
          if (!filteringEnabled) return
          if (searchText.length === 0) return
          const newIndex = Math.min(Math.max(searchTextIndex - 1, 0), searchText.length)
          if (newIndex === searchTextIndex) return
          searchTextIndex = newIndex
          await clear()
          updateOptions()
          await prompt()
        }
      }],
      [KeyCombos.parse('right'), async ({clear,prompt}) => {
        if (inlineEnabled) {
          const newIndex = Math.min(Math.max(selectedIndex + 1, 0), visibleOptions.length - 1)
          if (newIndex === selectedIndex) return
          selectedIndex = newIndex

          await clear()
          await prompt()
        } else {
          if (!filteringEnabled) return
          if (searchText.length === 0) return
          const newIndex = Math.min(Math.max(searchTextIndex + 1, 0), searchText.length)
          if (newIndex === searchTextIndex) return
          searchTextIndex = newIndex
          await clear()
          updateOptions()
          await prompt()
        }
      }],
      [KeyCombos.parse('backspace'), async ({clear,prompt}) => {
        if (!filteringEnabled) return
        if (searchText.length === 0) return
        if (searchTextIndex === 0) return
        searchText = searchText.slice(0, searchTextIndex - 1) + searchText.slice(searchTextIndex)
        searchTextIndex--
        await clear()
        updateOptions()
        await prompt()
      }],
      [KeyCombos.parse('delete'), async ({clear,prompt}) => {
        if (!filteringEnabled) return
        if (searchText.length === 0) return
        if (searchTextIndex === searchText.length) return
        searchText = searchText.slice(0, searchTextIndex) + searchText.slice(searchTextIndex + 1)
        await clear()
        updateOptions()
        await prompt()
      }],
    ],
    async defaultAction(keypress, options) {
      if (filteringEnabled && !keypress.ctrlKey && !keypress.metaKey && keypress.keyCode !== undefined) {
        searchText = searchText.slice(0, searchTextIndex) + keypress.sequence + searchText.slice(searchTextIndex)
        searchTextIndex++
        await options.clear()
        updateOptions()
        await options.prompt()
      }
    }
  })

  function updateOptions() {
    selectedIndex = 0
    indexOffset = 0
    if (searchText.trim() === '') return visibleOptions = possibleOptions
    const results = textSearch(searchText, possibleOptions, {
      transformer: item => item.label,
      matchCase: filteringOptions.matchCase
    })
    const intermediate = filteringOptions.sorting === 'rank'
      ? results.slice().sort((a, b) => b.specificityScore - a.specificityScore)
      : results

    const finalList = filteringOptions.showOnlyMatching
      ? intermediate.filter(result => result.specificityScore > 0)
      : intermediate

    visibleOptions = finalList.map(result => Object.assign({}, result.item, { matchingTextRanges: result.matches }))
  }
}

import { KeyCombos } from './KeyCombo.ts'
import { print, println, HIDE_CURSOR, SHOW_CURSOR, PREFIX, asPromptText, CLEAR_LINE, highlightText, createRenderer, PRIMARY_COLOR, RESET_COLOR, moveCursor, getConsoleSize } from './util.ts'
import { TextRange, textSearch } from "./text-util.ts";

interface Option<T> {
  id: string
  label: string
  value: T
  onSelect?(): string[]
  onDeselect?(id: string): boolean
  matchingTextRanges: TextRange[]
  display: string
  tags: string[]
}

const DEFAULT_NO_MORE_CONTENT_PATTERN = '='
const DEFAULT_MORE_CONTENT_PATTERN = '-'
const SELECTED_OPTION_CHARACTER = '☒'
const UNSELECTED_OPTION_CHARACTER = '☐'
const CURSOR_CHARACTER = '>'
const NON_CURSOR_CHARACTER = ' '
const LINE_COLOR_CURSOR = PRIMARY_COLOR
const LINE_COLOR_SELECTED = '\x1b[0m'
const LINE_COLOR_UNSELECTED = '\x1b[90m'

export interface CheckboxOptions {
  /**
   * The maximum amount of items visible at one time.
   *
   * Default: The amount of items passed in.
   */
  windowSize?: number
  /**
   * The pattern to repeat for when there are more items either above or below the current window.
   *
   * Default: `-`
   */
  moreContentPattern?: string
  /**
   * The pattern to repeat for when there are no additional items either above or below the current window.
   *
   * Default: `=`
   */
  noMoreContentPattern?: string
  /**
   * Whether or not to offset the selected item while going through the item list.
   * If there are more items above or below (if enabled) it will select the next to last
   * or first of the window always leaving 1 item offset if more items are available.
   *
   * Default: `true`
   */
  offsetWindowScroll?: boolean
  /**
   * Should the options be able to be filtered.
   *
   * With filtering enabled any key the user is inputting will go into a search field. The list will
   * then filter the options by their label.
   *
   * This option accepts an object for more granular control of the filtering and sorting of the results.
   *
   * Default: `false`
   */
  filtering?: Partial<TextFilteringOptions> | boolean
}

export interface TextFilteringOptions {
  /**
   * Specify how to sort the filtered list.
   *
   * - `none` specifies that the ordering should not change from what was specified by the option list.
   * - `rank` specifies that the items will be sorted by the specificity of the matched values.
   *   Higher match equals higher rank / further up the list.
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

/**
 * Creates a list of selectable items from which one item will be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
 *
 * The options parameter can also be a plain object where the key is the label and the value is a
 * object definition how the option is represented in the list and with a value. The representation
 * keys are:
 * - `dependencies`: This is a value that takes a index, label, or a list of indices and labels to
 *   express the reliance of a different option. So whenever any dependant option is select this one
 *   is too. Same for deselects.
 * - `selected`: This makes the option selected by default. If the option depends on any other options
 *   They will also be selected.
 *
 * ```typescript
 * const options = {
 *   'Value 1': { value: 1 },
 *   'Value 2': { value: 2 },
 *   'Value 3': { value: 3 },
 * }
 * ```
 *
 * ```typescript
 * const options = {
 *   'Value 1': { value: 1 },
 *   'Value 2': { value: 2, dependencies: ['Value 1'] },
 *   'Value 3': { value: 3, selected: true },
 * }
 * ```
 *
 * This control supports filtering by the label set by the option. To get started with the default
 * configuration set the `filtering` checkbox option to true. It will try to match the characters
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
 * - `Space` will mark/unmark the selected item.
 * - `Enter` will return all marked items in a list.
 *
 * Requires `--unstable` until Deno version 1.27.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The marked options or `undefined` if canceled or empty.
 */
export default async function checkbox<T = string>(label: string, options: T[] | Record<string, ObjectOption<T>>, checkboxOptions?: CheckboxOptions): Promise<T[] | undefined> {
  const selectedIds: string[] = []
  const defaultSelected: string[] = []
  const possibleOptions: Option<T>[] = Array.isArray(options)
    ? getOptionsFromArray(options, defaultSelected)
    : getOptionsFromObject(options, defaultSelected)
  defaultSelected.forEach(select)

  if (possibleOptions.length == 0) return []
  let searchText = ''
  let searchTextIndex = 0
  let cursorIndex = 0
  let indexOffset = 0
  let printedLines = 1
  let visibleOptions = possibleOptions
  const filteringOptions: TextFilteringOptions = Object.assign(
    {},
    DEFAULT_TEXT_FILTERING,
    typeof checkboxOptions?.filtering === 'object'
      ? checkboxOptions?.filtering ?? {}
      : {}
  )
  const filteringEnabled = checkboxOptions?.filtering === true || typeof checkboxOptions?.filtering === 'object'
  const desiredWindowSize = Math.min(possibleOptions.length, Math.max(1, checkboxOptions?.windowSize ?? possibleOptions.length))
  const noMoreContentPattern = checkboxOptions?.noMoreContentPattern ?? DEFAULT_NO_MORE_CONTENT_PATTERN
  const moreContentPattern = checkboxOptions?.moreContentPattern ?? DEFAULT_MORE_CONTENT_PATTERN
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
        const lineColor =
          cursorIndex === indexOffset + index ? LINE_COLOR_CURSOR :
          selectedIds.includes(option.id) ? LINE_COLOR_SELECTED :
          LINE_COLOR_UNSELECTED
        const current = cursorIndex === indexOffset + index
          ? CURSOR_CHARACTER
          : NON_CURSOR_CHARACTER
        const selected = selectedIds.includes(option.id)
          ? SELECTED_OPTION_CHARACTER
          : UNSELECTED_OPTION_CHARACTER
        let label = option.label
        if (filteringEnabled && filteringOptions.highlight)
        for (const match of option.matchingTextRanges.reverse()) {
          const before = label.slice(0, match.start)
          const after = label.slice(match.end)
          label = before + highlightText(label.slice(match.start, match.end), { underline: true, shouldHighlight: false }) + lineColor + after
        }
        out += `${lineColor}${current} ${selected} ${label}${RESET_COLOR}${index + 1 === len ? '' : '\n'}`
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
    },
    actions: [
      [KeyCombos.parse('up'), async ({clear,prompt}) => {
        const newIndex = Math.min(Math.max(cursorIndex - 1, 0), visibleOptions.length - 1)
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (checkboxOptions?.offsetWindowScroll ?? true)

        if (offsetWindowScroll && cursorIndex !== 0) indexOffset = cursorIndex - 1 < indexOffset ? cursorIndex - 1 : indexOffset
        else indexOffset = cursorIndex < indexOffset ? cursorIndex : indexOffset
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('down'), async ({clear,prompt}) => {
        const newIndex = Math.min(Math.max(cursorIndex + 1, 0), visibleOptions.length - 1)
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex

        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (checkboxOptions?.offsetWindowScroll ?? true)

        if (offsetWindowScroll && cursorIndex !== visibleOptions.length - 1) indexOffset = cursorIndex >= indexOffset + actualWindowSize - 2 ? cursorIndex - actualWindowSize + 2 : indexOffset
        else indexOffset = cursorIndex >= indexOffset + actualWindowSize - 1 ? cursorIndex - actualWindowSize + 1 : indexOffset
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('home'), async ({clear,prompt}) => {
        const newIndex = 0
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        indexOffset = 0
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('end'), async ({clear,prompt}) => {
        const newIndex = visibleOptions.length - 1
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        indexOffset = Math.max(0, newIndex - actualWindowSize + 1)
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('pageup'), async ({clear,prompt}) => {
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const newIndex = Math.max(0, cursorIndex - actualWindowSize)

        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        indexOffset = newIndex
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('pagedown'), async ({clear,prompt}) => {
        const actualWindowSize = Math.min(desiredWindowSize, getConsoleSize().rows - 3)
        const offsetWindowScroll = actualWindowSize > 1 && (checkboxOptions?.offsetWindowScroll ?? true)

        const newIndex = Math.min(visibleOptions.length - 1, cursorIndex + actualWindowSize)
        if (newIndex === cursorIndex) return

        cursorIndex = newIndex
        indexOffset = Math.min(visibleOptions.length - actualWindowSize - 1, newIndex)
        if (indexOffset === visibleOptions.length - actualWindowSize - 1 && offsetWindowScroll) {
          indexOffset += 1
        }
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('Ctrl+a'), async ({clear,prompt}) => {
        if (visibleOptions.every(option => selectedIds.includes(option.id))) {
          for (const option of visibleOptions) {
            selectedIds.splice(selectedIds.indexOf(option.id), 1)
          }
        } else {
          visibleOptions
            .filter(option => !selectedIds.includes(option.id))
            .forEach(option => selectedIds.push(option.id))
        }
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('space'), async ({clear,prompt}) => {
        const option = visibleOptions[cursorIndex]
        if (selectedIds.includes(option.id)) deselect(option.id)
        else select(option.id)
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('enter'), async ({clear}) => {
        await clear()
        const result = selectedIds.map(id => possibleOptions.find(option => option.id === id)!)
        const text = result.length === 0
          ? highlightText('<empty>')
          : result.map(item => highlightText(item.display)).join(', ')
        await println(PREFIX + asPromptText(label) + text)
        return { result: result.map(it => it.value) }
      }],
      // Search Input
      [KeyCombos.parse('left'), async ({clear,prompt}) => {
        if (!filteringEnabled) return
        if (searchText.length === 0) return
        const newIndex = Math.min(Math.max(searchTextIndex - 1, 0), searchText.length)
        if (newIndex === searchTextIndex) return
        searchTextIndex = newIndex
        await clear()
        updateOptions()
        await prompt()
      }],
      [KeyCombos.parse('right'), async ({clear,prompt}) => {
        if (!filteringEnabled) return
        if (searchText.length === 0) return
        const newIndex = Math.min(Math.max(searchTextIndex + 1, 0), searchText.length)
        if (newIndex === searchTextIndex) return
        searchTextIndex = newIndex
        await clear()
        updateOptions()
        await prompt()
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
    cursorIndex = 0
    indexOffset = 0
    if (searchText.trim() === '') return visibleOptions = possibleOptions
    const results = textSearch(searchText, possibleOptions, {
      transformer: item => item.label + (item.tags.length ? '\t' + item.tags.join(' ') : ''),
      matchCase: filteringOptions.matchCase
    })
    const intermediate = filteringOptions.sorting === 'rank'
      ? results.slice().sort((a, b) => b.specificityScore - a.specificityScore)
      : results

    const finalList = filteringOptions.showOnlyMatching
      ? intermediate.filter(result => result.specificityScore > 0)
      : intermediate

    visibleOptions = finalList.map(result => Object.assign({}, result.item, {
      matchingTextRanges: result.matches.filter(it => it.start < result.item.label.length)
    }))
  }

  function select(id: string) {
    selectedIds.push(id)
    let onSelect: Option<T>['onSelect'] | undefined
    if (typeof (onSelect = possibleOptions.find(it => it.id === id)?.onSelect) === 'function') {
      for (const other of onSelect().filter(id => !selectedIds.includes(id))) {
        if (selectedIds.includes(other)) continue
        select(other)
      }
    }
  }

  function deselect(id: string) {
    selectedIds.splice(selectedIds.indexOf(id), 1)
    for (const selectedId of selectedIds.slice()) {
      let onDeselect: Option<T>['onDeselect'] | undefined
      if (typeof (onDeselect = possibleOptions.find(it => it.id === selectedId)?.onDeselect) === 'function') {
        if (onDeselect(id)) deselect(selectedId)
      }
    }
  }
}

function getOptionsFromArray<T>(options: T[], _defaultSelected: string[]): Option<T>[] {
  return options.map((value, index) => ({
    label: value as unknown as string,
    value,
    id: '' + index,
    matchingTextRanges: [],
    display: value as unknown as string,
    tags: []
  }))
}

export interface ObjectOption<T> {
  id?: string
  /** The value that is going to be returned if this item is selected. */
  value: T
  /** A label, index, or a list of labels and indexes for the items that this item requires to be selected. */
  dependencies?: string | number | (string | number)[]
  /** Set whether this option should be selected by default */
  selected?: boolean
  /** A string that will represent the value instead of the label when exiting the control. */
  display?: string
  /** A list of hidden tags that can also be used when filtering. */
  tags?: string[]
}

function getOptionsFromObject<T>(object: Record<string, ObjectOption<T>>, defaultSelected: string[]): Option<T>[] {
  return Object.entries(object).map(([label, objectOption], _, allEntries) => {
    const option: Option<T> = {
      label,
      value: objectOption.value,
      id: objectOption.id ?? label,
      matchingTextRanges: [],
      display: objectOption.display ?? label,
      tags: objectOption.tags ?? []
    }
    if (typeof objectOption.dependencies !== 'undefined') {
      let unparsedDeps: (string | number)[] = []
      if (typeof objectOption.dependencies === 'string') unparsedDeps.push(objectOption.dependencies)
      else if (typeof objectOption.dependencies === 'number') unparsedDeps.push(objectOption.dependencies)
      else if (Array.isArray(objectOption.dependencies) && objectOption.dependencies.every(dep => ['string', 'number'].includes(typeof dep))) {
        unparsedDeps = objectOption.dependencies
      }

      const deps = unparsedDeps
        .map(dep => typeof dep === 'number'
          ? (allEntries[dep]?.[1]?.id ?? allEntries[dep]?.[0])
          : (() => {
            const item = allEntries.find(([l, oo], index) => oo.id === dep || l === dep || String(index) === dep)
            return item?.[1]?.id ?? item?.[0]
          })())
        .filter(it => it !== option.id && it !== undefined)
        .map(id => String(id))
      option.onSelect = () => deps
      option.onDeselect = id => deps.includes(id)
    }
    if (objectOption.selected === true) defaultSelected.push(option.id)

    return option
  })
}

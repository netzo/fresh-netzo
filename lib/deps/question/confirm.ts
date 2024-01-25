import { KeyCombos } from './KeyCombo.ts'
import { print, println, PREFIX, asPromptText, CLEAR_LINE, highlightText, createRenderer, moveCursor } from './util.ts'
export interface ConfirmOptions {
  /**
   * The default or preferred action. Not specifying it indicates no preference
   * and a boolean of true is positive and a boolean of false is negative.
   */
  defaultValue?: boolean
  /** The text that indicates a positive response. Default is 'Yes' */
  positiveText?: string
  /** The text that indicates a negative response. Default is 'No' */
  negativeText?: string
}
/**
 * Create a confirmation question that resolves to a true or false based on user input. It
 * takes an `undefined`, `true`, or `false` value as the default value. Each of the default
 * value types has an effect on how the prompt looks like.
 *
 * - `undefined` will suffix the prompt with `[y/n]`
 * - `true` will suffix the prompt with `[Y/n]`
 * - `false` will suffix the prompt with `[y/N]`
 *
 * The only valid values are anything starting with y or n uppercase or lowercase. The y and
 * n is derived from the positive and negative labels. You can customize the labels in the
 * options object The prompt can be canceled and will then return `undefined`.
 *
 * Controls:
 * - `Ctrl+c` will have the question canceled and return `undefined`.
 * - `Ctrl+d` will exit the whole script no questions asked with a `Deno.exit()`.
 * - `Up` arrow or `Home` key will move the cursor to the start of the prompt text.
 * - `Down` arrow or `End` key will move the cursor to the end of the prompt text.
 * - `Left` arrow will move the cursor one step to the left once if able.
 * - `Right` arrow will move the cursor one step to the right once if able.
 * - `Enter` will return the parsed result of the text.
 *
 * Requires `--unstable` until Deno version 1.27.
 * @param label The label the question will have.
 * @param defaultValue The value that will determine the resulting value if none was provided.
 * @returns The boolean value from the answer or `undefined` if canceled.
 */
export default async function confirm(label: string, defaultValue?: boolean | ConfirmOptions | undefined): Promise<boolean | undefined> {
  let cursorIndex = 0
  const _positiveText = typeof defaultValue === 'object' && typeof defaultValue.positiveText !== 'undefined' ? defaultValue.positiveText : 'Yes'
  const _negativeText = typeof defaultValue === 'object' && typeof defaultValue.negativeText !== 'undefined' ? defaultValue.negativeText : 'No'
  const positiveText = _positiveText.substring(0, 1).toUpperCase() + _positiveText.substring(1).toLowerCase()
  const negativeText = _negativeText.substring(0, 1).toUpperCase() + _negativeText.substring(1).toLowerCase()
  const _defaultValue = typeof defaultValue === 'boolean' || typeof defaultValue === 'undefined' ? defaultValue : defaultValue.defaultValue
  const positiveChar = _defaultValue === true ? positiveText[0] : positiveText[0].toLowerCase()
  const negativeChar = _defaultValue === false ? negativeText[0] : negativeText[0].toLowerCase()
  const prompt = label + ` [${positiveChar}/${negativeChar}]`
  let text = ''
  return createRenderer({
    label,
    clear: () => print(CLEAR_LINE),
    prompt: () => print(PREFIX + asPromptText(prompt) + text + moveCursor(Math.abs(cursorIndex - text.length), 'left')),
    actions: [
      [KeyCombos.parse('left'), async ({clear,prompt}) => {
        if (text.length === 0) return
        const newIndex = Math.min(Math.max(cursorIndex - 1, 0), text.length)
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('right'), async ({clear,prompt}) => {
        if (text.length === 0) return
        const newIndex = Math.min(Math.max(cursorIndex + 1, 0), text.length)
        if (newIndex === cursorIndex) return
        cursorIndex = newIndex
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('up|home'), async ({clear,prompt}) => {
        if (text.length === 0) return
        if (cursorIndex === 0) return
        cursorIndex = 0
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('down|end'), async ({clear,prompt}) => {
        if (text.length === 0) return
        if (cursorIndex === text.length) return
        cursorIndex = text.length
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('backspace'), async ({clear,prompt}) => {
        if (text.length === 0) return
        if (cursorIndex === 0) return
        text = text.slice(0, cursorIndex - 1) + text.slice(cursorIndex)
        cursorIndex--
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('delete'), async ({clear,prompt}) => {
        if (text.length === 0) return
        if (cursorIndex === text.length) return
        text = text.slice(0, cursorIndex) + text.slice(cursorIndex + 1)
        await clear()
        await prompt()
      }],
      [KeyCombos.parse('enter'), async ({clear}) => {
        const trimmed = text.trimLeft()
        const result = trimmed[0] === undefined
          ? typeof defaultValue === 'boolean'
            ? defaultValue
            : undefined
          : trimmed[0].toLowerCase() === positiveChar.toLowerCase()
            ? true
            : trimmed[0].toLowerCase() === negativeChar.toLowerCase()
              ? false
              : undefined
        if (result === undefined) return
        await clear()
        await println(PREFIX + asPromptText(label) + highlightText(result ? positiveText : negativeText))
        return { result }
      }]
    ],
    async defaultAction(keypress, options) {
      if (!keypress.ctrlKey && !keypress.metaKey && keypress.keyCode !== undefined) {
        text = text.slice(0, cursorIndex) + keypress.sequence + text.slice(cursorIndex)
        cursorIndex++
        await options.clear()
        await options.prompt()
      }
    }
  })
}

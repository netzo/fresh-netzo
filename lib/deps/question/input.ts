import { KeyCombos } from './KeyCombo.ts'
import { print, println, PREFIX, asPromptText, CLEAR_LINE, highlightText, createRenderer, moveCursor } from './util.ts'

/**
 * Create a generic text input question requesting the user to input text in a free form format.
 * A default value can be provided and if the free form text input is blank that value will be
 * used instead.
 *
 * Controls:
 * - `Ctrl+c` will have the question canceled and return `undefined`.
 * - `Ctrl+d` will exit the whole script no questions asked with a `Deno.exit()`.
 * - `Up` arrow or `Home` key will move the cursor to the start of the prompt text.
 * - `Down` arrow or `End` key will move the cursor to the end of the prompt text.
 * - `Left` arrow will move the cursor one step to the left once if able.
 * - `Right` arrow will move the cursor one step to the right once if able.
 * - `Enter` will return the test inputted or the provided default value.
 *
 * Requires `--unstable` until Deno version 1.27.
 * @param label The label the question will have.
 * @param defaultValue The value that will determine the resulting value if none was provided.
 * @returns The answer text, default value text, or `undefined` if canceled.
 */
export default async function input(label: string, defaultValue?: string | undefined): Promise<string | undefined> {
  let cursorIndex = 0
  const prompt = asPromptText(label) + (typeof defaultValue === 'string' ? '[' + defaultValue + '] ' : '')
  let text = ''
  return createRenderer({
    label,
    clear: () => print(CLEAR_LINE),
    prompt: () => print(PREFIX + prompt + text + moveCursor(Math.abs(cursorIndex - text.length), 'left')),
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
        const trimmed = text.trim()
        const result = trimmed.length === 0 ? defaultValue ?? trimmed : trimmed
        await clear()
        await println(PREFIX + asPromptText(label) + highlightText(result.length === 0 ? '<empty>' : result))
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

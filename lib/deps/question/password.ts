import { KeyCombos } from './KeyCombo.ts'
import { print, println, PREFIX, asPromptText, CLEAR_LINE, highlightText, createRenderer, moveCursor } from './util.ts'

/**
 * Creates a free form text input that does not print the characters normally printed by the `input`
 * prompt. The characters are substituted for a substitute string you can provide. If the substitute
 * parameter is a boolean false no substitute characters will be printed.
 *
 * The substitute string if longer than 1 character can be called a pattern and will also be printed
 * in that pattern. So if you have a pattern of `<>` and that length of the text i 5 the substitution
 * will look like `<><><`.
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
 * @param substitute The substitution string or boolean indicating if you want a substitution string.
 * @returns The answer text or `undefined` if canceled.
 */
export default async function password(label: string, substitute?: boolean | string): Promise<string | undefined> {
  let cursorIndex = 0
  const prompt = label
  const sub = substitute === false ? '' : substitute === true || substitute === undefined ? '*' : substitute
  let text = ''
  return createRenderer({
    label,
    clear: () => print(CLEAR_LINE),
    prompt: () => print(PREFIX + asPromptText(prompt) + (sub.length === 0 ? '' : sub.repeat(Math.ceil(text.length / sub.length)).slice(0, text.length)) + moveCursor(sub.length === 0 ? 0 : Math.abs(cursorIndex - text.length), 'left')),
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
        await clear()
        await println(PREFIX + asPromptText(label) + highlightText('<hidden>'))
        return { result: text }
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

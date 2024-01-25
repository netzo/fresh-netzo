// NOTE: vendors question module since it hasn't received updates since 0.0.2
// and Deno >= 1.4 has deprecated several API methods (e.g. Deno.{stdin/stdout}) which
// is causing the question module to throw many warnings, so we vendor what's needed
// export { default as question } from "https://deno.land/x/question@0.0.2/mod.ts";

import confirm, { ConfirmOptions } from './confirm.ts'
import checkbox, { CheckboxOptions, ObjectOption } from './checkbox.ts'
import list, { ListOptions } from './list.ts'
import input from './input.ts'
import password from './password.ts'
import questionConfig, { setQuestionConfig } from './config.ts';
import { UnsupportedDenoVersionError } from "./util.ts";

export { setQuestionConfig } from './config.ts';
export type { Config } from './config.ts';
export type { ConfirmOptions } from './confirm.ts'
export type { CheckboxOptions, ObjectOption } from './checkbox.ts'
export type { ListOptions } from './list.ts'

/**
 * Creates a list of selectable items from which one item can be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
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
 * @param type The list type.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The selected option or `undefined` if canceled or empty.
 */
export function question(type: 'list', label: string, options: string[], listOptions?: ListOptions): Promise<string | undefined>;
/**
 * Creates a list of selectable items from which one item can be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
 *
 * The options parameter can also be a plain object where the key is the label and the value is the
 * result if that option was picked.
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
 * @param type The list type.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The selected option or `undefined` if canceled or empty.
 */
export function question<T>(type: 'list', label: string, options: Record<string, T>, listOptions?: ListOptions): Promise<T | undefined>;
/**
 * Creates a list of selectable items from which one item will be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
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
 * - `Ctrl+a` will select/deselect all options.
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
 * @param type The checkbox type.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The marked options or `undefined` if canceled or empty.
 */
export function question(type: 'checkbox', label: string, options: string[], checkboxOptions?: CheckboxOptions): Promise<string[] | undefined>;
/**
 * Creates a list of selectable items from which one item will be chosen. If no items are available
 * to be selected this will return `undefined` without a question prompt.
 *
 * The options parameter is a plain object where the key is the label and the value is a
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
 * - `Ctrl+a` will select/deselect all options.
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
 * @param type The checkbox type.
 * @param label The label the question will have.
 * @param options The options the user has to choose from.
 * @returns The marked options or `undefined` if canceled or empty.
 */
export function question<T>(type: 'checkbox', label: string, options: Record<string, ObjectOption<T>>, checkboxOptions?: CheckboxOptions): Promise<T[] | undefined>;
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
 * @param type The confirm type.
 * @param label The label the question will have.
 * @param defaultValue The value that will determine the resulting value if none was provided.
 * @returns The boolean value from the answer or `undefined` if canceled.
 */
export function question(type: 'confirm', label: string, defaultValue?: boolean | ConfirmOptions | undefined): Promise<boolean | undefined>;
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
 * @param type The input type.
 * @param label The label the question will have.
 * @param defaultValue The value that will determine the resulting value if none was provided.
 * @returns The answer text, default value text, or `undefined` if canceled.
 */
export function question(type: 'input', label: string, defaultValue?: string | undefined): Promise<string | undefined>;
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
 * @param type The password type.
 * @param label The label the question will have.
 * @param substitute The substitution string or boolean indicating if you want a substitution string.
 * @returns The answer text or `undefined` if canceled.
 */
export function question(type: 'password', label: string, substitute?: boolean | string | undefined): Promise<string | undefined>;
export function question(type: string, ...opts: any[]): Promise<any | undefined> {
  switch (type) {
    case 'list': return list(...(opts as Parameters<typeof list>))
    case 'confirm': return confirm(...(opts as Parameters<typeof confirm>))
    case 'checkbox': return checkbox(...(opts as Parameters<typeof checkbox>))
    case 'input': return input(...(opts as Parameters<typeof input>))
    case 'password': return password(...(opts as Parameters<typeof password>))
    default: throw new Error(`Unsupported type: ${type}`)
  }
}

export { questionConfig };

const [major, minor, _patch] = Deno.version.deno.split('.').map(it => parseInt(it))

export interface ConfigureForUnixPipesOptions {
  /** From where the input will be received. */
  input: string
  /** From where the prompts will output. */
  output: string
  /** How to handle the lack of permission to use any of the resources specified by `input` or `output`. Default panic. */
  mode: 'fallback' | 'panic'
  /** If the program lacks permission for a resource should we prompt for the use of that resource. Default true */
  promptPermissionRequest: boolean
}

/**
 * Will configure the output and input used by the prompts to not use stdin and stdout files.
 *
 * If no options are specified it will choose /dev/tty as its file to output and input. If only one
 * option is specified it will be used as its input AND output.
 *
 * By default it will panic if the program does not get permission from the user to read or write to
 * the files specified in the options. This can change to a fallback mode where if the program does
 * not get permission it will use the default.
 *
 * @param param0 The options to use when executing.
 */
export async function configureForUnixPipes({ input, output, mode, promptPermissionRequest }: Partial<ConfigureForUnixPipesOptions> = {}) {
  if (major >= 1 && minor >= 27) {
    //@ts-ignore Unsupported API
    if (typeof Deno.setRaw !== 'function' || Deno.setRaw.length < 2) {
      throw new UnsupportedDenoVersionError("This version does not have a general setRaw for any resource id. Do only use stdin. https://github.com/denoland/deno/issues/15796")
    }
    //@ts-ignore Unsupported API
    if (typeof Deno.consoleSize !== 'function' || Deno.consoleSize.length < 1) {
      throw new UnsupportedDenoVersionError("This version does not have a general setRaw for any resource id. Do only use stdin. https://github.com/denoland/deno/issues/15796")
    }
  }
  const permissionMode = mode ?? 'panic'
  if (input === undefined) {
    input = output ?? '/dev/tty'
  }
  if (output === undefined || input === output) {
    if (await hasResourcePermission(input, { read: true, write: true, prompt: promptPermissionRequest ?? true })) {
      const r = await Deno.open(input, { read: true, write: true })
      setQuestionConfig({
        keypressReader: r,
        writer: r
      })
      globalThis.addEventListener('unload', () => r.close())
    } else if (permissionMode === 'panic') {
      throw new Error(`Did not get permission to read and write from ` + input)
    }
  } else {
    if (await hasResourcePermission(input, { read: true, write: false, prompt: promptPermissionRequest ?? true })) {
      const r = await Deno.open(input, { read: true })
      setQuestionConfig({ keypressReader: r })
      globalThis.addEventListener('unload', () => r.close())
    } else {
      throw new Error(`Did not get permission to read from ` + input)
    }
    if (await hasResourcePermission(output, { read: false, write: true, prompt: promptPermissionRequest ?? true })) {
      const r = await Deno.open(output, { write: true })
      setQuestionConfig({ keypressReader: r })
      globalThis.addEventListener('unload', () => r.close())
    } else if (permissionMode === 'panic') {
      throw new Error(`Did not get permission to write from ` + output)
    }
  }
}

async function hasResourcePermission(file: string, { read, write, prompt }: { read: boolean, write: boolean, prompt: boolean }) {
  if (read) {
    const status = await Deno.permissions.query({ name: 'read', path: file })
    if (status.state === 'prompt' && prompt) {
      const newStatus = await Deno.permissions.request({ name: 'read', path: file })
      if (newStatus.state !== 'granted') return false
    } else if (status.state !== 'granted') return false
  }
  if (write) {
    const status = await Deno.permissions.query({ name: 'write', path: file })
    if (status.state === 'prompt' && prompt) {
      const newStatus = await Deno.permissions.request({ name: 'write', path: file })
      if (newStatus.state !== 'granted') return false
    } else if (status.state !== 'granted') return false
  }
  return true
}
import { Keypress } from 'https://deno.land/x/keypress@0.0.7/mod.ts'
const keyToEventKeyMap = [
  ['Escape', 'Esc'],
  [' ', 'Space'],
  ['ArrowLeft', 'Left'],
  ['ArrowRight', 'Right'],
  ['ArrowUp', 'Up'],
  ['ArrowDown', 'Down'],
  ['Enter', 'Return'],
  ['Add', 'Plus', '+'],
  ['Subtract', 'Minus', '-'],
  ['Multiply', 'Times', '*'],
  ['Divide', 'Div', '/'],
  ['Decimal', '.'],
  ['Separator', ','],
].reduce((map, combinations) => {
  for (const item of combinations) {
    ;(map[item.toLowerCase()] = map[item.toLowerCase()] || []).push(...combinations.map(it => it.toLowerCase()))
  }
  return map
}, {} as Record<string, string[]>)

interface KeyComboParams {
  /** If the ctrl key must be present or absent. */
  ctrl?: boolean
  /** If the shift key must be present or absent. */
  shift?: boolean
  /** If the alt/option key must be present or absent. */
  alt?: boolean
  /** If the command/super/win key must be present or absent. */
  meta?: boolean
  /** The key name that must be percent or absent. */
  key?: string
}

/**
 * A class that represents a key combination of modifier keys
 * and maybe a normal key.
 *
 * @see KeyCombo.parse
 */
export default class KeyCombo {
  readonly ctrl: boolean;
  readonly shift: boolean;
  readonly alt: boolean;
  readonly meta: boolean;
  readonly key: string;
  /**
   * Creates a new KeyCombo instance.
   */
  constructor({ ctrl, shift, alt, meta, key }: KeyComboParams = {}) {
    this.ctrl = ctrl ?? false
    this.shift = shift ?? false
    this.alt = alt ?? false
    this.meta = meta ?? false
    this.key = key ?? ''

    // if (this.alt) throw new Error('The Alt/Option key is not supported!')
  }

  get option() {
    return this.alt
  }
  get command() {
    return this.meta
  }
  get win() {
    return this.meta
  }
  get super() {
    return this.meta
  }

  /**
   * Parses a key combination from a string. The string should be in a format of
   * modifier keys and then an actual key. To separate different keys use a plus
   * (`+`). Modifier keys are `Ctrl`, `Shift`, `Alt` (`Option`), and the meta key.
   * The meta modifier key is represented as windows logo, or on mac the text
   * command, can be represented as `Command`, `Super`, or `Win`.
   *
   * @example
   * ```javascript
   * const combinations = [
   *   KeyCombo.parse('Ctrl+s'),
   *   KeyCombo.parse('Ctrl'),
   *   KeyCombo.parse('Ctrl+Shift+Esc'),
   *   KeyCombo.parse('Ctrl+Alt+Delete'),
   * ]
   * ```
   *
   * @param str The key combination string.
   * @returns The key combination instance parsed from the string.
   */
  static parse(str: string): KeyCombo {
    let ctrl = false
    let shift = false
    let alt = false
    let meta = false
    const key = str
      .replace(/\s*ctrl\s*(?:\+\s*|$)/i, () => (ctrl = true,''))
      .replace(/\s*shift\s*(?:\+\s*|$)/i, () => (shift = true,''))
      .replace(/\s*(?:alt|option)\s*(?:\+\s*|$)/i, () => (alt = true,''))
      .replace(/\s*(?:meta|super|win|command|cmd)\s*(?:\+\s*|$)/i, () => (meta = true,''))
      .trim()

    return new KeyCombo({ ctrl, shift, alt, meta, key })
  }

  /**
   * Test this key combination against a keyboard event. These events might come
   * from events such as `keydown` and `keyup`.
   * @example
   * ```javascript
   * const saveKeyCombo = KeyCombo.parse('Ctrl+S')
   * if (saveKeyCombo.test(keypress)) {
   *   event.preventDefault()
   *   console.log('Saving...')
   * }
   * ```
   * @param event The event to test this key combo against.
   * @returns True if the keys in the event matches the key combo.
   */
  test(event: Keypress): boolean {
    return (
      this.ctrl === event.ctrlKey &&
      this.shift === event.shiftKey &&
      this.meta === event.metaKey &&
      (this.key
        ? this.key === event.key || (keyToEventKeyMap[this.key.toLowerCase()] || []).includes(event.key?.toLowerCase() ?? '')
        : true)
    )
  }

  /** Get the string parts for a Windows system of this key combo. */
  getStringPartsWindows() {
    return [this.ctrl && 'Ctrl', this.meta && 'Win', this.shift && 'Shift', this.alt && 'Alt', this.key].filter(Boolean)
  }

  /** Get a string representation of this key combination for Windows systems. */
  toStringWindows() {
    return this.getStringPartsWindows().join('+')
  }

  /** Get the string parts for a Linux / Unix system of this key combo. */
  getStringPartsLinux() {
    return [this.ctrl && 'Ctrl', this.meta && 'Super', this.shift && 'Shift', this.alt && 'Alt', this.key].filter(Boolean)
  }

  /** Get a string representation of this key combination for Linux / Unix systems. */
  toStringLinux() {
    return this.getStringPartsLinux().join('+')
  }

  /** Get the string parts for a MacOS system of this key combo. */
  getStringPartsMac() {
    return [this.ctrl && 'Ctrl', this.meta && 'Command', this.shift && 'Shift', this.alt && 'Option', this.key].filter(Boolean)
  }

  /** Get a string representation of this key combination for MacOS systems. */
  toStringMac() {
    return this.getStringPartsMac().join('+')
  }

  /** Get the string parts for this key combo. */
  getStringParts() {
    if (Deno.build.os === 'windows') return this.getStringPartsWindows()
    if (Deno.build.os === 'linux') return this.getStringPartsLinux()
    return this.getStringPartsMac()
  }

  /** Get the string representation for this key combo. */
  toString() {
    return this.getStringParts().join('+')
  }

  toJSON() {
    return {
      ctrl: this.ctrl,
      shift: this.shift,
      alt: this.alt,
      meta: this.meta,
      key: this.key,
    }
  }

  /**
   * Creates a KeyCombo instance from a keyboard event.
   * @param event A keyboard event.
   */
  static from(event: Keypress): KeyCombo {
    return new KeyCombo({ ctrl: event.ctrlKey, shift: event.shiftKey, meta: event.metaKey, key: event.key })
  }
}

export class KeyCombos {
  constructor(private combos: readonly KeyCombo[]) {}

  test(event: Keypress): boolean {
    return this.combos.some(combo => combo.test(event))
  }

  static parse(str: string) {
    const combos = str.split('|').map(KeyCombo.parse)
    return new KeyCombos(combos)
  }
}

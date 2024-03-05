import KeyCombo, { KeyCombos } from "./KeyCombo.ts";
import {
  decodeKeypress,
  Keypress,
} from "keypress/mod.ts";
import { config as questionConfig } from "./config.ts";

const [major, minor, _patch] = Deno.version.deno.split(".").map((it) =>
  parseInt(it)
);

export const PRIMARY_COLOR = "\x1b[94m";
export const RESET_COLOR = "\x1b[0m";
export const HIDE_CURSOR = "\x1b[?25l";
export const SHOW_CURSOR = "\x1b[?25h";
export const CLEAR_LINE = "\x1b[500D\x1b[K";
export const MOVE_UP_1 = "\x1b[1A";
export const PREFIX = "\x1b[32m?\x1b[0m ";
export function asPromptText(text: string, reset: boolean = true) {
  if (reset) return `\x1b[0;1m${text}\x1b[0m `;
  return `\x1b[0;1m${text} `;
}
type LuminosityType = "light" | "dark";
type ColorType =
  | "grey"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "cyan";
type Color = `${LuminosityType}${Capitalize<ColorType>}`;
const FOREGROUND_COLORS: { [C in Color]: number } = {
  darkGrey: 30,
  darkRed: 31,
  darkYellow: 32,
  darkGreen: 33,
  darkBlue: 34,
  darkPurple: 35,
  darkCyan: 36,
  lightGrey: 90,
  lightRed: 91,
  lightYellow: 92,
  lightGreen: 93,
  lightBlue: 94,
  lightPurple: 95,
  lightCyan: 96,
};

const BACKGROUND_COLORS: { [C in Color]: number } = {
  darkGrey: 40,
  darkRed: 41,
  darkYellow: 42,
  darkGreen: 43,
  darkBlue: 44,
  darkPurple: 45,
  darkCyan: 46,
  lightGrey: 100,
  lightRed: 101,
  lightYellow: 102,
  lightGreen: 103,
  lightBlue: 104,
  lightPurple: 105,
  lightCyan: 106,
};

interface TextOptions {
  noReset?: boolean;
  shouldHighlight?: boolean;
  underline?: boolean;
  dim?: boolean;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  inverse?: boolean;
  hidden?: boolean;
  blinking?: boolean;
  foregroundColor?: Color;
  backgroundColor?: Color;
}

export function text(text: string, options?: TextOptions) {
  if (options === undefined || options.shouldHighlight === false) return text;
  let codes = "";
  if (options.bold) codes += "1;";
  if (options.dim) codes += "2;";
  if (options.italic) codes += "3;";
  if (options.underline) codes += "4;";
  if (options.blinking) codes += "5;";
  if (options.inverse) codes += "7;";
  if (options.hidden) codes += "8;";
  if (options.strikethrough) codes += "9;";
  if (options.foregroundColor) {
    codes += FOREGROUND_COLORS[options.foregroundColor] + ";";
  }
  if (options.backgroundColor) {
    codes += BACKGROUND_COLORS[options.backgroundColor] + ";";
  }
  if (codes === "") return text;
  return "\x1b[" + codes.slice(0, -1) + "m" + text + RESET_COLOR;
}

export const PRIMARY_COLOR_NAME: Color = "lightBlue";
export function highlightText(
  text: string,
  {
    shouldHighlight = true,
    reset = true,
    underline = false,
    color = PRIMARY_COLOR_NAME,
  }: {
    shouldHighlight?: boolean;
    reset?: boolean;
    color?: Color;
    underline?: boolean;
  } = {},
) {
  const extra = (shouldHighlight ? "" : "\x1b[") + (underline ? "4" : "") +
    (shouldHighlight ? ";" : "m");
  if (shouldHighlight) {
    if (reset) {
      return "\x1b[" + extra + FOREGROUND_COLORS[color] + "m" + text +
        RESET_COLOR;
    }
    return "\x1b[" + extra + FOREGROUND_COLORS[color] + "m" + text;
  } else {
    if (reset) return extra + text + RESET_COLOR;
    return extra + text;
  }
}
const directionToSpecifier = {
  "up": "A",
  "down": "B",
  "left": "D",
  "right": "C",
};
export function moveCursor(
  amount: number,
  direction: keyof typeof directionToSpecifier,
) {
  return amount === 0 ? "" : `\x1b[${amount}${directionToSpecifier[direction]}`;
}
const encoder = new TextEncoder();
export function print(
  text: string,
  writer: Deno.Writer = questionConfig.writer,
) {
  return writer.write(encoder.encode(text));
}
export function println(
  text: string,
  writer: Deno.Writer = questionConfig.writer,
) {
  return writer.write(encoder.encode(text + "\n"));
}
export function getConsoleSize() {
  // if (major <= 1 && minor < 27) {
  //   //@ts-ignore Removed part of the API
  //   if (typeof Deno.consoleSize === 'function' && Deno.consoleSize.length === 1) {
  //     //@ts-ignore Removed part of the API
  //     return Deno.consoleSize(questionConfig.writer.rid)
  //   } else {
  //     throw new UnsupportedDenoVersionError("This version does not have a setRaw function")
  //   }
  // } else {
  //   if (questionConfig.writer.rid !== Deno.stdout.rid) {
  //     throw new UnsupportedDenoVersionError("This version does not have a general consoleSize for any resource id. Do only use stdout. https://github.com/denoland/deno/issues/15796")
  //   } else {
  //     return Deno.consoleSize()
  //   }
  // }

  // NOTE: disabled code above to avoid deprecated API warnings thrown on Deno>=1.4
  return Deno.consoleSize();
}
interface CreateRendererOptions<R> {
  label: string;
  prompt(): any | Promise<any>;
  clear(): any | Promise<any>;
  actions: [
    KeyCombos,
    (
      options: CreateRendererOptions<R>,
    ) => void | { result: R } | Promise<void | { result: R }>,
  ][];
  defaultAction?(
    keypress: Keypress,
    options: CreateRendererOptions<R>,
  ): void | { result: R } | Promise<void | { result: R }>;
  onExit?(): any | Promise<any>;
}
export async function createRenderer<R>(
  options: CreateRendererOptions<R>,
): Promise<R | undefined> {
  const cancelKeyCombo = KeyCombo.parse("Ctrl+c");
  const exitKeyCombo = KeyCombo.parse("Ctrl+d");

  if (options.onExit) {
    globalThis.addEventListener("unload", options.onExit);
  }
  await options.prompt();
  keys: for await (
    const keypress of readKeypress(questionConfig.keypressReader)
  ) {
    if (cancelKeyCombo.test(keypress)) {
      await options.clear();
      if (options.onExit) {
        await options.onExit();
        globalThis.removeEventListener("unload", options.onExit);
      }
      await println(
        PREFIX + asPromptText(options.label) + highlightText(`<cancel>`),
      );
      return undefined;
    } else if (exitKeyCombo.test(keypress)) {
      await options.clear();
      await println(
        PREFIX + asPromptText(options.label) + highlightText(`<force close>`),
      );
      Deno.exit(0);
    }

    for (const [keyCombos, handler] of options.actions) {
      if (keyCombos.test(keypress)) {
        const result = await handler(options);
        if (result === undefined) {
          continue keys;
        } else {
          if (options.onExit) {
            await options.onExit();
            globalThis.removeEventListener("unload", options.onExit);
          }
          return result.result;
        }
      }
    }
    if (options.defaultAction !== undefined) {
      const result = await options.defaultAction(keypress, options);
      if (result === undefined) {
        continue keys;
      } else {
        if (options.onExit) {
          await options.onExit();
          globalThis.removeEventListener("unload", options.onExit);
        }
        return result.result;
      }
    }
  }
}

interface RawReader extends Deno.Reader {
  readonly rid: number;
  setRaw(mode: boolean): void;
}

export class NotATTYError extends Error {
  name = "NotATTYError";
}

export class UnsupportedDenoVersionError extends Error {
  name = "UnsupportedDenoVersionError";
}

function createRawHandler(reader: Deno.Reader & { rid: number }): RawReader {
  // if (!Deno.isatty(reader.rid)) {
  //   throw new Error('The reader resource is not a TTY.')
  // }

  // if (major <= 1 && minor < 27) {
  //   //@ts-ignore Previous unstable API now removed
  //   if (typeof Deno.setRaw === 'function') {
  //     return {
  //       read: p => reader.read(p),
  //       rid: reader.rid,
  //       setRaw(raw) {
  //         //@ts-ignore Previous unstable API now removed
  //         Deno.setRaw(reader.rid, raw)
  //       },
  //     }
  //   } else {
  //     throw new UnsupportedDenoVersionError("This version does not have a setRaw function")
  //   }
  // } else {
  //   if (reader.rid !== Deno.stdin.rid) {
  //     throw new UnsupportedDenoVersionError("This version does not have a general setRaw for any resource id. Do only use stdin. https://github.com/denoland/deno/issues/15796")
  //   } else {
  //     return {
  //       read: p => reader.read(p),
  //       rid: reader.rid,
  //       setRaw(mode) {
  //         //@ts-ignore Previous unstable API now removed
  //         Deno.stdin.setRaw(mode, { cbreak: false })
  //       },
  //     }
  //   }
  // }

  // NOTE: disabled code above to avoid deprecated API warnings thrown on Deno>=1.4
  return {
    read: (p) => reader.read(p),
    setRaw(mode) {
      //@ts-ignore Previous unstable API now removed
      Deno.stdin.setRaw(mode, { cbreak: false });
    },
  } as RawReader;
}

/**
 * Read character sequence and decode it as keypress
 * @param reader - TTY reader
 * @param bufferLength - used because of opportunity to paste text in terminal
 */
export async function* readKeypress(
  reader: Deno.Reader & { rid: number },
  bufferLength = 1024,
): AsyncIterableIterator<Keypress> {
  const handler = createRawHandler(reader);

  while (true) {
    const buffer = new Uint8Array(bufferLength);
    handler.setRaw(true);
    const length = await handler.read(buffer);
    if (length === null) break;
    handler.setRaw(false);

    for (const event of decodeKeypress(buffer.subarray(0, length))) {
      yield event;
    }
  }
}

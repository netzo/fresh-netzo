import { blue, bold, green, red, yellow } from '../deps.ts'

export function printSuccess(message: string) {
  console.log(green(`${bold('success')}: ${message}`))
}

export function printInfo(message: string) {
  console.info(blue(`${bold('info')}: ${message}`))
}

export function printWarning(message: string) {
  console.warn(yellow(`${bold('warning')}: ${message}`))
}

export function printError(message: string) {
  console.error(red(`${bold('error')}: ${message}`))
}

export function error(message: string): never {
  printError(message)
  Deno.exit(1)
}

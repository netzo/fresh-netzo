import { existsSync } from "../../../deps/std/fs/exists.ts";
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const tsModule = await import("npm:tsx")
// let tsModule: any

// const tsRegister = async (mod = 'tsx') => (tsModule = tsModule || import(mod))

const extensionCheck = /(\.ts|\.js)$/
const getFileName = (file: string) => {
  if (extensionCheck.test(file)) {
    return file
  }

  if (existsSync(`${file}.js`)) {
    return `${file}.js`
  }

  if (existsSync(`${file}.ts`)) {
    return `${file}.ts`
  }

  return file
}

export const loadModule = async (file: string) => {
  const fileName = getFileName(file)

  console.log({ fileName })

  // if (fileName.endsWith('.ts')) {
  //   await tsRegister()
  // }

  return import(file)
}

export const listFiles = async (folder: string, extension?: string): Promise<string[]> => {
  const list = await readdir(folder, { withFileTypes: true })
  const fileNames = list.filter((file) => file.isFile()).map(({ name }) => path.resolve(folder, name))

  return extension ? fileNames.filter((name) => name.endsWith(extension)) : fileNames
}

export const listAllFiles = async (folder: string): Promise<string[]> => {
  const list = await readdir(folder, { withFileTypes: true })
  const nameList = await Promise.all(
    list.map((file) => {
      const fullName = path.resolve(folder, file.name)

      return file.isDirectory() ? listAllFiles(fullName) : fullName
    })
  )

  return nameList.flat().sort()
}

export const merge = (target: { [key: string]: any }, source: { [key: string]: any }) => {
  for (const key of Object.keys(source)) {
    const value = source[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = merge(target[key] || {}, value)
    } else {
      target[key] = value
    }
  }

  return target
}

export const formatString = (template: string, ...args: any[]) => template.replace(/%s/g, () => args.shift())
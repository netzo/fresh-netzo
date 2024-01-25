export interface Config {
  keypressReader: Deno.Reader & { rid: number },
  writer: Deno.Writer & { rid: number },
}

const questionConfig: Config = {
  keypressReader: Deno.stdin,
  writer: Deno.stdout,
}

/**
 * @deprecated Use setQuestionConfig(config)
 */
export default questionConfig;
export function setQuestionConfig(config: Partial<Config>) {
  if (config.keypressReader !== undefined) questionConfig.keypressReader = config.keypressReader
  if (config.writer !== undefined) questionConfig.writer = config.writer
}

export const config = questionConfig

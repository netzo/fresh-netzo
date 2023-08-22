export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface QueryChatCompletion {
  model: string;
  messages: Array<{
    role: "system" | "user" | "assistant" | "function";
    content: string;
    name?: string;
    function_call?: {};
  }>;
  functions?: Array<{
    name: string;
    description?: string;
    parameters: {};
  }>;
  function_call?: string;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: any;
  user?: string;
}

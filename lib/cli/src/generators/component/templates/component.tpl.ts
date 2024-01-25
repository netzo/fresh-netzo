import { toFile } from "../../../../../deps/@featherscloud/pinion.ts";
import { ComponentGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const componentTemplate = ({ pascalName, name }: ComponentGeneratorContext) =>
  /* ts */ `export type ${pascalName}Props = {};

export default function ${pascalName}(props: ${pascalName}Props) {
  return (
    <div>
      ${name}
    </div>
  );
}
`;

const islandTemplate = ({ pascalName }: ComponentGeneratorContext) =>
  /* ts */ `// [netzo] generated via https://netzo.io/docs/cli
import { useSignal } from "@preact/signals";

export type ${pascalName}Props = {};

export default function ${pascalName}(props: ${pascalName}Props) {
  const count = useSignal(0);

  return (
    <div>
      Counter is at {count}.{" "}
      <button onClick={() => (count.value += 1)}>+</button>
    </div>
  );
}
`;

export const generate = (ctx: ComponentGeneratorContext) =>
  Promise.resolve(ctx).then((ctx) => {
    if (ctx.language.startsWith("ts")) ctx.language = "tsx";
    else if (ctx.language.startsWith("js")) ctx.language = "jsx";
    return ctx;
  }).then(
    renderSource(
      (ctx) =>
        ({
          component: componentTemplate(ctx),
          island: islandTemplate(ctx),
        })[ctx.type],
      toFile<ComponentGeneratorContext>((
        { src, type, kebabName },
      ) => [src, `${type}s`, kebabName]),
    ),
  );

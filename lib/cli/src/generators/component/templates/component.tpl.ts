import { toFile } from "../../../../../deps/@featherscloud/pinion.ts";
import { ComponentGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const defaultTemplate = ({ pascalName, name }: ComponentGeneratorContext) =>
  /* ts */ `import { useSignal } from "@preact/signals";

export type ${pascalName}Props = {};

export default function ${pascalName}(props: ${pascalName}Props) {
  return (
    <div>
      ${name}
    </div>
  );
}
`;

export const generate = (ctx: ComponentGeneratorContext) =>
  Promise.resolve(ctx).then(
    renderSource(
      (ctx) => ({
        default: defaultTemplate(ctx)
      })[ctx.type],
      toFile<ComponentGeneratorContext>((
        { src, kebabName },
      ) => [src, "components", kebabName]),
    ),
  );

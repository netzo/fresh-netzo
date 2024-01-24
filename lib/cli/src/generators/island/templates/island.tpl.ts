import { toFile } from "../../../../../deps/@featherscloud/pinion.ts";
import { IslandGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const defaultTemplate = ({ pascalName }: IslandGeneratorContext) =>
  /* ts */ `import { useSignal } from "@preact/signals";

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

export const generate = (ctx: IslandGeneratorContext) =>
  Promise.resolve(ctx).then(
    renderSource(
      (ctx) => ({
        default: defaultTemplate(ctx),
      })[ctx.type],
      toFile<IslandGeneratorContext>((
        { src, kebabName },
      ) => [src, "islands", kebabName]),
    ),
  );

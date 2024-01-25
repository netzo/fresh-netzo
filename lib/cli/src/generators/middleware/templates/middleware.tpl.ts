import { toFile } from "../../../../../deps/@featherscloud/pinion.ts";
import { MiddlewareGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const syncTemplate = ({
  pascalName,
  name,
}: MiddlewareGeneratorContext) =>
  /* ts */ `TODO
`;

const asyncTemplate = ({
  pascalName,
  name,
}: MiddlewareGeneratorContext) =>
  /* ts */ `TODO
`;

export const generate = (ctx: MiddlewareGeneratorContext) =>
  Promise.resolve(ctx).then(
    renderSource(
      (ctx) =>
        ({
          sync: syncTemplate(ctx),
          async: asyncTemplate(ctx),
        })[ctx.type],
      toFile<MiddlewareGeneratorContext>((
        { src, kebabName },
      ) => [src, "middlewares", kebabName]),
    ),
  );

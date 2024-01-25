import { toFile } from "../../../../../deps/@featherscloud/pinion.ts";
import { RouteGeneratorContext } from "../mod.ts";
import { renderSource } from "../../commons.ts";

const uiSyncTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const uiAuiSyncTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const apiSyncTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const apiAuiSyncTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const layoutAppTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const layoutLayoutTemplate = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const error404Template = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

const error500Template = ({
  pascalName,
  name,
}: RouteGeneratorContext) =>
  /* ts */ `TODO
`;

export const generate = (ctx: RouteGeneratorContext) =>
  Promise.resolve(ctx).then(
    renderSource(
      (ctx) =>
        ({
          "ui:sync": uiSyncTemplate(ctx),
          "ui:async": uiAuiSyncTemplate(ctx),
          "api:sync": apiSyncTemplate(ctx),
          "api:async": apiAuiSyncTemplate(ctx),
          "layout:_app": layoutAppTemplate(ctx),
          "layout:_layout": layoutLayoutTemplate(ctx),
          "error:_404": error404Template(ctx),
          "error:_500": error500Template(ctx),
        })[ctx.type],
      toFile<RouteGeneratorContext>((
        { src, kebabName },
      ) => [src, "routes", kebabName]),
    ),
  );

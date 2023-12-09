import { z } from "../../deps/zod/mod.ts";

export const dataAddProductSchema = z.object({
  Unit: z.string(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  UnitCode: z.string().optional(),
  IdentificationNumber: z.string().optional(),
  CodeProdServ: z.string().optional(),
  NameCodeProdServ: z.string().optional(),
  CuentaPredial: z.string().optional(),
  Taxes: z
    .array(
      z.object({
        Name: z.string().optional(),
        Rate: z.number().optional(),
        IsRetention: z.boolean().optional(),
        IsFederalTax: z.boolean().optional(),
        Total: z.number().optional(),
      }),
    )
    .optional(),
});

export const productSchema = dataAddProductSchema.extend({
  Id: z.string(),
}).deepPartial();

export const dataUpdateProductSchema = dataAddProductSchema.deepPartial();

//types:

export type DataAddProduct = z.infer<typeof dataAddProductSchema>;
export type Product = z.infer<typeof productSchema>;
export type DataUpdateProduct = z.infer<typeof dataUpdateProductSchema>;

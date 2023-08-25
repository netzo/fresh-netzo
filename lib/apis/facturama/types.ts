import { z } from "../deps.ts";

export const queryAddProductSchema = z.object({
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

export const productSchema = queryAddProductSchema.extend({
  Id: z.string(),
}).deepPartial();

export const queryUpdateProductSchema = queryAddProductSchema.deepPartial();

//types:

export type QueryAddProduct = z.infer<typeof queryAddProductSchema>;
export type Product = z.infer<typeof productSchema>;
export type QueryUpdateProduct = z.infer<typeof queryUpdateProductSchema>;

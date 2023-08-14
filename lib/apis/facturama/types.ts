export interface QueryAddProduct {
  Unit: string;
  Name: string;
  Description: string;
  Price: number;
  UnitCode?: string;
  IdentificationNumber?: string;
  CodeProdServ?: string;
  NameCodeProdServ?: string;
  CuentaPredial?: string;
  Taxes?: Array<{
    Name?: string;
    Rate?: number;
    IsRetention?: boolean;
    IsFederalTax?: boolean;
    Total?: number;
  }>;
}

export interface Product extends Partial<QueryAddProduct> {
  Id: string;
}

export type QueryUpdateProduct = Partial<QueryAddProduct>;

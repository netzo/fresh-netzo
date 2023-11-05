import { defineRoute } from "$fresh/server.ts";
import Dashboard from "@/islands/Dashboard.tsx";
import { getData as getDoctors } from "@/components/tables/doctors/data/data.tsx";
import { getData as getPrescriptions } from "@/components/tables/prescriptions/data/data.tsx";
import { getData as getProducts } from "@/components/tables/products/data/data.tsx";
import { getData as getQuotes } from "@/components/tables/quotes/data/data.tsx";
import { getData as getInvoices } from "@/components/tables/invoices/data/data.tsx";
import { transactions } from "@/utils.tsx";

export default defineRoute(async (req, ctx) => {
  const [
    doctors,
    prescriptions,
    products,
    quotes,
    invoices,
  ] = await Promise.all([
    getDoctors(),
    getPrescriptions(),
    getProducts(),
    getQuotes(),
    getInvoices(),
  ]);

  return (
    <Dashboard
      {...{
        doctors,
        prescriptions,
        products,
        quotes,
        invoices,
        transactions,
      }}
    />
  );
});

import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  Charge,
  Customer,
  Invoice,
  Plan,
  QueryCharges,
  QueryCustomers,
  QueryInvoices,
  QueryPlans,
  QuerySubscriptionItems,
  QuerySubscriptions,
  QueryTransactions,
  Subscription,
  SubscriptionItem,
  Transaction,
} from "@/lib/apis/stripe/types.ts";

export interface StripeOptions {
  apiKey: string;
}

/**
 * SDK constructor function for the Stripe API
 *
 * @see https://netzo.io/docs/netzo/apis/stripe
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const stripe = ({
  apiKey = Deno.env.get("STRIPE_API_KEY")!,
}: StripeOptions) => {
  const api = createApi({
    baseURL: "https://api.stripe.com/v1",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "apiKey",
        value: apiKey,
      }, ctx);
    },
  });

  /**
   * Get subscriptions with optional query parameters
   */
  const getSubscriptions = async (
    query: QuerySubscriptions = {},
  ): Promise<Subscription[]> => {
    const result = await api.subscriptions.get(query);
    const subscriptions = result.map((item: any) => item.data);
    return subscriptions;
  };

  /**
   * Get subscription items that correspond to a specific subscription id
   */
  const getSubscriptionItems = async (
    query: QuerySubscriptionItems,
  ): Promise<SubscriptionItem[]> => {
    const result = await api.subscription_items.get(query);
    const subscriptionItems = result.map((item: any) => item.data);
    return subscriptionItems;
  };

  /**
   * Get customers with optional query parameters
   */
  const getCustomers = async (
    query: QueryCustomers = {},
  ): Promise<Customer[]> => {
    const result = await api.customers.get(query);
    const customers = result.map((item: any) => item.data);
    return customers;
  };

  /**
   * Get invoices with optional query parameters
   */
  const getInvoices = async (query: QueryInvoices = {}): Promise<Invoice[]> => {
    const result = await api.invoices.get(query);
    const invoices = result.map((item: any) => item.data);
    return invoices;
  };

  /**
   * Get charges with optional query parameters
   */
  const getCharges = async (query: QueryCharges = {}): Promise<Charge[]> => {
    const result = await api.charges.get(query);
    const charges = result.map((item: any) => item.data);
    return charges;
  };

  /**
   * Get plans with optional query parameters
   */
  const getPlans = async (query: QueryPlans = {}): Promise<Plan[]> => {
    const result = await api.plans.get(query);
    const plans = result.map((item: any) => item.data);
    return plans;
  };

  /**
   * Get transactions that have contributed to the Stripe account balance
   */
  const getBalanceTransactions = async (
    query: QueryTransactions = {},
  ): Promise<Transaction[]> => {
    const result = await api.balance_transactions.get(query);
    const transactions = result.map((item: any) => item.data);
    return transactions;
  };

  return {
    api,
    getSubscriptions,
    getSubscriptionItems,
    getCustomers,
    getInvoices,
    getCharges,
    getPlans,
    getBalanceTransactions,
  };
};

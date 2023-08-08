import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  AddOrUpdateCustomer,
  Customer,
  CustomerSpecific,
  Order,
  OrderByCustomer,
  OrderSpecific,
  OrderStatus,
  Payout,
  Product,
  ProductSpecific,
  QueryCustomers,
  QueryOrders,
  QueryPayouts,
  QueryProducts,
} from "@/lib/apis/shopify/types.ts";

export interface ShopifyOptions {
  storeName: string;
  apiVersion: string;
  apiKey: string;
}

/**
 * SDK constructor function for the Shopify Admin API
 *
 * @see https://netzo.io/docs/netzo/apis/shopify
 *
 * @param {string} storeName - the store name to construct the base URL
 * @param {string} apiVersion - the version to use for the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const shopify = ({
  storeName = Deno.env.get("SHOPIFY_STORE_NAME")!,
  apiVersion = Deno.env.get("SHOPIFY_API_VERSION")!,
  apiKey = Deno.env.get("SHOPIFY_API_KEY")!,
}: ShopifyOptions) => {
  const api = createApi({
    baseURL: `https://${storeName}.myshopify.com/admin/api/${apiVersion}`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "X-Shopify-Access-Token",
        value: apiKey,
      }, ctx);
    },
  });

  /**
   * Get customers from Shopify
   */
  const getCustomers = async (
    query: QueryCustomers = {},
  ): Promise<Customer[]> => {
    const result = await api["customers.json"].get(query);
    return result.customers;
  };

  /**
   * Get a single customer from Shopify
   */
  const getSingleCustomer = async (
    customerId: string,
    fields = "",
  ): Promise<CustomerSpecific> => {
    const result = await api.customers[`${customerId}.json`].get(fields);
    return result.customer;
  };

  /**
   * Get orders belonging to a specific customer from Shopify
   */
  const getCustomerOrders = async (
    customerId: string,
    status: OrderStatus = "any",
  ): Promise<OrderByCustomer[]> => {
    const result = await api.customers[`${customerId}`]["orders.json"].get(
      status,
    );
    return result.orders;
  };

  /**
   * Add a new customer in Shopify
   */
  const addCustomer = async (
    data: AddOrUpdateCustomer = {},
  ): Promise<CustomerSpecific> => {
    const result = await api["customers.json"].post(data);
    return result.customer;
  };

  /**
   * Update customer details in Shopify
   */
  const updateCustomer = async (
    customerId: string,
    data: AddOrUpdateCustomer = {},
  ): Promise<CustomerSpecific> => {
    const result = await api.customers[`${customerId}.json`].put(data);
    return result.customer;
  };

  /**
   * Get orders from Shopify
   */
  const getOrders = async (query: QueryOrders = {}): Promise<Order[]> => {
    const result = await api["orders.json"].get(query);
    return result.orders;
  };

  /**
   * Get a single order from Shopify
   */
  const getSingleOrder = async (
    orderId: string,
    fields = "",
  ): Promise<OrderSpecific> => {
    const result = await api.orders[`${orderId}.json`].get(fields);
    return result.order;
  };

  /**
   * Get products from Shopify
   */
  const getProducts = async (query: QueryProducts = {}): Promise<Product[]> => {
    const result = await api["products.json"].get(query);
    return result.products;
  };

  /**
   * Get a single product from Shopify
   */
  const getSingleProduct = async (
    productId: string,
    fields = "",
  ): Promise<ProductSpecific> => {
    const result = await api.products[`${productId}.json`].get(fields);
    return result.product;
  };

  /**
   * Get payouts from Shopify
   */
  const getPayouts = async (query: QueryPayouts = {}): Promise<Payout[]> => {
    const result = await api.shopify_payments["payouts.json"].get(query);
    return result.payouts;
  };

  return {
    api,
    getCustomers,
    getSingleCustomer,
    getCustomerOrders,
    addCustomer,
    updateCustomer,
    getOrders,
    getSingleOrder,
    getProducts,
    getSingleProduct,
    getPayouts,
  };
};

import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  Customer,
  CustomerSpecific,
  Order,
  OrderSpecific,
  OrderStatus,
  Payout,
  Product,
  ProductSpecific,
  AddOrUpdateCustomer,
  QueryCustomers,
  QueryOrder,
  QueryPayouts,
  QueryProducts,
} from "@/lib/apis/shopifyadmin/types.ts";

export interface ShopifyAdminOptions {
  storeName: string;
  apiKey: string;
  apiVersion: string;
}

/**
 * SDK constructor function for the Shopify Admin API
 *
 * @see https://netzo.io/docs/netzo/apis/shopifyadmin
 *
 * @param {string} storeName - the store name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} apiVersion - the version to use for the base URL
 * @returns {object} - an object of multiple utilities for the API
 */
export const shopifyadmin = ({
  storeName = Deno.env.get("SHOPIFYADMIN_STORE_NAME")!,
  apiKey = Deno.env.get("SHOPIFYADMIN_API_KEY")!,
  apiVersion = Deno.env.get("SHOPIFYADMIN_API_VERSION")!,
}: ShopifyAdminOptions) => {
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
    const result = await api.customers.get(query);
    return result.customers;
  };

  /**
   * Get a single customer from Shopify
   */
  const getSingleCustomer = async (
    customerId: string,
    fields = "",
  ): Promise<CustomerSpecific> => {
    const result = await api.customers[`${customerId}`].get(fields);
    return result.customer;
  };

  /**
   * Get orders belonging to a specific customer from Shopify
   */

  //must check if order object the same
  const getCustomerOrders = async (
    customerId: string,
    status: OrderStatus = "any",
  ): Promise<Order[]> => {
    const result = await api.customers[`${customerId}`].orders.get(status);
    return result.orders;
  };

  /**
   * Add a new customer in Shopify
   */
  const addCustomer = async (
    data: AddOrUpdateCustomer = {},
  ): Promise<CustomerSpecific> => {
    const result = await api.customers.post(data);
    return result.customer;
  };

  /**
   * Update customer details in Shopify
   */
  const updateCustomer = async (
    customerId: string,
    data: AddOrUpdateCustomer = {},
  ): Promise<CustomerSpecific> => {
    const result = await api.customers[`${customerId}`].put(data);
    return result.customer;
  };

  /**
   * Get orders from Shopify
   */

  const getOrders = async (query: QueryOrder = {}): Promise<Order[]> => {
    const result = await api.orders.get(query);
    return result.orders;
  };

  /**
   * Get a single order from Shopify
   */
  const getSingleOrder = async (
    orderId: string,
    fields = "",
  ): Promise<OrderSpecific> => {
    const result = await api.orders[`${orderId}`].get(fields);
    return result.order;
  };

  /**
   * Get products from Shopify
   */
  const getProducts = async (query: QueryProducts = {}): Promise<Product[]> => {
    const result = await api.products.get(query);
    return result.products;
  };

  /**
   * Get a single product from Shopify
   */
  const getSingleProduct = async (
    productId: string,
    fields = "",
  ): Promise<ProductSpecific> => {
    const result = await api.products[`${productId}`].get(fields);
    return result.product;
  };

  /**
   * Get payouts from Shopify
   */
  const getPayouts = async (query: QueryPayouts = {}): Promise<Payout[]> => {
    const result = await api.shopify_payments.payouts.get(query);
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

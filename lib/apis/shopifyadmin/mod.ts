import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
import {
  AddOrUpdateCustomer,
  Customers,
  Customer,
  Order,
  OrderStatus,
  Product,
  QueryCustomers,
  QueryOrders,
  QueryPayouts,
  QueryProducts,
  OrdersByCustomer,
  AddOrUpdateCustomerResponse,
  Orders,
  Products,
  Payouts,
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
  ): Promise<Customers> => {
    const result = await api["customers.json"].get(query);
    return result.customers;
  };

  /**
   * Get a single customer from Shopify
   */
  const getSingleCustomer = async (
    customerId: string,
    fields = "",
  ): Promise<Customer> => {
    const result = await api.customers[`${customerId}.json`].get(fields);
    return result.customer;
  };

  /**
   * Get orders belonging to a specific customer from Shopify
   */
  const getCustomerOrders = async (
    customerId: string,
    status: OrderStatus = "any",
  ): Promise<OrdersByCustomer> => {
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
  ): Promise<AddOrUpdateCustomerResponse> => {
    const result = await api["customers.json"].post(data);
    return result.customer;
  };

  /**
   * Update customer details in Shopify
   */
  const updateCustomer = async (
    customerId: string,
    data: AddOrUpdateCustomer = {},
  ): Promise<AddOrUpdateCustomerResponse> => {
    const result = await api.customers[`${customerId}.json`].put(data);
    return result.customer;
  };

  /**
   * Get orders from Shopify
   */
  const getOrders = async (query: QueryOrders = {}): Promise<Orders> => {
    const result = await api["orders.json"].get(query);
    return result.orders;
  };

  /**
   * Get a single order from Shopify
   */
  const getSingleOrder = async (
    orderId: string,
    fields = "",
  ): Promise<Order> => {
    const result = await api.orders[`${orderId}.json`].get(fields);
    return result.order;
  };

  /**
   * Get products from Shopify
   */
  const getProducts = async (query: QueryProducts = {}): Promise<Products> => {
    const result = await api["products.json"].get(query);
    return result.products;
  };

  /**
   * Get a single product from Shopify
   */
  const getSingleProduct = async (
    productId: string,
    fields = "",
  ): Promise<Product> => {
    const result = await api.products[`${productId}.json`].get(fields);
    return result.product;
  };

  /**
   * Get payouts from Shopify
   */
  const getPayouts = async (query: QueryPayouts = {}): Promise<Payouts> => {
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

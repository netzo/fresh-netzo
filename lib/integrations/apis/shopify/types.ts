import { z } from "../../../deps/zod/mod.ts";

const addressSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.any(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  zip: z.string(),
  phone: z.string(),
  name: z.string(),
  province_code: z.string(),
  country_code: z.string(),
  country_name: z.string(),
  default: z.boolean(),
});

const customerDetailsSchema = z.object({
  id: z.number(),
  email: z.string(),
  accepts_marketing: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  orders_count: z.number(),
  state: z.string(),
  total_spent: z.string(),
  last_order_id: z.number().optional(),
  note: z.any(),
  verified_email: z.boolean(),
  multipass_identifier: z.any(),
  tax_exempt: z.boolean(),
  tags: z.string(),
  last_order_name: z.string().optional(),
  currency: z.string(),
  phone: z.string(),
  addresses: z.array(addressSchema),
  accepts_marketing_updated_at: z.string(),
  marketing_opt_in_level: z.any(),
  tax_exemptions: z.array(z.any()),
  admin_graphql_api_id: z.string(),
  default_address: addressSchema,
});

export const customersSchema = z.object({
  customers: z.array(customerDetailsSchema),
});

export const customerSchema = z.object({
  customer: customerDetailsSchema,
});

export const queryCustomersSchema = z.object({
  fields: z.string().optional(),
  ids: z.string().optional(),
  limit: z.number().optional(),
  since_id: z.string().optional(),
  created_at_max: z.string().optional(),
  created_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
});

export const dataAddOrUpdateCustomerSchema = z.object({
  customer: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      verified_email: z.boolean().optional(),
      addresses: z
        .array(
          addressSchema.pick({
            address1: true,
            city: true,
            province: true,
            phone: true,
            zip: true,
            last_name: true,
            first_name: true,
            country: true,
          }),
        )
        .optional(),
    })
    .optional(),
});

export const addOrUpdateCustomerResultSchema = z.object({
  customer: customerDetailsSchema.and(
    z.object({
      email_marketing_consent: z.object({
        state: z.string(),
        opt_in_level: z.string(),
        consent_updated_at: z.any(),
      }),
      sms_marketing_consent: z.object({
        state: z.string(),
        opt_in_level: z.string(),
        consent_updated_at: z.any(),
        consent_collected_from: z.string(),
      }),
    }),
  ),
});

export const ordersSchema = z.object({
  orders: z.array(
    z.object({
      id: z.number(),
      admin_graphql_api_id: z.string(),
      app_id: z.any(),
      browser_ip: z.string(),
      buyer_accepts_marketing: z.boolean(),
      cancel_reason: z.any(),
      cancelled_at: z.any(),
      cart_token: z.string(),
      checkout_id: z.number(),
      checkout_token: z.string(),
      client_details: z.object({
        accept_language: z.any(),
        browser_height: z.any(),
        browser_ip: z.string(),
        browser_width: z.any(),
        session_hash: z.any(),
        user_agent: z.any(),
      }),
      closed_at: z.any(),
      confirmed: z.boolean(),
      contact_email: z.string(),
      created_at: z.string(),
      currency: z.string(),
      current_subtotal_price: z.string(),
      current_subtotal_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      current_total_discounts: z.string(),
      current_total_discounts_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      current_total_duties_set: z.any(),
      current_total_price: z.string(),
      current_total_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      current_total_tax: z.string(),
      current_total_tax_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      customer_locale: z.any(),
      device_id: z.any(),
      discount_codes: z.array(
        z.object({
          code: z.string(),
          amount: z.string(),
          type: z.string(),
        }),
      ),
      email: z.string(),
      estimated_taxes: z.boolean(),
      financial_status: z.string(),
      fulfillment_status: z.any(),
      gateway: z.string(),
      landing_site: z.string(),
      landing_site_ref: z.string(),
      location_id: z.any(),
      name: z.string(),
      note: z.any(),
      note_attributes: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
      number: z.number(),
      order_number: z.number(),
      order_status_url: z.string(),
      original_total_duties_set: z.any(),
      payment_gateway_names: z.array(z.string()),
      phone: z.string(),
      presentment_currency: z.string(),
      processed_at: z.string(),
      processing_method: z.string(),
      reference: z.string(),
      referring_site: z.string(),
      source_identifier: z.string(),
      source_name: z.string(),
      source_url: z.any(),
      subtotal_price: z.string(),
      subtotal_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      tags: z.string(),
      tax_lines: z.array(
        z.object({
          price: z.string(),
          rate: z.number(),
          title: z.string(),
          price_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
        }),
      ),
      taxes_included: z.boolean(),
      test: z.boolean(),
      token: z.string(),
      total_discounts: z.string(),
      total_discounts_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      total_line_items_price: z.string(),
      total_line_items_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      total_outstanding: z.string(),
      total_price: z.string(),
      total_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      total_price_usd: z.string(),
      total_shipping_price_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      total_tax: z.string(),
      total_tax_set: z.object({
        shop_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
        presentment_money: z.object({
          amount: z.string(),
          currency_code: z.string(),
        }),
      }),
      total_tip_received: z.string(),
      total_weight: z.number(),
      updated_at: z.string(),
      user_id: z.any(),
      billing_address: z.object({
        first_name: z.string(),
        address1: z.string(),
        phone: z.string(),
        city: z.string(),
        zip: z.string(),
        province: z.string(),
        country: z.string(),
        last_name: z.string(),
        address2: z.string(),
        company: z.any(),
        latitude: z.number(),
        longitude: z.number(),
        name: z.string(),
        country_code: z.string(),
        province_code: z.string(),
      }),
      customer: z.object({
        id: z.number(),
        email: z.string(),
        accepts_marketing: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        orders_count: z.number(),
        state: z.string(),
        total_spent: z.string(),
        last_order_id: z.number(),
        note: z.any(),
        verified_email: z.boolean(),
        multipass_identifier: z.any(),
        tax_exempt: z.boolean(),
        phone: z.string(),
        tags: z.string(),
        currency: z.string(),
        last_order_name: z.string(),
        accepts_marketing_updated_at: z.string(),
        marketing_opt_in_level: z.any(),
        tax_exemptions: z.array(z.any()),
        admin_graphql_api_id: z.string(),
        default_address: z.object({
          id: z.number(),
          customer_id: z.number(),
          first_name: z.any(),
          last_name: z.any(),
          company: z.any(),
          address1: z.string(),
          address2: z.string(),
          city: z.string(),
          province: z.string(),
          country: z.string(),
          zip: z.string(),
          phone: z.string(),
          name: z.string(),
          province_code: z.string(),
          country_code: z.string(),
          country_name: z.string(),
          default: z.boolean(),
        }),
      }),
      discount_applications: z.array(
        z.object({
          target_type: z.string(),
          type: z.string(),
          value: z.string(),
          value_type: z.string(),
          allocation_method: z.string(),
          target_selection: z.string(),
          code: z.string(),
        }),
      ),
      fulfillments: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          created_at: z.string(),
          location_id: z.number(),
          name: z.string(),
          order_id: z.number(),
          origin_address: z.object({}),
          receipt: z.object({
            testcase: z.boolean(),
            authorization: z.string(),
          }),
          service: z.string(),
          shipment_status: z.any(),
          status: z.string(),
          tracking_company: z.string(),
          tracking_number: z.string(),
          tracking_numbers: z.array(z.string()),
          tracking_url: z.string(),
          tracking_urls: z.array(z.string()),
          updated_at: z.string(),
          line_items: z.array(
            z.object({
              id: z.number(),
              admin_graphql_api_id: z.string(),
              fulfillable_quantity: z.number(),
              fulfillment_service: z.string(),
              fulfillment_status: z.any(),
              gift_card: z.boolean(),
              grams: z.number(),
              name: z.string(),
              price: z.string(),
              price_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              product_exists: z.boolean(),
              product_id: z.number(),
              properties: z.array(
                z.object({
                  name: z.string(),
                  value: z.string(),
                }),
              ),
              quantity: z.number(),
              requires_shipping: z.boolean(),
              sku: z.string(),
              taxable: z.boolean(),
              title: z.string(),
              total_discount: z.string(),
              total_discount_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              variant_id: z.number(),
              variant_inventory_management: z.string(),
              variant_title: z.string(),
              vendor: z.any(),
              tax_lines: z.array(
                z.object({
                  price: z.string(),
                  price_set: z.object({
                    shop_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                    presentment_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                  }),
                  rate: z.number(),
                  title: z.string(),
                }),
              ),
              duties: z.array(z.any()),
              discount_allocations: z.array(
                z.object({
                  amount: z.string(),
                  amount_set: z.object({
                    shop_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                    presentment_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                  }),
                  discount_application_index: z.number(),
                }),
              ),
            }),
          ),
        }),
      ),
      line_items: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          fulfillable_quantity: z.number(),
          fulfillment_service: z.string(),
          fulfillment_status: z.any(),
          gift_card: z.boolean(),
          grams: z.number(),
          name: z.string(),
          price: z.string(),
          price_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
          product_exists: z.boolean(),
          product_id: z.number(),
          properties: z.array(
            z.object({
              name: z.string(),
              value: z.string(),
            }),
          ),
          quantity: z.number(),
          requires_shipping: z.boolean(),
          sku: z.string(),
          taxable: z.boolean(),
          title: z.string(),
          total_discount: z.string(),
          total_discount_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
          variant_id: z.number(),
          variant_inventory_management: z.string(),
          variant_title: z.string(),
          vendor: z.any(),
          tax_lines: z.array(
            z.object({
              price: z.string(),
              price_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              rate: z.number(),
              title: z.string(),
            }),
          ),
          duties: z.array(z.any()),
          discount_allocations: z.array(
            z.object({
              amount: z.string(),
              amount_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              discount_application_index: z.number(),
            }),
          ),
        }),
      ),
      payment_details: z.object({
        credit_card_bin: z.any(),
        avs_result_code: z.any(),
        cvv_result_code: z.any(),
        credit_card_number: z.string(),
        credit_card_company: z.string(),
        buyer_action_info: z.any(),
      }),
      payment_terms: z.any(),
      refunds: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          created_at: z.string(),
          note: z.string(),
          order_id: z.number(),
          processed_at: z.string(),
          restock: z.boolean(),
          total_duties_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
          user_id: z.number(),
          order_adjustments: z.array(z.any()),
          transactions: z.array(
            z.object({
              id: z.number(),
              admin_graphql_api_id: z.string(),
              amount: z.string(),
              authorization: z.string(),
              created_at: z.string(),
              currency: z.string(),
              device_id: z.any(),
              error_code: z.any(),
              gateway: z.string(),
              kind: z.string(),
              location_id: z.any(),
              message: z.any(),
              order_id: z.number(),
              parent_id: z.number(),
              processed_at: z.string(),
              receipt: z.object({}),
              source_name: z.string(),
              status: z.string(),
              test: z.boolean(),
              user_id: z.any(),
            }),
          ),
          refund_line_items: z.array(
            z.object({
              id: z.number(),
              line_item_id: z.number(),
              location_id: z.number(),
              quantity: z.number(),
              restock_type: z.string(),
              subtotal: z.number(),
              subtotal_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              total_tax: z.number(),
              total_tax_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              line_item: z.object({
                id: z.number(),
                admin_graphql_api_id: z.string(),
                fulfillable_quantity: z.number(),
                fulfillment_service: z.string(),
                fulfillment_status: z.any(),
                gift_card: z.boolean(),
                grams: z.number(),
                name: z.string(),
                price: z.string(),
                price_set: z.object({
                  shop_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                  presentment_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                }),
                product_exists: z.boolean(),
                product_id: z.number(),
                properties: z.array(
                  z.object({
                    name: z.string(),
                    value: z.string(),
                  }),
                ),
                quantity: z.number(),
                requires_shipping: z.boolean(),
                sku: z.string(),
                taxable: z.boolean(),
                title: z.string(),
                total_discount: z.string(),
                total_discount_set: z.object({
                  shop_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                  presentment_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                }),
                variant_id: z.number(),
                variant_inventory_management: z.string(),
                variant_title: z.string(),
                vendor: z.any(),
                tax_lines: z.array(
                  z.object({
                    price: z.string(),
                    price_set: z.object({
                      shop_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                      presentment_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                    }),
                    rate: z.number(),
                    title: z.string(),
                  }),
                ),
                duties: z.array(z.any()),
                discount_allocations: z.array(
                  z.object({
                    amount: z.string(),
                    amount_set: z.object({
                      shop_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                      presentment_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                    }),
                    discount_application_index: z.number(),
                  }),
                ),
              }),
            }),
          ),
          duties: z.array(z.any()),
        }),
      ),
      shipping_address: z.object({
        first_name: z.string(),
        address1: z.string(),
        phone: z.string(),
        city: z.string(),
        zip: z.string(),
        province: z.string(),
        country: z.string(),
        last_name: z.string(),
        address2: z.string(),
        company: z.any(),
        latitude: z.number(),
        longitude: z.number(),
        name: z.string(),
        country_code: z.string(),
        province_code: z.string(),
      }),
      shipping_lines: z.array(
        z.object({
          id: z.number(),
          carrier_identifier: z.any(),
          code: z.string(),
          delivery_category: z.any(),
          discounted_price: z.string(),
          discounted_price_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
          phone: z.any(),
          price: z.string(),
          price_set: z.object({
            shop_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
            presentment_money: z.object({
              amount: z.string(),
              currency_code: z.string(),
            }),
          }),
          requested_fulfillment_service_id: z.any(),
          source: z.string(),
          title: z.string(),
          tax_lines: z.array(z.any()),
          discount_allocations: z.array(z.any()),
        }),
      ),
    }),
  ),
});

export const orderSchema = z.object({
  order: z.object({
    id: z.number(),
    name: z.string(),
    total_price: z.string(),
    line_items: z.array(
      z.object({
        id: z.number(),
        admin_graphql_api_id: z.string(),
        fulfillable_quantity: z.number(),
        fulfillment_service: z.string(),
        fulfillment_status: z.any(),
        gift_card: z.boolean(),
        grams: z.number(),
        name: z.string(),
        price: z.string(),
        price_set: z.object({
          shop_money: z.object({
            amount: z.string(),
            currency_code: z.string(),
          }),
          presentment_money: z.object({
            amount: z.string(),
            currency_code: z.string(),
          }),
        }),
        product_exists: z.boolean(),
        product_id: z.number(),
        properties: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
          }),
        ),
        quantity: z.number(),
        requires_shipping: z.boolean(),
        sku: z.string(),
        taxable: z.boolean(),
        title: z.string(),
        total_discount: z.string(),
        total_discount_set: z.object({
          shop_money: z.object({
            amount: z.string(),
            currency_code: z.string(),
          }),
          presentment_money: z.object({
            amount: z.string(),
            currency_code: z.string(),
          }),
        }),
        variant_id: z.number(),
        variant_inventory_management: z.string(),
        variant_title: z.string(),
        vendor: z.any(),
        tax_lines: z.array(
          z.object({
            channel_liable: z.any(),
            price: z.string(),
            price_set: z.object({
              shop_money: z.object({
                amount: z.string(),
                currency_code: z.string(),
              }),
              presentment_money: z.object({
                amount: z.string(),
                currency_code: z.string(),
              }),
            }),
            rate: z.number(),
            title: z.string(),
          }),
        ),
        duties: z.array(z.any()),
        discount_allocations: z.array(
          z.object({
            amount: z.string(),
            amount_set: z.object({
              shop_money: z.object({
                amount: z.string(),
                currency_code: z.string(),
              }),
              presentment_money: z.object({
                amount: z.string(),
                currency_code: z.string(),
              }),
            }),
            discount_application_index: z.number(),
          }),
        ),
      }),
    ),
  }),
});

export const ordersByCustomerSchema = z.object({
  orders: z.array(
    z.object({
      id: z.number(),
      admin_graphql_api_id: z.string(),
      app_id: z.any(),
      browser_ip: z.string(),
      buyer_accepts_marketing: z.boolean(),
      cancel_reason: z.any(),
      cancelled_at: z.any(),
      cart_token: z.string(),
      checkout_id: z.number(),
      checkout_token: z.string(),
      client_details: z.object({
        accept_language: z.any(),
        browser_height: z.any(),
        browser_ip: z.string(),
        browser_width: z.any(),
        session_hash: z.any(),
        user_agent: z.any(),
      }),
      closed_at: z.any(),
      confirmation_number: z.any(),
      confirmed: z.boolean(),
      contact_email: z.string(),
      created_at: z.string(),
      currency: z.string(),
      current_subtotal_price: z.string(),
      current_subtotal_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      current_total_additional_fees_set: z.any(),
      current_total_discounts: z.string(),
      current_total_discounts_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      current_total_duties_set: z.any(),
      current_total_price: z.string(),
      current_total_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      current_total_tax: z.string(),
      current_total_tax_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      customer_locale: z.any(),
      device_id: z.any(),
      discount_codes: z.array(
        z.object({
          code: z.string(),
          amount: z.string(),
          type: z.string(),
        }),
      ),
      email: z.string(),
      estimated_taxes: z.boolean(),
      financial_status: z.string(),
      fulfillment_status: z.any(),
      landing_site: z.string(),
      landing_site_ref: z.string(),
      location_id: z.any(),
      merchant_of_record_app_id: z.any(),
      name: z.string(),
      note: z.any(),
      note_attributes: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
      number: z.number(),
      order_number: z.number(),
      order_status_url: z.string(),
      original_total_additional_fees_set: z.any(),
      original_total_duties_set: z.any(),
      payment_gateway_names: z.array(z.string()),
      phone: z.string(),
      po_number: z.string(),
      presentment_currency: z.string(),
      processed_at: z.string(),
      reference: z.string(),
      referring_site: z.string(),
      source_identifier: z.string(),
      source_name: z.string(),
      source_url: z.any(),
      subtotal_price: z.string(),
      subtotal_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      tags: z.string(),
      tax_exempt: z.boolean(),
      tax_lines: z.array(
        z.object({
          price: z.string(),
          rate: z.number(),
          title: z.string(),
          price_set: z.object({}),
          channel_liable: z.any(),
        }),
      ),
      taxes_included: z.boolean(),
      test: z.boolean(),
      token: z.string(),
      total_discounts: z.string(),
      total_discounts_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      total_line_items_price: z.string(),
      total_line_items_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      total_outstanding: z.string(),
      total_price: z.string(),
      total_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      total_shipping_price_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      total_tax: z.string(),
      total_tax_set: z.object({
        shop_money: z.object({}),
        presentment_money: z.object({}),
      }),
      total_tip_received: z.string(),
      total_weight: z.number(),
      updated_at: z.string(),
      user_id: z.any(),
      billing_address: z.object({
        first_name: z.string(),
        address1: z.string(),
        phone: z.string(),
        city: z.string(),
        zip: z.string(),
        province: z.string(),
        country: z.string(),
        last_name: z.string(),
        address2: z.string(),
        company: z.any(),
        latitude: z.number(),
        longitude: z.number(),
        name: z.string(),
        country_code: z.string(),
        province_code: z.string(),
      }),
      customer: z.object({
        id: z.number(),
        email: z.string(),
        accepts_marketing: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        state: z.string(),
        note: z.any(),
        verified_email: z.boolean(),
        multipass_identifier: z.any(),
        tax_exempt: z.boolean(),
        phone: z.string(),
        email_marketing_consent: z.object({
          state: z.string(),
          opt_in_level: z.any(),
          consent_updated_at: z.string(),
        }),
        sms_marketing_consent: z.object({
          state: z.string(),
          opt_in_level: z.string(),
          consent_updated_at: z.string(),
          consent_collected_from: z.string(),
        }),
        tags: z.string(),
        currency: z.string(),
        accepts_marketing_updated_at: z.string(),
        marketing_opt_in_level: z.any(),
        tax_exemptions: z.array(z.any()),
        admin_graphql_api_id: z.string(),
        default_address: z.object({
          id: z.number(),
          customer_id: z.number(),
          first_name: z.any(),
          last_name: z.any(),
          company: z.any(),
          address1: z.string(),
          address2: z.string(),
          city: z.string(),
          province: z.string(),
          country: z.string(),
          zip: z.string(),
          phone: z.string(),
          name: z.string(),
          province_code: z.string(),
          country_code: z.string(),
          country_name: z.string(),
          default: z.boolean(),
        }),
      }),
      discount_applications: z.array(
        z.object({
          target_type: z.string(),
          type: z.string(),
          value: z.string(),
          value_type: z.string(),
          allocation_method: z.string(),
          target_selection: z.string(),
          code: z.string(),
        }),
      ),
      fulfillments: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          created_at: z.string(),
          location_id: z.number(),
          name: z.string(),
          order_id: z.number(),
          origin_address: z.object({}),
          receipt: z.object({
            testcase: z.boolean(),
            authorization: z.string(),
          }),
          service: z.string(),
          shipment_status: z.any(),
          status: z.string(),
          tracking_company: z.string(),
          tracking_number: z.string(),
          tracking_numbers: z.array(z.string()),
          tracking_url: z.string(),
          tracking_urls: z.array(z.string()),
          updated_at: z.string(),
          line_items: z.array(
            z.object({
              id: z.number(),
              admin_graphql_api_id: z.string(),
              fulfillable_quantity: z.number(),
              fulfillment_service: z.string(),
              fulfillment_status: z.any(),
              gift_card: z.boolean(),
              grams: z.number(),
              name: z.string(),
              price: z.string(),
              price_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              product_exists: z.boolean(),
              product_id: z.number(),
              properties: z.array(
                z.object({
                  name: z.string(),
                  value: z.string(),
                }),
              ),
              quantity: z.number(),
              requires_shipping: z.boolean(),
              sku: z.string(),
              taxable: z.boolean(),
              title: z.string(),
              total_discount: z.string(),
              total_discount_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              variant_id: z.number(),
              variant_inventory_management: z.string(),
              variant_title: z.string(),
              vendor: z.any(),
              tax_lines: z.array(
                z.object({
                  channel_liable: z.any(),
                  price: z.string(),
                  price_set: z.object({
                    shop_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                    presentment_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                  }),
                  rate: z.number(),
                  title: z.string(),
                }),
              ),
              duties: z.array(z.any()),
              discount_allocations: z.array(
                z.object({
                  amount: z.string(),
                  amount_set: z.object({
                    shop_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                    presentment_money: z.object({
                      amount: z.string(),
                      currency_code: z.string(),
                    }),
                  }),
                  discount_application_index: z.number(),
                }),
              ),
            }),
          ),
        }),
      ),
      line_items: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          fulfillable_quantity: z.number(),
          fulfillment_service: z.string(),
          fulfillment_status: z.any(),
          gift_card: z.boolean(),
          grams: z.number(),
          name: z.string(),
          price: z.string(),
          price_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          product_exists: z.boolean(),
          product_id: z.number(),
          properties: z.array(
            z.object({
              name: z.string(),
              value: z.string(),
            }),
          ),
          quantity: z.number(),
          requires_shipping: z.boolean(),
          sku: z.string(),
          taxable: z.boolean(),
          title: z.string(),
          total_discount: z.string(),
          total_discount_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          variant_id: z.number(),
          variant_inventory_management: z.string(),
          variant_title: z.string(),
          vendor: z.any(),
          tax_lines: z.array(
            z.object({
              channel_liable: z.any(),
              price: z.string(),
              price_set: z.object({
                shop_money: z.object({}),
                presentment_money: z.object({}),
              }),
              rate: z.number(),
              title: z.string(),
            }),
          ),
          duties: z.array(z.any()),
          discount_allocations: z.array(
            z.object({
              amount: z.string(),
              amount_set: z.object({
                shop_money: z.object({}),
                presentment_money: z.object({}),
              }),
              discount_application_index: z.number(),
            }),
          ),
        }),
      ),
      payment_terms: z.any(),
      refunds: z.array(
        z.object({
          id: z.number(),
          admin_graphql_api_id: z.string(),
          created_at: z.string(),
          note: z.string(),
          order_id: z.number(),
          processed_at: z.string(),
          restock: z.boolean(),
          total_additional_fees_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          total_duties_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          user_id: z.number(),
          order_adjustments: z.array(z.any()),
          transactions: z.array(
            z.object({
              id: z.number(),
              admin_graphql_api_id: z.string(),
              amount: z.string(),
              authorization: z.string(),
              created_at: z.string(),
              currency: z.string(),
              device_id: z.any(),
              error_code: z.any(),
              gateway: z.string(),
              kind: z.string(),
              location_id: z.any(),
              message: z.any(),
              order_id: z.number(),
              parent_id: z.number(),
              payment_id: z.string(),
              processed_at: z.string(),
              receipt: z.object({}),
              source_name: z.string(),
              status: z.string(),
              test: z.boolean(),
              user_id: z.any(),
            }),
          ),
          refund_line_items: z.array(
            z.object({
              id: z.number(),
              line_item_id: z.number(),
              location_id: z.number(),
              quantity: z.number(),
              restock_type: z.string(),
              subtotal: z.number(),
              subtotal_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              total_tax: z.number(),
              total_tax_set: z.object({
                shop_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
                presentment_money: z.object({
                  amount: z.string(),
                  currency_code: z.string(),
                }),
              }),
              line_item: z.object({
                id: z.number(),
                admin_graphql_api_id: z.string(),
                fulfillable_quantity: z.number(),
                fulfillment_service: z.string(),
                fulfillment_status: z.any(),
                gift_card: z.boolean(),
                grams: z.number(),
                name: z.string(),
                price: z.string(),
                price_set: z.object({
                  shop_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                  presentment_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                }),
                product_exists: z.boolean(),
                product_id: z.number(),
                properties: z.array(
                  z.object({
                    name: z.string(),
                    value: z.string(),
                  }),
                ),
                quantity: z.number(),
                requires_shipping: z.boolean(),
                sku: z.string(),
                taxable: z.boolean(),
                title: z.string(),
                total_discount: z.string(),
                total_discount_set: z.object({
                  shop_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                  presentment_money: z.object({
                    amount: z.string(),
                    currency_code: z.string(),
                  }),
                }),
                variant_id: z.number(),
                variant_inventory_management: z.string(),
                variant_title: z.string(),
                vendor: z.any(),
                tax_lines: z.array(
                  z.object({
                    channel_liable: z.any(),
                    price: z.string(),
                    price_set: z.object({
                      shop_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                      presentment_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                    }),
                    rate: z.number(),
                    title: z.string(),
                  }),
                ),
                duties: z.array(z.any()),
                discount_allocations: z.array(
                  z.object({
                    amount: z.string(),
                    amount_set: z.object({
                      shop_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                      presentment_money: z.object({
                        amount: z.string(),
                        currency_code: z.string(),
                      }),
                    }),
                    discount_application_index: z.number(),
                  }),
                ),
              }),
            }),
          ),
          duties: z.array(z.any()),
          additional_fees: z.array(z.any()),
        }),
      ),
      shipping_address: z.object({
        first_name: z.string(),
        address1: z.string(),
        phone: z.string(),
        city: z.string(),
        zip: z.string(),
        province: z.string(),
        country: z.string(),
        last_name: z.string(),
        address2: z.string(),
        company: z.any(),
        latitude: z.number(),
        longitude: z.number(),
        name: z.string(),
        country_code: z.string(),
        province_code: z.string(),
      }),
      shipping_lines: z.array(
        z.object({
          id: z.number(),
          carrier_identifier: z.any(),
          code: z.string(),
          discounted_price: z.string(),
          discounted_price_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          phone: z.any(),
          price: z.string(),
          price_set: z.object({
            shop_money: z.object({}),
            presentment_money: z.object({}),
          }),
          requested_fulfillment_service_id: z.any(),
          source: z.string(),
          title: z.string(),
          tax_lines: z.array(z.any()),
          discount_allocations: z.array(z.any()),
        }),
      ),
    }),
  ),
});

export const orderStatusSchema = z.union([
  z.literal("open"),
  z.literal("close"),
  z.literal("cancelled"),
  z.literal("any"),
]);

export const queryOrdersSchema = queryCustomersSchema.extend({
  attribution_app_id: z.string().optional(),
  financial_status: z
    .union([
      z.literal("authorized"),
      z.literal("pending"),
      z.literal("paid"),
      z.literal("partially_paid"),
      z.literal("refunded"),
      z.literal("voided"),
      z.literal("partially_refunded"),
      z.literal("any"),
      z.literal("unpaid"),
    ])
    .optional(),
  fulfillment_status: z
    .union([
      z.literal("shipped"),
      z.literal("partial"),
      z.literal("unshipped"),
      z.literal("any"),
      z.literal("unfulfilled"),
    ])
    .optional(),
  status: orderStatusSchema.optional(),
  processed_at_max: z.string().optional(),
  processed_at_min: z.string().optional(),
});

const productBaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  body_html: z.string(),
  vendor: z.string(),
  product_type: z.string(),
  created_at: z.string(),
  handle: z.string(),
  updated_at: z.string(),
  published_at: z.string(),
  template_suffix: z.any(),
  published_scope: z.string(),
  tags: z.string(),
  admin_graphql_api_id: z.string(),
  variants: z.array(
    z.object({
      id: z.number(),
      product_id: z.number(),
      title: z.string(),
      price: z.string(),
      sku: z.string(),
      position: z.number(),
      inventory_policy: z.string(),
      compare_at_price: z.any(),
      fulfillment_service: z.string(),
      inventory_management: z.string(),
      option1: z.string(),
      option2: z.any(),
      option3: z.any(),
      created_at: z.string(),
      updated_at: z.string(),
      taxable: z.boolean(),
      barcode: z.string(),
      grams: z.number(),
      image_id: z.number().optional(),
      weight: z.number(),
      weight_unit: z.string(),
      inventory_item_id: z.number(),
      inventory_quantity: z.number(),
      old_inventory_quantity: z.number(),
      presentment_prices: z.array(
        z.object({
          price: z.object({
            amount: z.string(),
            currency_code: z.string(),
          }),
          compare_at_price: z.any(),
        }),
      ),
      requires_shipping: z.boolean(),
      admin_graphql_api_id: z.string(),
    }),
  ),
  options: z.array(
    z.object({
      id: z.number(),
      product_id: z.number(),
      name: z.string(),
      position: z.number(),
      values: z.array(z.string()),
    }),
  ),
  images: z.array(
    z.object({
      id: z.number(),
      product_id: z.number(),
      position: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      alt: z.any(),
      width: z.number(),
      height: z.number(),
      src: z.string(),
      variant_ids: z.array(z.number()),
      admin_graphql_api_id: z.string(),
    }),
  ),
  image: z
    .object({
      id: z.number(),
      product_id: z.number(),
      position: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      alt: z.any(),
      width: z.number(),
      height: z.number(),
      src: z.string(),
      variant_ids: z.array(z.any()),
      admin_graphql_api_id: z.string(),
    })
    .optional(),
});

export const productsSchema = z.object({
  products: z.array(productBaseSchema),
});

export const productSchema = z.object({
  product: productBaseSchema,
});
export const queryProductsSchema = queryCustomersSchema.extend({
  collection_id: z.string().optional(),
  handle: z.string().optional(),
  presentment_currencies: z.string().optional(),
  product_type: z.string().optional(),
  published_at_max: z.string().optional(),
  published_at_min: z.string().optional(),
  published_status: z
    .union([z.literal("published"), z.literal("unpublished"), z.literal("any")])
    .optional(),
  status: z
    .union([z.literal("active"), z.literal("archived"), z.literal("draft")])
    .optional(),
  title: z.string().optional(),
  vendor: z.string().optional(),
});

export const payoutsSchema = z.object({
  payouts: z.array(
    z.object({
      id: z.number(),
      status: z.string(),
      date: z.string(),
      currency: z.string(),
      amount: z.string(),
      summary: z.object({}),
    }),
  ),
});

export const queryPayoutsSchema = z.object({
  date: z.string().optional(),
  date_max: z.string().optional(),
  date_min: z.string().optional(),
  last_id: z.string().optional(),
  since_id: z.string().optional(),
  status: z
    .union([
      z.literal("scheduled"),
      z.literal("in_transit"),
      z.literal("paid"),
      z.literal("failed"),
      z.literal("canceled"),
    ])
    .optional(),
});

// types:

export type Customers = z.infer<typeof customersSchema>;
export type Customer = z.infer<typeof customerSchema>;
export type QueryCustomers = z.infer<typeof queryCustomersSchema>;
export type DataAddOrUpdateCustomer = z.infer<
  typeof dataAddOrUpdateCustomerSchema
>;
export type AddOrUpdateCustomerResult = z.infer<
  typeof addOrUpdateCustomerResultSchema
>;
export type Orders = z.infer<typeof ordersSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrdersByCustomer = z.infer<typeof ordersByCustomerSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type QueryOrders = z.infer<typeof queryOrdersSchema>;
export type Products = z.infer<typeof productsSchema>;
export type Product = z.infer<typeof productSchema>;
export type QueryProducts = z.infer<typeof queryProductsSchema>;
export type Payouts = z.infer<typeof payoutsSchema>;
export type QueryPayouts = z.infer<typeof queryPayoutsSchema>;

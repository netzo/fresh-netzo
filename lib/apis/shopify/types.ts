interface Address {
  id: number;
  customer_id: number;
  first_name?: string;
  last_name?: string;
  company: any;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  name: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
}

interface CustomerDetails {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  state: string;
  total_spent: string;
  last_order_id?: number;
  note: any;
  verified_email: boolean;
  multipass_identifier: any;
  tax_exempt: boolean;
  tags: string;
  last_order_name?: string;
  currency: string;
  phone: string;
  addresses: Address[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level: any;
  tax_exemptions: Array<any>;
  admin_graphql_api_id: string;
  default_address: Address;
}

export interface Customers {
  customers: CustomerDetails[];
}

export interface Customer {
  customer: CustomerDetails;
}

export interface QueryCustomers {
  fields?: string;
  ids?: string;
  limit?: number;
  since_id?: string;
  created_at_max?: string;
  created_at_min?: string;
  updated_at_max?: string;
  updated_at_min?: string;
}

export interface AddOrUpdateCustomer {
  customer?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    verified_email?: boolean;
    addresses?: Partial<
      Pick<
        Address,
        | "address1"
        | "city"
        | "province"
        | "phone"
        | "zip"
        | "last_name"
        | "first_name"
        | "country"
      >
    >[];
  };
}

export interface AddOrUpdateCustomerResponse { //OLD CUSTOMERSPECIFIC
  customer: CustomerDetails & {
    email_marketing_consent: {
      state: string;
      opt_in_level: string;
      consent_updated_at: any;
    };
    sms_marketing_consent: {
      state: string;
      opt_in_level: string;
      consent_updated_at: any;
      consent_collected_from: string;
    };
  };
}

export interface Orders {
  orders: Array<{
    id: number;
    admin_graphql_api_id: string;
    app_id: any;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: any;
    cancelled_at: any;
    cart_token: string;
    checkout_id: number;
    checkout_token: string;
    client_details: {
      accept_language: any;
      browser_height: any;
      browser_ip: string;
      browser_width: any;
      session_hash: any;
      user_agent: any;
    };
    closed_at: any;
    confirmed: boolean;
    contact_email: string;
    created_at: string;
    currency: string;
    current_subtotal_price: string;
    current_subtotal_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_discounts: string;
    current_total_discounts_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_duties_set: any;
    current_total_price: string;
    current_total_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_tax: string;
    current_total_tax_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    customer_locale: any;
    device_id: any;
    discount_codes: Array<{
      code: string;
      amount: string;
      type: string;
    }>;
    email: string;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillment_status: any;
    gateway: string;
    landing_site: string;
    landing_site_ref: string;
    location_id: any;
    name: string;
    note: any;
    note_attributes: Array<{
      name: string;
      value: string;
    }>;
    number: number;
    order_number: number;
    order_status_url: string;
    original_total_duties_set: any;
    payment_gateway_names: Array<string>;
    phone: string;
    presentment_currency: string;
    processed_at: string;
    processing_method: string;
    reference: string;
    referring_site: string;
    source_identifier: string;
    source_name: string;
    source_url: any;
    subtotal_price: string;
    subtotal_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    tags: string;
    tax_lines: Array<{
      price: string;
      rate: number;
      title: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
    }>;
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_line_items_price: string;
    total_line_items_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_outstanding: string;
    total_price: string;
    total_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_price_usd: string;
    total_shipping_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_tax: string;
    total_tax_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: any;
    billing_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: any;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    customer: {
      id: number;
      email: string;
      accepts_marketing: boolean;
      created_at: string;
      updated_at: string;
      first_name: string;
      last_name: string;
      orders_count: number;
      state: string;
      total_spent: string;
      last_order_id: number;
      note: any;
      verified_email: boolean;
      multipass_identifier: any;
      tax_exempt: boolean;
      phone: string;
      tags: string;
      currency: string;
      last_order_name: string;
      accepts_marketing_updated_at: string;
      marketing_opt_in_level: any;
      tax_exemptions: Array<any>;
      admin_graphql_api_id: string;
      default_address: {
        id: number;
        customer_id: number;
        first_name: any;
        last_name: any;
        company: any;
        address1: string;
        address2: string;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone: string;
        name: string;
        province_code: string;
        country_code: string;
        country_name: string;
        default: boolean;
      };
    };
    discount_applications: Array<{
      target_type: string;
      type: string;
      value: string;
      value_type: string;
      allocation_method: string;
      target_selection: string;
      code: string;
    }>;
    fulfillments: Array<{
      id: number;
      admin_graphql_api_id: string;
      created_at: string;
      location_id: number;
      name: string;
      order_id: number;
      origin_address: {};
      receipt: {
        testcase: boolean;
        authorization: string;
      };
      service: string;
      shipment_status: any;
      status: string;
      tracking_company: string;
      tracking_number: string;
      tracking_numbers: Array<string>;
      tracking_url: string;
      tracking_urls: Array<string>;
      updated_at: string;
      line_items: Array<{
        id: number;
        admin_graphql_api_id: string;
        fulfillable_quantity: number;
        fulfillment_service: string;
        fulfillment_status: any;
        gift_card: boolean;
        grams: number;
        name: string;
        price: string;
        price_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        product_exists: boolean;
        product_id: number;
        properties: Array<{
          name: string;
          value: string;
        }>;
        quantity: number;
        requires_shipping: boolean;
        sku: string;
        taxable: boolean;
        title: string;
        total_discount: string;
        total_discount_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        variant_id: number;
        variant_inventory_management: string;
        variant_title: string;
        vendor: any;
        tax_lines: Array<{
          price: string;
          price_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          rate: number;
          title: string;
        }>;
        duties: Array<any>;
        discount_allocations: Array<{
          amount: string;
          amount_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          discount_application_index: number;
        }>;
      }>;
    }>;
    line_items: Array<{
      id: number;
      admin_graphql_api_id: string;
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: any;
      gift_card: boolean;
      grams: number;
      name: string;
      price: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      product_exists: boolean;
      product_id: number;
      properties: Array<{
        name: string;
        value: string;
      }>;
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      variant_id: number;
      variant_inventory_management: string;
      variant_title: string;
      vendor: any;
      tax_lines: Array<{
        price: string;
        price_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        rate: number;
        title: string;
      }>;
      duties: Array<any>;
      discount_allocations: Array<{
        amount: string;
        amount_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        discount_application_index: number;
      }>;
    }>;
    payment_details: {
      credit_card_bin: any;
      avs_result_code: any;
      cvv_result_code: any;
      credit_card_number: string;
      credit_card_company: string;
      buyer_action_info: any;
    };
    payment_terms: any;
    refunds: Array<{
      id: number;
      admin_graphql_api_id: string;
      created_at: string;
      note: string;
      order_id: number;
      processed_at: string;
      restock: boolean;
      total_duties_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      user_id: number;
      order_adjustments: Array<any>;
      transactions: Array<{
        id: number;
        admin_graphql_api_id: string;
        amount: string;
        authorization: string;
        created_at: string;
        currency: string;
        device_id: any;
        error_code: any;
        gateway: string;
        kind: string;
        location_id: any;
        message: any;
        order_id: number;
        parent_id: number;
        processed_at: string;
        receipt: {};
        source_name: string;
        status: string;
        test: boolean;
        user_id: any;
      }>;
      refund_line_items: Array<{
        id: number;
        line_item_id: number;
        location_id: number;
        quantity: number;
        restock_type: string;
        subtotal: number;
        subtotal_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        total_tax: number;
        total_tax_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        line_item: {
          id: number;
          admin_graphql_api_id: string;
          fulfillable_quantity: number;
          fulfillment_service: string;
          fulfillment_status: any;
          gift_card: boolean;
          grams: number;
          name: string;
          price: string;
          price_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          product_exists: boolean;
          product_id: number;
          properties: Array<{
            name: string;
            value: string;
          }>;
          quantity: number;
          requires_shipping: boolean;
          sku: string;
          taxable: boolean;
          title: string;
          total_discount: string;
          total_discount_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          variant_id: number;
          variant_inventory_management: string;
          variant_title: string;
          vendor: any;
          tax_lines: Array<{
            price: string;
            price_set: {
              shop_money: {
                amount: string;
                currency_code: string;
              };
              presentment_money: {
                amount: string;
                currency_code: string;
              };
            };
            rate: number;
            title: string;
          }>;
          duties: Array<any>;
          discount_allocations: Array<{
            amount: string;
            amount_set: {
              shop_money: {
                amount: string;
                currency_code: string;
              };
              presentment_money: {
                amount: string;
                currency_code: string;
              };
            };
            discount_application_index: number;
          }>;
        };
      }>;
      duties: Array<any>;
    }>;
    shipping_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: any;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    shipping_lines: Array<{
      id: number;
      carrier_identifier: any;
      code: string;
      delivery_category: any;
      discounted_price: string;
      discounted_price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      phone: any;
      price: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      requested_fulfillment_service_id: any;
      source: string;
      title: string;
      tax_lines: Array<any>;
      discount_allocations: Array<any>;
    }>;
  }>;
}

export interface Order {
  order: {
    id: number;
    name: string;
    total_price: string;
    line_items: Array<{
      id: number;
      admin_graphql_api_id: string;
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: any;
      gift_card: boolean;
      grams: number;
      name: string;
      price: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      product_exists: boolean;
      product_id: number;
      properties: Array<{
        name: string;
        value: string;
      }>;
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      variant_id: number;
      variant_inventory_management: string;
      variant_title: string;
      vendor: any;
      tax_lines: Array<{
        channel_liable: any;
        price: string;
        price_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        rate: number;
        title: string;
      }>;
      duties: Array<any>;
      discount_allocations: Array<{
        amount: string;
        amount_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        discount_application_index: number;
      }>;
    }>;
  };
}

export interface OrdersByCustomer {
  orders: Array<{
    id: number;
    admin_graphql_api_id: string;
    app_id: any;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: any;
    cancelled_at: any;
    cart_token: string;
    checkout_id: number;
    checkout_token: string;
    client_details: {
      accept_language: any;
      browser_height: any;
      browser_ip: string;
      browser_width: any;
      session_hash: any;
      user_agent: any;
    };
    closed_at: any;
    confirmation_number: any;
    confirmed: boolean;
    contact_email: string;
    created_at: string;
    currency: string;
    current_subtotal_price: string;
    current_subtotal_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_additional_fees_set: any;
    current_total_discounts: string;
    current_total_discounts_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_duties_set: any;
    current_total_price: string;
    current_total_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    current_total_tax: string;
    current_total_tax_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    customer_locale: any;
    device_id: any;
    discount_codes: Array<{
      code: string;
      amount: string;
      type: string;
    }>;
    email: string;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillment_status: any;
    landing_site: string;
    landing_site_ref: string;
    location_id: any;
    merchant_of_record_app_id: any;
    name: string;
    note: any;
    note_attributes: Array<{
      name: string;
      value: string;
    }>;
    number: number;
    order_number: number;
    order_status_url: string;
    original_total_additional_fees_set: any;
    original_total_duties_set: any;
    payment_gateway_names: Array<string>;
    phone: string;
    po_number: string;
    presentment_currency: string;
    processed_at: string;
    reference: string;
    referring_site: string;
    source_identifier: string;
    source_name: string;
    source_url: any;
    subtotal_price: string;
    subtotal_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    tags: string;
    tax_exempt: boolean;
    tax_lines: Array<{
      price: string;
      rate: number;
      title: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      channel_liable: any;
    }>;
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_line_items_price: string;
    total_line_items_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_outstanding: string;
    total_price: string;
    total_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_shipping_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_tax: string;
    total_tax_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
      presentment_money: {
        amount: string;
        currency_code: string;
      };
    };
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: any;
    billing_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: any;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    customer: {
      id: number;
      email: string;
      accepts_marketing: boolean;
      created_at: string;
      updated_at: string;
      first_name: string;
      last_name: string;
      state: string;
      note: any;
      verified_email: boolean;
      multipass_identifier: any;
      tax_exempt: boolean;
      phone: string;
      email_marketing_consent: {
        state: string;
        opt_in_level: any;
        consent_updated_at: string;
      };
      sms_marketing_consent: {
        state: string;
        opt_in_level: string;
        consent_updated_at: string;
        consent_collected_from: string;
      };
      tags: string;
      currency: string;
      accepts_marketing_updated_at: string;
      marketing_opt_in_level: any;
      tax_exemptions: Array<any>;
      admin_graphql_api_id: string;
      default_address: {
        id: number;
        customer_id: number;
        first_name: any;
        last_name: any;
        company: any;
        address1: string;
        address2: string;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone: string;
        name: string;
        province_code: string;
        country_code: string;
        country_name: string;
        default: boolean;
      };
    };
    discount_applications: Array<{
      target_type: string;
      type: string;
      value: string;
      value_type: string;
      allocation_method: string;
      target_selection: string;
      code: string;
    }>;
    fulfillments: Array<{
      id: number;
      admin_graphql_api_id: string;
      created_at: string;
      location_id: number;
      name: string;
      order_id: number;
      origin_address: {};
      receipt: {
        testcase: boolean;
        authorization: string;
      };
      service: string;
      shipment_status: any;
      status: string;
      tracking_company: string;
      tracking_number: string;
      tracking_numbers: Array<string>;
      tracking_url: string;
      tracking_urls: Array<string>;
      updated_at: string;
      line_items: Array<{
        id: number;
        admin_graphql_api_id: string;
        fulfillable_quantity: number;
        fulfillment_service: string;
        fulfillment_status: any;
        gift_card: boolean;
        grams: number;
        name: string;
        price: string;
        price_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        product_exists: boolean;
        product_id: number;
        properties: Array<{
          name: string;
          value: string;
        }>;
        quantity: number;
        requires_shipping: boolean;
        sku: string;
        taxable: boolean;
        title: string;
        total_discount: string;
        total_discount_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        variant_id: number;
        variant_inventory_management: string;
        variant_title: string;
        vendor: any;
        tax_lines: Array<{
          channel_liable: any;
          price: string;
          price_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          rate: number;
          title: string;
        }>;
        duties: Array<any>;
        discount_allocations: Array<{
          amount: string;
          amount_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          discount_application_index: number;
        }>;
      }>;
    }>;
    line_items: Array<{
      id: number;
      admin_graphql_api_id: string;
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: any;
      gift_card: boolean;
      grams: number;
      name: string;
      price: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      product_exists: boolean;
      product_id: number;
      properties: Array<{
        name: string;
        value: string;
      }>;
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      variant_id: number;
      variant_inventory_management: string;
      variant_title: string;
      vendor: any;
      tax_lines: Array<{
        channel_liable: any;
        price: string;
        price_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        rate: number;
        title: string;
      }>;
      duties: Array<any>;
      discount_allocations: Array<{
        amount: string;
        amount_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        discount_application_index: number;
      }>;
    }>;
    payment_terms: any;
    refunds: Array<{
      id: number;
      admin_graphql_api_id: string;
      created_at: string;
      note: string;
      order_id: number;
      processed_at: string;
      restock: boolean;
      total_additional_fees_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      total_duties_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      user_id: number;
      order_adjustments: Array<any>;
      transactions: Array<{
        id: number;
        admin_graphql_api_id: string;
        amount: string;
        authorization: string;
        created_at: string;
        currency: string;
        device_id: any;
        error_code: any;
        gateway: string;
        kind: string;
        location_id: any;
        message: any;
        order_id: number;
        parent_id: number;
        payment_id: string;
        processed_at: string;
        receipt: {};
        source_name: string;
        status: string;
        test: boolean;
        user_id: any;
      }>;
      refund_line_items: Array<{
        id: number;
        line_item_id: number;
        location_id: number;
        quantity: number;
        restock_type: string;
        subtotal: number;
        subtotal_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        total_tax: number;
        total_tax_set: {
          shop_money: {
            amount: string;
            currency_code: string;
          };
          presentment_money: {
            amount: string;
            currency_code: string;
          };
        };
        line_item: {
          id: number;
          admin_graphql_api_id: string;
          fulfillable_quantity: number;
          fulfillment_service: string;
          fulfillment_status: any;
          gift_card: boolean;
          grams: number;
          name: string;
          price: string;
          price_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          product_exists: boolean;
          product_id: number;
          properties: Array<{
            name: string;
            value: string;
          }>;
          quantity: number;
          requires_shipping: boolean;
          sku: string;
          taxable: boolean;
          title: string;
          total_discount: string;
          total_discount_set: {
            shop_money: {
              amount: string;
              currency_code: string;
            };
            presentment_money: {
              amount: string;
              currency_code: string;
            };
          };
          variant_id: number;
          variant_inventory_management: string;
          variant_title: string;
          vendor: any;
          tax_lines: Array<{
            channel_liable: any;
            price: string;
            price_set: {
              shop_money: {
                amount: string;
                currency_code: string;
              };
              presentment_money: {
                amount: string;
                currency_code: string;
              };
            };
            rate: number;
            title: string;
          }>;
          duties: Array<any>;
          discount_allocations: Array<{
            amount: string;
            amount_set: {
              shop_money: {
                amount: string;
                currency_code: string;
              };
              presentment_money: {
                amount: string;
                currency_code: string;
              };
            };
            discount_application_index: number;
          }>;
        };
      }>;
      duties: Array<any>;
      additional_fees: Array<any>;
    }>;
    shipping_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: any;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    shipping_lines: Array<{
      id: number;
      carrier_identifier: any;
      code: string;
      discounted_price: string;
      discounted_price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      phone: any;
      price: string;
      price_set: {
        shop_money: {
          amount: string;
          currency_code: string;
        };
        presentment_money: {
          amount: string;
          currency_code: string;
        };
      };
      requested_fulfillment_service_id: any;
      source: string;
      title: string;
      tax_lines: Array<any>;
      discount_allocations: Array<any>;
    }>;
  }>;
}

export type OrderStatus = "open" | "close" | "cancelled" | "any";

export interface QueryOrders extends QueryCustomers {
  attribution_app_id?: string;
  financial_status?:
    | "authorized"
    | "pending"
    | "paid"
    | "partially_paid"
    | "refunded"
    | "voided"
    | "partially_refunded"
    | "any"
    | "unpaid";
  fulfillment_status?:
    | "shipped"
    | "partial"
    | "unshipped"
    | "any"
    | "unfulfilled";
  status?: OrderStatus;
  processed_at_max?: string;
  processed_at_min?: string;
}

interface ProductDetail {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: any;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: Array<{
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: any;
    fulfillment_service: string;
    inventory_management: string;
    option1: string;
    option2: any;
    option3: any;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string;
    grams: number;
    image_id?: number;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    presentment_prices: Array<{
      price: {
        amount: string;
        currency_code: string;
      };
      compare_at_price: any;
    }>;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
  }>;
  options: Array<{
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: Array<string>;
  }>;
  images: Array<{
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: any;
    width: number;
    height: number;
    src: string;
    variant_ids: Array<number>;
    admin_graphql_api_id: string;
  }>;
  image?: {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: any;
    width: number;
    height: number;
    src: string;
    variant_ids: Array<any>;
    admin_graphql_api_id: string;
  };
}

export interface Products {
  products: ProductDetail[];
}

export interface Product {
  product: ProductDetail;
}

export interface QueryProducts extends QueryCustomers {
  collection_id?: string;
  handle?: string;
  presentment_currencies?: string;
  product_type?: string;
  published_at_max?: string;
  published_at_min?: string;
  published_status?: "published" | "unpublished" | "any";
  status?: "active" | "archived" | "draft";
  title?: string;
  vendor?: string;
}

export interface Payouts {
  payouts: Array<{
    id: number;
    status: string;
    date: string;
    currency: string;
    amount: string;
    summary: {
      adjustments_fee_amount: string;
      adjustments_gross_amount: string;
      charges_fee_amount: string;
      charges_gross_amount: string;
      refunds_fee_amount: string;
      refunds_gross_amount: string;
      reserved_funds_fee_amount: string;
      reserved_funds_gross_amount: string;
      retried_payouts_fee_amount: string;
      retried_payouts_gross_amount: string;
    };
  }>;
}

export interface QueryPayouts {
  date?: string;
  date_max?: string;
  date_min?: string;
  last_id?: string;
  since_id?: string;
  status?: "scheduled" | "in_transit" | "paid" | "failed" | "canceled";
}

import { HandlerContext, Handlers } from 'fresh/server.ts'

export interface Product {
  'id': string
  'ASIN': string
  'Product title': string
  'Category': string
}

export const products: Product[] = [
  {
    'id': '1',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Apple iMac 27"',
    'Category': 'Desktop PC',
  },
  {
    'id': '2',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Sony PlayStation 5',
    'Category': 'Gaming Console',
  },
  {
    'id': '3',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Samsung 65" 4K Smart TV',
    'Category': 'TV',
  },
  {
    'id': '4',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Canon EOS R5 Mirrorless Camera',
    'Category': 'Camera',
  },
  {
    'id': '5',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Bose QuietComfort 35 II Wireless Headphones',
    'Category': 'Headphones',
  },
  {
    'id': '6',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Apple iPhone 13 Pro Max',
    'Category': 'Smartphone',
  },
  {
    'id': '7',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Dell XPS 15 Laptop',
    'Category': 'Laptop',
  },
  {
    'id': '8',
    'ASIN': 'B08HJTH61J',
    'Product title': 'LG 55" OLED 4K UHD Smart TV',
    'Category': 'TV',
  },
  {
    'id': '9',
    'ASIN': 'B08HJTH61J',
    'Product title': 'GoPro HERO9 Black',
    'Category': 'Action Camera',
  },
  {
    'id': '10',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Apple iPad Pro 12.9"',
    'Category': 'Tablet',
  },
  {
    'id': '11',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Apple MacBook Pro 16"',
    'Category': 'Laptop',
  },
  {
    'id': '12',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Apple AirPods Pro',
    'Category': 'Headphones',
  },
  {
    'id': '13',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Samsung Galaxy S21 Ultra',
    'Category': 'Smartphone',
  },
  {
    'id': '14',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Sony WH-1000XM4 Wireless Headphones',
    'Category': 'Headphones',
  },
  {
    'id': '15',
    'ASIN': 'B08HJTH61J',
    'Product title': 'Samsung Galaxy Tab S7+',
    'Category': 'Tablet',
  },
]

export const handler: Handlers = {
  GET(_req: Request, _ctx: HandlerContext) {
    const data = products
    return Response.json(data)
  },
}

const brands = [
  {
    id: 1,
    title: "Brand 1",
    sort: "100",
    code: "brand_1"
  },
  {
    id: 2,
    title: "Brand 2",
    sort: "200",
    code: "brand_2"
  },
  {
    id: 3,
    title: "Brand 3",
    sort: "300",
    code: "brand_3"
  },
  {
    id: 4,
    title: "Brand 4",
    sort: "400",
    code: "brand_4"
  },
  {
    id: 5,
    title: "Brand 5",
    sort: "500",
    code: "brand_5"
  },
  {
    id: 6,
    title: "Brand 6",
    sort: "600",
    code: "brand_6"
  },
  {
    id: 7,
    title: "Brand 7",
    sort: "700",
    code: "brand_7"
  },
  {
    id: 8,
    title: "Brand 8",
    sort: "700",
    code: "brand_8"
  },
  {
    id: 9,
    title: "Brand 9",
    sort: "900",
    code: "brand_9"
  }
]

const x = [
  {
    "type": "simple",
    "id": 1,
    "sku": "s1",
    "title": "Product 1",
    "regular_price": {
      "currency": "USD",
      "value": 27.12
    },
    "image": "/images/1.png",
    "brand": 9
  },
  {
    "type": "simple",
    "id": 2,
    "sku": "s2",
    "title": "Product 2",
    "regular_price": {
      "currency": "USD",
      "value": 36.87
    },
    "image": "/images/2.png",
    "brand": 8
  },
  {
    "type": "simple",
    "id": 3,
    "sku": "s3",
    "title": "Product 3",
    "regular_price": {
      "currency": "USD",
      "value": 28.91
    },
    "image": "/images/3.png",
    "brand": 2
  },
  {
    "type": "simple",
    "id": 4,
    "sku": "s4",
    "title": "Product 4",
    "regular_price": {
      "currency": "USD",
      "value": 41.23
    },
    "image": "/images/4.png",
    "brand": 7
  },
  {
    "type": "simple",
    "id": 5,
    "sku": "s5",
    "title": "Product 5",
    "regular_price": {
      "currency": "USD",
      "value": 88.00
    },
    "image": "/images/5.png",
    "brand": 3
  },
  {
    "type": "simple",
    "id": 6,
    "sku": "s6",
    "title": "Product 6",
    "regular_price": {
      "currency": "USD",
      "value": 127.41
    },
    "image": "/images/6.png",
    "brand": 6
  },
  {
    "type": "simple",
    "id": 7,
    "sku": "s7",
    "title": "Product 7",
    "regular_price": {
      "currency": "USD",
      "value": 123.40
    },
    "image": "/images/7.png",
    "brand": 5
  },
  {
    "type": "simple",
    "id": 8,
    "sku": "s8",
    "title": "Product 8",
    "regular_price": {
      "currency": "USD",
      "value": 92.32
    },
    "image": "/images/8.png",
    "brand": 1
  },
  {
    "type": "simple",
    "id": 9,
    "sku": "s9",
    "title": "Product 9",
    "regular_price": {
      "currency": "USD",
      "value": 53.40
    },
    "image": "/images/9.png",
    "brand": 2
  }
]

//для теста пагинации
const y = [...x,
{
  "type": "simple",
  "id": 10,
  "sku": "s1",
  "title": "Product 1",
  "regular_price": {
    "currency": "USD",
    "value": 27.12
  },
  "image": "/images/1.png",
  "brand": 9
},
{
  "type": "simple",
  "id": 11,
  "sku": "s2",
  "title": "Product 2",
  "regular_price": {
    "currency": "USD",
    "value": 36.87
  },
  "image": "/images/2.png",
  "brand": 8
},
{
  "type": "simple",
  "id": 12,
  "sku": "s3",
  "title": "Product 3",
  "regular_price": {
    "currency": "USD",
    "value": 28.91
  },
  "image": "/images/3.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 13,
  "sku": "s4",
  "title": "Product 4",
  "regular_price": {
    "currency": "USD",
    "value": 41.23
  },
  "image": "/images/4.png",
  "brand": 7
},
{
  "type": "simple",
  "id": 14,
  "sku": "s5",
  "title": "Product 5",
  "regular_price": {
    "currency": "USD",
    "value": 88.00
  },
  "image": "/images/5.png",
  "brand": 3
},
{
  "type": "simple",
  "id": 15,
  "sku": "s6",
  "title": "Product 6",
  "regular_price": {
    "currency": "USD",
    "value": 127.41
  },
  "image": "/images/6.png",
  "brand": 6
},
{
  "type": "simple",
  "id": 16,
  "sku": "s7",
  "title": "Product 7",
  "regular_price": {
    "currency": "USD",
    "value": 123.40
  },
  "image": "/images/7.png",
  "brand": 5
},
{
  "type": "simple",
  "id": 17,
  "sku": "s8",
  "title": "Product 8",
  "regular_price": {
    "currency": "USD",
    "value": 92.32
  },
  "image": "/images/8.png",
  "brand": 1
},
{
  "type": "simple",
  "id": 18,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 19,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 20,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 21,
  "sku": "s2",
  "title": "Product 2",
  "regular_price": {
    "currency": "USD",
    "value": 36.87
  },
  "image": "/images/2.png",
  "brand": 8
},
{
  "type": "simple",
  "id": 22,
  "sku": "s3",
  "title": "Product 3",
  "regular_price": {
    "currency": "USD",
    "value": 28.91
  },
  "image": "/images/3.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 23,
  "sku": "s4",
  "title": "Product 4",
  "regular_price": {
    "currency": "USD",
    "value": 41.23
  },
  "image": "/images/4.png",
  "brand": 7
},
{
  "type": "simple",
  "id": 24,
  "sku": "s5",
  "title": "Product 5",
  "regular_price": {
    "currency": "USD",
    "value": 88.00
  },
  "image": "/images/5.png",
  "brand": 3
},
{
  "type": "simple",
  "id": 25,
  "sku": "s6",
  "title": "Product 6",
  "regular_price": {
    "currency": "USD",
    "value": 127.41
  },
  "image": "/images/6.png",
  "brand": 6
},
{
  "type": "simple",
  "id": 26,
  "sku": "s7",
  "title": "Product 7",
  "regular_price": {
    "currency": "USD",
    "value": 123.40
  },
  "image": "/images/7.png",
  "brand": 5
},
{
  "type": "simple",
  "id": 27,
  "sku": "s8",
  "title": "Product 8",
  "regular_price": {
    "currency": "USD",
    "value": 92.32
  },
  "image": "/images/8.png",
  "brand": 1
},
{
  "type": "simple",
  "id": 28,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 29,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 30,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 31,
  "sku": "s2",
  "title": "Product 2",
  "regular_price": {
    "currency": "USD",
    "value": 36.87
  },
  "image": "/images/2.png",
  "brand": 8
},
{
  "type": "simple",
  "id": 32,
  "sku": "s3",
  "title": "Product 3",
  "regular_price": {
    "currency": "USD",
    "value": 28.91
  },
  "image": "/images/3.png",
  "brand": 2
},
{
  "type": "simple",
  "id": 33,
  "sku": "s4",
  "title": "Product 4",
  "regular_price": {
    "currency": "USD",
    "value": 41.23
  },
  "image": "/images/4.png",
  "brand": 7
},
{
  "type": "simple",
  "id": 34,
  "sku": "s5",
  "title": "Product 5",
  "regular_price": {
    "currency": "USD",
    "value": 88.00
  },
  "image": "/images/5.png",
  "brand": 3
},
{
  "type": "simple",
  "id": 35,
  "sku": "s6",
  "title": "Product 6",
  "regular_price": {
    "currency": "USD",
    "value": 127.41
  },
  "image": "/images/6.png",
  "brand": 6
},
{
  "type": "simple",
  "id": 36,
  "sku": "s7",
  "title": "Product 7",
  "regular_price": {
    "currency": "USD",
    "value": 123.40
  },
  "image": "/images/7.png",
  "brand": 5
},
{
  "type": "simple",
  "id": 37,
  "sku": "s8",
  "title": "Product 8",
  "regular_price": {
    "currency": "USD",
    "value": 92.32
  },
  "image": "/images/8.png",
  "brand": 1
},
{
  "type": "simple",
  "id": 38,
  "sku": "s9",
  "title": "Product 9",
  "regular_price": {
    "currency": "USD",
    "value": 53.40
  },
  "image": "/images/9.png",
  "brand": 2
},
]

const products = [
  ...x
  // ...y
]

/* Понятное дело, вместо этого должен быть запрос с limit и skip, но имеем, что имеем.
Также из-за того, что оно без запроса на сервер так плохо выглядет и свя́зи с реальным приложением не имеет, 
не стал делать дополнительные задания на поиск (параметр query), сортировку (sort) и т.п. */
export const getProducts = (limit = 6, skip = 0, activeBrands?: string[]) => {
  if (activeBrands == null || activeBrands.length < 1) {
    return products.slice(skip, skip + limit);
  } else {
    const filtred = products.filter(product => activeBrands.includes(product.brand.toString()));
    return filtred.slice(skip, skip + limit);
  }
}

export const getProductsCount = (activeBrands?: string[]) => {
  if (activeBrands == null || activeBrands.length < 1) {
    return products.length;
  } else {
    const filtred = products.filter(product => activeBrands.includes(product.brand.toString()));
    return filtred.length;
  }
}

export const getAllBrands = () => {
  return brands;
}

export type Brand = typeof brands[number];
export type Product = typeof products[number];
export type RawItem = ReturnType<typeof getProducts>[number]

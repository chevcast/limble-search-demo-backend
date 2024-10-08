// eslint-disable-next-line
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line
const fs = require('node:fs');

const count = 500;

const products = [...Array(count).keys()].map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  brand: faker.company.name(),
  description: faker.commerce.productDescription(),
  price: faker.number.float({
    min: 0,
    max: 5000,
    fractionDigits: 2,
  }),
  inStock: faker.datatype.boolean(),
  quantity: faker.number.int({
    min: 0,
    max: 200,
  }),
  imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
}));

fs.writeFile(
  './src/data/products.json',
  JSON.stringify(products, undefined, 2),
  (error) => {
    if (error) {
      console.error(error);
    }
  },
);

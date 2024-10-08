export class Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  inStock: boolean;
  quantity: number;
  imageUrl: string;
}

export class SearchBody {
  query: string;
}

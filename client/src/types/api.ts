export type Price = {
  currency: string,
  amount: number,
  decimal: number,
};

export type ListItem = {
  id: string,
  title: string,
  price: Price,
  picture: string,
  condition: string,
  free_shipping: boolean,
  region: string,
};

export type DetailedItem = {
  id: string,
  title: string,
  price: Price,
  picture: string,
  condition: string,
  free_shipping: boolean,
  sold_quantity: number,
  description: string,
};

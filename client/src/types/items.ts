import type { Price as ApiPrice } from "./api";

export type Price = ApiPrice;

// TODO: improve this so we don't have duplicates with API types
export type SearchItem = {
  id: string,
  title: string,
  price: Price,
  picture: string,
  // condition: string, // Unused
  freeShipping: boolean,
  region: string, // Custom addition
};

export type ItemInfo = {
  id: string,
  title: string,
  price: Price,
  picture: string,
  condition: string,
  freeShipping: boolean,
  soldQuantity: number,
  description: string,
};

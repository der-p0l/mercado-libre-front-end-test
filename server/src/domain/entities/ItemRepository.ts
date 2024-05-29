import Item from "./Item";

interface ItemRepositoryI {

  findById(id: string): Promise<Item|null>;

  // TODO: improve returned type
  getByQuery(query: string): Promise<{items: Item[], categories: string[]}>;

}

export default ItemRepositoryI;

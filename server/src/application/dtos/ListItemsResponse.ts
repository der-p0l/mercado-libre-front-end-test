import Item from "../../domain/entities/Item";
import Price from "../../domain/value-objects/Price";

class ListItem {

  constructor(
    public id: string,
    public title: string,
    public price: Price,
    public picture: string,
    public condition: string,
    public free_shipping: boolean,
    public region: string
  ) {}

}

class ListItemsResponse {

  public items: ListItem[];

  constructor(
    items: Item[],
    public categories: string[]
  ) {
    this.items = items.map((item) => new ListItem(
      item.id,
      item.title,
      item.price,
      item.picture,
      item.condition,
      item.free_shipping,
      item.region
    ));
  }

}

export default ListItemsResponse;

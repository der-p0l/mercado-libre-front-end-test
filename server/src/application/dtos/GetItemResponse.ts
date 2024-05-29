import Item from "../../domain/entities/Item";
import Price from "../../domain/value-objects/Price";

class DetailedItem {

  constructor(
    public id: string,
    public title: string,
    public price: Price,
    public picture: string,
    public condition: string,
    public free_shipping: boolean,
    public sold_quantity: number,
    public description: string
  ) {}

}

class GetItemResponse {

  public item: DetailedItem|null;
  public categories: string[];

  constructor(
    item: Item|null
  ) {
    if (item) {
      this.item = new DetailedItem(
        item.id,
        item.title,
        item.price,
        item.picture,
        item.condition,
        item.free_shipping,
        item.sold_quantity,
        item.description
      );
      this.categories = item.categories;
    } else {
      this.item = null;
      this.categories = [];
    }
  }

}

export default GetItemResponse;

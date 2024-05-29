import Price from "../value-objects/Price";

class Item {

  constructor(
    public id: string,
    public title: string,
    public price: Price,
    public picture: string,
    public condition: string,
    public free_shipping: boolean,
    public sold_quantity: number,
    public description: string,
    public region: string,
    public categories: string[]
  ) {}

}

export default Item;

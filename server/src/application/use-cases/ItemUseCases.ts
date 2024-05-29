import ItemRepositoryI from "../../domain/entities/ItemRepository";
import GetItemResponse from "../dtos/GetItemResponse";
import ListItemsResponse from "../dtos/ListItemsResponse";

class ItemUseCases {

  constructor(
    public itemRepository: ItemRepositoryI
  ) {
    this.listItems = this.listItems.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  async listItems(query: string) {
    const {items, categories} = await this.itemRepository.getByQuery(query);

    return new ListItemsResponse(items, categories);
  }

  async getItem(id: string) {
    const item = await this.itemRepository.findById(id);

    return new GetItemResponse(item);
  }

}

export default ItemUseCases;

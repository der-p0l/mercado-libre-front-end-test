import Item from "../../../domain/entities/Item";
import ItemRepositoryI from "../../../domain/entities/ItemRepository";
import Price from "../../../domain/value-objects/Price";
import MercadoLibreApiService, { ApiError } from "../services/MercadoLibreApiService";

class ItemRepository implements ItemRepositoryI {

  private mlApiService: MercadoLibreApiService;

  constructor() {
    this.mlApiService = new MercadoLibreApiService();

    this.findById = this.findById.bind(this);
    this.getByQuery = this.getByQuery.bind(this);
  }

  async findById(id: string): Promise<Item | null> {
    let item = null;
    let description = null;

    // Get data from ML
    try {
      item = await this.mlApiService.fetchItemById(id);
      description = await this.mlApiService.fetchItemDescriptionById(item.id);
    } catch (error: any) {
      // Ignores error in case of not found
      if (!(error instanceof ApiError) || (error.status !== 404)) {
        throw error;
      }

      // Exit early since ML returned 404
      return null;
    }

    const priceAmount = Math.floor(item.price);
    const priceDecimal = Math.round((item.price - priceAmount) * 100);
    const price = new Price(
      '$', // TODO: call API to get currency
      priceAmount,
      priceDecimal
    );

    // TODO: hardcoded because it's missing
    const soldQuantity = Math.floor(Math.random() * (800 - 10 + 1)) + 10;

    const categories: string[] = [];
    try {
      const categoryDetail = await this.mlApiService.fetchCategoryById(item.category_id);
  
      // Add category names
      categoryDetail.path_from_root.forEach((category: any) => {
        categories.push(category.name);
      });
    } catch (error) {
      // Ignores error in case of not found
      if (!(error instanceof ApiError) || (error.status !== 404)) {
        throw error;
      }
    }

    return new Item(
      item.id,
      item.title,
      price,
      item.thumbnail,
      item.condition,
      item.shipping.free_shipping,
      soldQuantity,
      description.plain_text,
      item.seller_address.state.name,
      categories
    );
  }

  async getByQuery(query: string): Promise<{items: Item[], categories: string[]}> {
    // Get data from ML
    const data = await this.mlApiService.fetchItemsByQuery(query);
    const {results, available_filters} = data;

    // Define items and categories to return
    const items: Item[] = [];
    const categories: string[] = [];

    const currentResults = results.slice(0, 4);
    // TODO: use types
    currentResults.forEach((result: any) => {
      // TODO: the results from the search API doesn't have all the data needed,
      //       so I hardcoded what is required but I don't have access. I think
      //       this is because the search API may have changed recently.

      const priceAmount = Math.floor(result.price);
      const priceDecimal = Math.round((result.price - priceAmount) * 100);
      const price = new Price(
        '$', // TODO: call API to get currency
        priceAmount,
        priceDecimal
      );

      // TODO: hardcoded because it's missing
      const soldQuantity = Math.floor(Math.random() * (800 - 10 + 1)) + 10;

      items.push(new Item(
        result.id,
        result.title,
        price,
        result.thumbnail,
        result.condition,
        result.shipping.free_shipping,
        soldQuantity,
        '', // It is not needed
        'CABA', // TODO: call API to get region
        [] // It is not needed
      ));
    });

    // Try to find the categories filter
    // TODO: use types
    const categoriesFilter = available_filters.find((filter: any) => filter.id === 'category');
    if (categoriesFilter && categoriesFilter.values.length > 0) {
      const availableCategories = categoriesFilter.values;

      // Sort categories by descending results order
      availableCategories.sort((leftCategory: any, rightCategory: any) => {
        return rightCategory.results - leftCategory.results;
      });

      // Get category detail
      const activeCategory = availableCategories[0];
      try {
        const categoryDetail = await this.mlApiService.fetchCategoryById(activeCategory.id);

        // Add category names
        categoryDetail.path_from_root.forEach((category: any) => {
          categories.push(category.name);
        });
      } catch (error) {
        // Ignores error in case of not found
        if (!(error instanceof ApiError) || (error.status !== 404)) {
          throw error;
        }
      }
    }

    return {items, categories};
  }

}

export default ItemRepository;

// TODO: move this
export class ApiError extends Error {

  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }

}

class MercadoLibreApiService {

  private mlApiBaseUrl: string;

  constructor() {
    const mlApiBaseUrl = process.env.MERCADOLIBRE_API_BASE_URL;
    if (!mlApiBaseUrl) {
      throw new Error('The environment variable "MERCADOLIBRE_API_BASE_URL" should be set and have a value');
    }

    this.mlApiBaseUrl = mlApiBaseUrl;

    this._getRequest = this._getRequest.bind(this);
    this.fetchItemById = this.fetchItemById.bind(this);
    this.fetchItemDescriptionById = this.fetchItemDescriptionById.bind(this);
    this.fetchCategoryById = this.fetchCategoryById.bind(this);
    this.fetchItemsByQuery = this.fetchItemsByQuery.bind(this);
  }

  async _getRequest(path: string, parameters: Record<string, any>|null = null) {
    let pathAndParams = path;
    if (parameters) {
      const urlParams = new URLSearchParams(parameters);
      pathAndParams += `?${urlParams.toString()}`;
    }

    const response = await fetch(`${this.mlApiBaseUrl}${pathAndParams}`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Mercado Libre Api Error: ${response.status} ${response.statusText}`
      );
    }

    return response;
  }

  async fetchItemById(id: string) {
    const response = await this._getRequest(`/items/${encodeURIComponent(id)}`);

    // Get response data
    // TODO: use type for data object
    const data = await response.json();

    return data;
  };

  async fetchItemDescriptionById(id: string) {
    const response = await this._getRequest(`/items/${encodeURIComponent(id)}/description`);

    // Get response data
    // TODO: use type for data object
    const data = await response.json();

    return data;
  }

  async fetchCategoryById(id: string) {
    const response = await this._getRequest(`/categories/${encodeURIComponent(id)}`);

    // Get response data
    // TODO: use type for data object
    const data = await response.json();

    return data;
  }

  async fetchItemsByQuery(query: string) {
    const response = await this._getRequest('/sites/MLA/search', {
      q: query
    });

    // Get response data
    // TODO: use type for data object
    const data = await response.json();

    return data;
  };

}

export default MercadoLibreApiService;

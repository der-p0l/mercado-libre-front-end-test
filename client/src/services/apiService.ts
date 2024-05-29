import type { DetailedItem, ListItem } from "../types/api";
import { getEnvVariable } from "./envService";

const apiBaseUrl = getEnvVariable("API_BASE_URL");
const apiNameSignature = getEnvVariable("API_NAME_SIGNATURE");
const apiLastnameSignature = getEnvVariable("API_LASTNAME_SIGNATURE");

/**
 * Makes a GET request to the API.
 */
const getRequest = async <T>(path: string, parameters: Record<string, any> | null = null) => {
  // Construct request path
  let pathAndParams = path;
  if (parameters) {
    const urlParams = new URLSearchParams(parameters);
    pathAndParams += `?${urlParams.toString()}`;
  }

  // Make request and get response
  // TODO: add authentication
  const response = await fetch(`${apiBaseUrl}${pathAndParams}`);

  // If the request got an error
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data: Record<string, any> = await response.json();

  // Validate data
  if (typeof data !== "object") {
    throw new Error("API Error: The returned data is not an object");
  }

  const {
    author = null,
    ...otherData
  } = data;

  // Validate signature
  if (!author || author.name !== apiNameSignature || author.lastname !== apiLastnameSignature) {
    throw new Error("API Error: The returned API signature doesn't match the current configuration");
  }

  return otherData as T;
};

type ItemListResponse = {
  categories: string[],
  items: ListItem[],
};
/**
 * Get list of items by search query.
 */
export const getItemList = async (query: string) => {
  const data = await getRequest<ItemListResponse>("/items", {
    q: query,
  });

  return data;
};

type ItemDetailResponse = {
  categories: string[],
  item: DetailedItem,
};
/**
 * Get item detail by its ID.
 */
export const getItemDetail = async (id: string) => {
  const data = await getRequest<ItemDetailResponse>(`/items/${encodeURIComponent(id)}`);

  return data;
};

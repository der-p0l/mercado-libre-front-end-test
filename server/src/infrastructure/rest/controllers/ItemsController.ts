import { Request, Response } from "express";
import ApiResponse from "../dtos/ApiResponse";
import ItemUseCases from "../../../application/use-cases/ItemUseCases";
import ItemRepository from "../repositories/ItemRepository";

const itemUseCases = new ItemUseCases(new ItemRepository());

/**
 * Lists all the items by the specified query.
 */
const list = async (req: Request, res: Response) => {
  try {
    const {
      q = null,
    } = req.query;

    // Validate parameter
    if (!q) {
      return res.status(400).send('Missing "q" parameter');
    }
    if (typeof q !== 'string') {
      return res.status(400).send('The parameter "q" must be a valid string');
    }

    // Get items
    const { items, categories } = await itemUseCases.listItems(q);

    const responseDto = new ApiResponse({ categories, items });
    return res.status(200).json(responseDto);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

/**
 * Returns data for one specific item.
 */
const show = async (req: Request, res: Response) => {
  try {
    const {
      id = null,
    } = req.params;

    // Validate parameter
    if (!id) {
      return res.status(400).send('Missing "id" parameter');
    }

    // Get item
    const { item, categories } = await itemUseCases.getItem(id);

    const responseDto = new ApiResponse({ item, categories });
    return res.status(200).json(responseDto);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

export default {
  list,
  show,
};

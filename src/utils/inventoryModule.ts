import axios from "axios";
import config from "config";
import { HttpError } from "./HttpError";
import { logger } from "../libs/logger";

const inventoryModuleUrl = config.get("resourcesModule.url");

export async function getResource(resourceId: string) {
  try {
    logger.debug(`Fetching resource ${resourceId}`);
    const { data } = await axios.get(`${inventoryModuleUrl}/api/inventory/resources/${resourceId}`);
    return data.data.resource;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function makeRequestForGetStatuses(inventoryId: string): Promise<unknown[]> {
  try {
    logger.debug(`Fetching statuses for inventory ${inventoryId}`);
    const response = await axios.get(
      `${inventoryModuleUrl}/api/inventory/statuses/get/${inventoryId}`,
    );
    const { data } = response;
    console.debug(data);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      throw new HttpError(500, error.message);
    }
    throw error;
  }
}

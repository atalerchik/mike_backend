import { logger } from "../libs/logger";
import { HttpError } from "./HttpError";
import { makeRequestForGetStatuses } from "./inventoryModule";

export async function getStatuses(inventoryId: string): Promise<unknown[]> {
  const statuses = await makeRequestForGetStatuses(inventoryId);
  logger.debug(statuses);

  if (!Array.isArray(statuses)) {
    throw new HttpError(404, "Statuses not found or not an array");
  }

  return statuses;
}

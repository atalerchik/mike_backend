import { Request, Response } from "express";
import { logger } from "../libs/logger";
import {
  createNewSchedule,
  deleteScheduleFromDb,
  getAllSchedulesFromDb,
  getResourceStatus,
  getScheduleFromDb,
  getScheduleStatus,
  updateSchedule,
} from "../services/schedule";
import { ListParams } from "../types/common";
import { CreateScheduleRequest } from "../types/scheduling";
import { HttpError } from "../utils/HttpError";
import { errorResponse } from "../utils/errorResponse";
import { getResource } from "../utils/inventoryModule";
import { parseAttributes } from "../utils/parseRequestAttributes";

export async function createScheduleController(req: Request, res: Response) {
  logger.debug(req.query, req.body, req.params);
  try {
    const createScheduleRequest = await parseAttributes(req);
    const resource = await getResource(createScheduleRequest.resourceId);
    if (!resource) {
      throw new HttpError(404, "Resource not found");
    }
    logger.debug(resource.inventoryId);
    const schedule = await createNewSchedule(createScheduleRequest, resource.inventoryId);

    res.status(201).send({ data: schedule, status: "ok" });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function getScheduleController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const schedule = await getScheduleFromDb(id);
    res.status(200).send({ schedule, status: "ok" });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function getListScheduleController(req: Request, res: Response) {
  const { id } = req.params;
  const listParams: ListParams = req.query;
  try {
    const schedules = await getAllSchedulesFromDb(id, listParams);
    if (!schedules.length) {
      throw new HttpError(404, "Schedules not found");
    }
    res.status(200).send({ schedules, status: "ok" });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function deleteScheduleController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const isExist = await getResource(id);

    if (!isExist) {
      throw new HttpError(404, "Resource not found");
    }
    await deleteScheduleFromDb(id);
    res.status(204).send({ status: "ok" });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function updateScheduleController(req: Request, res: Response) {
  const { id } = req.params;
  const updateBody: Omit<CreateScheduleRequest, "resourceId" | "taskId"> = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    availableStatus: req.body.availableStatus,
  };

  try {
    if (updateBody.startTime > updateBody.endTime) {
      throw new HttpError(400, "Start time must be before end time");
    }

    const isExist = await getScheduleFromDb(id);
    if (!isExist) {
      throw new HttpError(404, "Schedule not found");
    }
    const affectedRows = await updateSchedule(id, updateBody);
    res.status(200).send({ affectedRows, status: "ok" });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function getScheduleStatusController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const isExist = await getScheduleFromDb(id);
    if (!isExist) {
      throw new HttpError(404, "Schedule not found");
    }

    const status = await getScheduleStatus(id);

    res.status(200).send({ status: "ok", data: status });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

export async function getResourceStatusController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const isExist = await getResource(id);
    if (!isExist) {
      throw new HttpError(404, "Resource not found");
    }

    const status = await getResourceStatus(id);

    res.status(200).send({ status: "ok", data: status });
  } catch (error) {
    logger.error(error);
    errorResponse(req, res, error);
  }
}

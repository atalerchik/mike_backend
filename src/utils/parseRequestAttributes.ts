import { Request } from "express";
import { HttpError } from "./HttpError";
import { getTask } from "./ScheduleTaskController";
import { CreateScheduleRequest } from "../types/scheduling";
import { logger } from "../libs/logger";

export async function parseAttributes(req: Request): Promise<CreateScheduleRequest> {
  const createScheduleRequest: CreateScheduleRequest = req.body;

  if (createScheduleRequest.taskId) {
    if (!createScheduleRequest.startTime && !createScheduleRequest.endTime) {
      const task = await getTask(createScheduleRequest.taskId);
      if (!task) {
        throw new HttpError(404, "Task not found");
      }
      createScheduleRequest.startTime = task.startDay;
      createScheduleRequest.endTime = task.deadline;

      logger.debug(task);

      return createScheduleRequest;
    } else {
      return createScheduleRequest;
    }
  } else {
    if (!createScheduleRequest.startTime && !createScheduleRequest.endTime) {
      throw new HttpError(404, "Missing required attributes: startTime and endTime");
    }
  }

  return createScheduleRequest;
}

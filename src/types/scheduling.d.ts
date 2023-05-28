import { CommonResponse, ListParams } from "./common";
import { ScheduleError } from "./errors";
import { Resource } from "./inventory";
import { Task } from "./matching";

/**
 * Represents a resource scheduler.
 */
export interface ResourceScheduler<T> {
  /*
   * Creates a new resource schedule with the given data.
   * @param resourceSchedule The resource schedule object containing the data for the new schedule.
   * @returns A Promise that resolves to the newly created resource schedule.
   */
  createResourceSchedule: (
    createScheduleRequest: CreateSheduleRequest<T>,
    options?: CreateScheduleParams,
  ) => Promise<CommonResponse<ResourceSchedule>>;

  /**
   * Gets the schedule for a resource with the given ID.
   * @returns A Promise that resolves to the resource schedule, or null if not found.
   */
  getResourceSchedule: (index?: string, options?: GetScheduleParams) => Promise<Schedule | null>;

  /**
   * Gets the schedules for all resources.
   * @returns A Promise that resolves to an array of resource schedules.
   */
  getResourcesSchedules: (index?: string) => Promise<ResourceSchedule[]>;

  /**
   * Cancels the scheduling for a resource with the given ID.
   * @param resourceSchedule The resource schedule object containing the ID of the resource.
   * @returns A Promise that resolves to the canceled resource schedule, or null
   **/
  cancelResourceScheduling: (
    resourceSchedule: ResourceSchedule,
  ) => Promise<CommonResponse<ResourceSchedule> | null>;

  /**
   * Change the scheduling for a resource with the given ID.
   * @param resourceSchedule The resource schedule object containing the ID of the resource.
   * @param Schedule The schedule object contains the new schedule for the resource.
   * @returns A Promise that resolves to the canceled resource schedule, or null
   **/
  modifyResourceSchedule: (
    resourceSchedule: ResourceSchedule,
    newSchedule: Schedule,
  ) => Promise<CommonResponse<Schedule> | null>;

  /**
   * Checks the correctness of the schedule
   * @param {ResourceSchedule[]} [resourceSchedule] - The resource schedule object for quality check.
   * @param {number[]} [resourcesId] - The resources id array for quality check.
   * @returns {Promise<ErrorQualityCheck | SuccessQualityCheck>} - A Promise that resolves to the canceled resource schedule, or null
   * @throws {Error} - If resourceSchedule or resourcesId are not provided or if resourcesId is empty
   * @throws {TypeError} - If resourceSchedule is not an array or if resourcesId is not an array
   */
  qualityCheck: (
    resourceSchedule?: ResourceSchedule[],
    resourcesId?: number[],
    options?: QualityCheckOptions,
  ) => Promise<ErrorQualityCheck | SuccessQualityCheck | Error | TypeError>;

  sheduleSetup: (setup?: ScheduleSetup) => Promise<CommonResponse<void>>;
  getSheduleSetup: () => Promise<CommonResponse<ScheduleSetup>>;
}

export interface ScheduleSetup {
  minTimeBetweenTasks?: number;
  maxTimeBetweenTasks?: number;
  maxTasksPerDay?: number;
  minDuration?: number;
  maxDuration?: number;
  excludeDays?: string[];
  allowOverlappingTasks?: boolean;
  maxConcurrentTasks?: number;
  maxTaskDuration?: number;
  minTaskDuration?: number;
  taskTimeRanges?: number;
  scheduleStartDate?: number;
  scheduleEndDate?: number;
  maxDaysInAdvance?: number;
  timeZone?: number;
  nightShift?: boolean;
}

export interface QualityCheckOptions {
  excludeTasks?: Task[];
  maxErrors?: number;
  checkAllResources?: boolean;
  // Minimum time in minutes allowed for a task duration
  minTaskDuration?: number;
  // Maximum time in minutes allowed for a task duration
  maxTaskDuration?: number;
  // Minimum time in minutes allowed between two consecutive tasks
  minTimeBetweenTasks?: number;
  // Maximum time in minutes allowed between two consecutive tasks
  maxTimeBetweenTasks?: number;
  // The number of days that a task should be spread across
  minTaskDays?: number;
  // The maximum number of days that a task should be spread across
  maxTaskDays?: number;
  // The maximum number of consecutive working days allowed for a resource
  maxConsecutiveWorkingDays?: number;
  // The maximum number of working days allowed within a given period
  maxWorkingDaysInPeriod?: number;
  // The maximum number of tasks allowed within a given period
  maxTasksInPeriod?: number;
  // The maximum duration in minutes allowed for a resource's working day
  maxWorkingDayDuration?: number;
  allowbDoubleBooking?: boolean;
  allowOutsideTimeLimit?: boolean;
  allowBadTimeSplite?: boolean;
  allowTimeSlotUnavailable?: boolean;
  allowInvalidTimeSlot?: boolean;
  allowConflictingReservation?: boolean;
  allowInvalidReservationDuration?: boolean;
}

export interface GetScheduleParams extends ListParams {
  startDate?: Date;
  endDate?: Date;
}

/**
 * Represent request for creating schedule
 **/
export interface CreateScheduleRequest {
  resourceId: string;
  taskId: string;
  startTime: Date;
  endTime: Date;
  availableStatus: string;
}

export interface CreateScheduleParams {
  createScheduleType?: "Replace with new" | "Merge with old";
  mergePriority?: "lower" | "higher";
  excludeTasks?: Task[];
  minTimeBetweenTasks?: number;
  maxTimeBetweenTasks?: number;
  priority?: number[];
  maxTasksPerDay?: number;
  minDuration?: number;
  maxDuration?: number;
  excludeDays?: string[];
  allowOverlappingTasks?: boolean;
  maxConcurrentTasks?: number;
  maxTaskDuration?: number;
  minTaskDuration?: number;
  taskTimeRanges?: number;
  scheduleStartDate?: number;
  scheduleEndDate?: number;
  maxDaysInAdvance?: number;
  timeZone?: number;
  scheduleType?: "all" | "new" | "repeat";
  nightShift?: boolean;
}

export type Schedule = CreateScheduleRequest & CreateScheduleParams;

/**
 * Represents a scheduled resource.
 */
export interface ResourceSchedule {
  id: number;
  resourceId: string;
  taskId: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Represents a basic quality check result.
 */
export interface BasicQuality {
  /**
   * The result type, either "Success" or "Error".
   */
  type: "Success" | "Error";
  /**
   * The date of the check.
   */
  checkDate: Date;
}

/**
 * Represents a successful quality check result.
 */
export interface SuccessQualityCheck extends BasicQuality {
  /**
   * The result type, always "Success".
   */
  type: "Success";
}

interface ErrorQualityCheck extends ScheduleError, BasicQuality {
  type: "Error";
}

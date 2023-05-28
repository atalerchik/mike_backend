import { GeneralResource } from "./inventory";
import { Schedule } from "./scheduling";

export interface CommonError {
  insufficientPermissions?: boolean;
  dateTime: Date;
}

export interface ScheduleError extends CommonError {
  boubleBooking?: boolean;
  outsideTimeLimit?: boolean;
  badTimeSplite?: string;
  timeSlotUnavailable?: boolean;
  invalidTimeSlot?: boolean;
  conflictingReservation?: boolean;
  invalidReservationDuration?: boolean;
  schedule: Schedule;
  resource: GeneralResource;
}

export interface ResourceError extends CommonError {
  notFound?: boolean;
  resourceAlreadyExists?: boolean;
}

export interface HistoryError extends CommonError {
  notFound?: boolean;
}

export interface MatchingError extends CommonError {
  badResources?: boolean;
  badTasks?: boolean;
  unposible?: boolean;
  zeroTime?: boolean;
}

export interface DecisionError extends CommonError {
  badResources?: boolean;
  badTasks?: boolean;
  unposible?: boolean;
  resourceNotFound?: boolean;
  taskNotFound?: boolean;
}

export interface IntegrityError {
  history: {
    missingData?: boolean;
    invalidData?: boolean;
  };
  schedule: {
    missingData?: boolean;
    invalidData?: boolean;
  };
  invetory: {
    missingData?: boolean;
    invalidData?: boolean;
  };
  decision: {
    missingData?: boolean;
    invalidData?: boolean;
  };
}

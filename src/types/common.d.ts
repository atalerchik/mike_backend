export enum ResponseStatus {
  Ok = "ok",
  Error = "error",
}

export type SuccessResponse<T> = {
  status: ResponseStatus.Ok;
  data: T;
};

export type ErrorResponse = {
  status: ResponseStatus.Error;
  error: ErrorPayload;
};

export interface ApiError extends Error {
  status: number;
  message: string;
}

export interface ErrorPayload {
  message: string;
  code: number;
}

// Interface for common data
interface commonData {
  type: string;
  message: string;
}

// Types for log types
type LogTypes = "error" | "info" | "message" | "another";

// Interface for log
export interface Log {
  level: LogTypes;
  trace_stack: string;
  metrics?: any;
  error?: ErrorPayload;
  timestamp: Date;
}

export type CommonResponse<T> = SuccessResponse<T> | ErrorResponse;

export type PostgresAttributes = {
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export interface ListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

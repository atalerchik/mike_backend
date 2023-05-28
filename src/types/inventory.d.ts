import { CommonResponse, ListParams } from "./common";
import { Dialect } from "sequelize/types";
import { AttributeValue } from "./attributes";
import { Task } from "./matching";
import { ElasticSearchRequest } from "./utils";
import { EvaluationResult } from "./scoreEstimation";

// Resource Controller interface
interface ResourceController<T extends GeneralResource> {
  importInventoryData: (
    params: ImportInventoryFromURLPayload<T> | ImportInventoryFromPayload<T>
  ) => Promise<CommonResponse<ImportResult>>;
  create: (
    params: CreateResourcePayload<T>
  ) => Promise<CommonResponse<Resource<T>>>;

  get: () => Promise<CommonResponse<Resource<T>>>;

  update: (
    params: UpdateResourcePayload<T>
  ) => Promise<CommonResponse<Resource<T>>>;

  delete: () => Promise<Resource<T> | ErrorResponse>;

  list: (
    params: ListParams
  ) => Promise<CommonResponse<ResourceControllerResponse<T>>>;

  calculateScore: (resources: Resource<T>[]) => ResourceWithScore<T>[];

  search: (
    elasticSearchRequest: ElasticSearchRequest
  ) => Promise<ResourceControllerResponse<T> | ErrorResponse>;

  filter: (
    filter: FilterFunction<T>,
    params: ListParams
  ) => Promise<ResourceControllerResponse<T> | ErrorResponse>;

  changeStatus: (
    busyStatus: BusyStatus,
    taskDetails: Task
  ) => Promise<Pick<GeneralResource, "id" | "name" | "busyNow" | "tasks">>;

  saveScoreEstimation: (
    evalutionResult: EvaluationResult | EvaluationResult[]
  ) => Promise<void>;
}

export interface ImportOptions {
  tableName?: string;
  limit?: number;
  orderBy?: string;
}

interface DBConnectionOptions {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

export interface ImportInventoryFromPayload<T> {
  dbConnection: DBConnectionOptions;
  options: Required<ImportOptions>;
  inventoryAttributes: T;
}

export interface ImportInventoryFromURLPayload<T> {
  connectionUrl: string;
  credentials: {
    username: string;
    password: string;
  };
  options: ImportOptions;
  inventoryAttributes: T;
}

interface ImportResult {
  totalImported: number;
  readonly _options: ImportOptions;
  fromUrl: string;
}

type BusyStatus = "no" | "yes" | "vacation" | "sick";

// General Resource interface
export interface GeneralResource {
  id: string;
  name: string;
  company: string;
  endDate: Date | null; // Endless resource
  busyNow: BusyStatus;
  tasks: Task[];
}

// Resource interface with data of type T
export interface Resource<T> extends GeneralResource {
  attributes?: { [key in keyof T]: AttributeValue[] | AttributeValue };
}

// Payloads for Create, Update, and Delete operations
interface CreateResourcePayload<T> extends Omit<GeneralResource, "id"> {
  attributes?: { [key in keyof T]: AttributeValue[] | AttributeValue };
}

interface UpdateResourcePayload<T> extends Partial<GeneralResource> {
  attributes?: { [key in keyof T]: AttributeValue[] };
}

// Response from ResourceController
interface ResourceControllerResponse<T> {
  resources: Resource<T>[];
  total: number;
}

// Error response interface
interface ErrorResponse {
  message: string;
}

// Resource with score interface
interface ResourceWithScore<T> extends Resource<T> {
  score: number;
}

// Filter function interface
interface FilterFunction<T> {
  (resource: Resource<T>): boolean;
}

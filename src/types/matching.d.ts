import { GeneralResource, Resource } from "./inventory";
import { ElasticSearchRequest } from "./utils";

interface MatchingStrategy<T> {
  match: (
    matchingRequest: T,
    matchingOptions?: MatchingOptions,
    matchingAlgorithms?: string[],
    matchedResources?: Resource<T>[]
  ) => Promise<SingleMatchResult | MultiMatchResult>;
}

/**
 * In this case we can use *Strategy Design Pattern*
 * All of our matching algorithms are different strategies that we can change on demand
 */
export interface MatchingModules<T> {
  multiMatching: (
    multiMatchingRequest: MultiMatchRequest,
    matchingAlgorithms?: string[],
    matchingOptions?: MatchingOptions,
    matchedResources?: Resource<T>[]
  ) => Promise<MultiMatchResult>;
  singleMatching: (
    singleMatchingRequest: SingleMatchRequest,
    matchingAlgorithms?: string[],
    matchingOptions?: MatchingOptions,
    matchedResources?: Resource<T>[]
  ) => Promise<SingleMatchResult>;
}

export type SkillLevel = string | number | string[] | number[];

export interface Skill {
  name: string;
  level: SkillLevel;
  deferred?: boolean;
  deferredDays?: number;
  expired?: Date;
}

export interface Task {
  name: string;
  skills: Skill[];
  startDate?: Date;
  deadline?: Date;
  customer?: string;
  taskType: "once" | "reapeat";
}

export interface Filter {
  name: string;
  value: string | string[];
  type?: "less than" | "more than" | "equal to" | "not equal to";
  order?: "asc" | "desc";
}

export interface ExchangeTask extends Task {
  priority?: number;
  type?: string;
  weight?: number;
}

export interface SingleMatchRequest extends ElasticSearchRequest {
  filters: Filter[];
  task: Task;
}

export interface MultiMatchRequest extends ElasticSearchRequest {
  filters: Filter[];
  tasks: ExchangeTask[];
}

export interface MatchingResult {
  cost: number;
  resources: GeneralResource[];
}

export interface MultiMatchResult {
  [taskName: string]: MatchingResult;
}

export interface SingleMatchResult {
  task: Task;
  cost: number;
  resources: GeneralResource[];
}

export interface MatchingOptions {
  maxCost?: number; // maximum cost allowed for the matching operation
  minQualityLevel?: string; // minimum quality level required for resources
  minQuality?: string; // minimum quality level required for the matching operation
  preferredResources?: GeneralResource[]; // an array of preferred resources to use for the matching operation
  maxTime?: number; // maximum time allowed for the matching operation, in milliseconds
  ignoreAvailability?: boolean; // whether or not to ignore the availability of resources when making matches
  feedbackRequested?: boolean; // whether or not to request feedback from users after the matching operation is completed
  integratedWithScheduleModule?: boolean; // whether or not to request feedback from users after the matching operation is completed
}

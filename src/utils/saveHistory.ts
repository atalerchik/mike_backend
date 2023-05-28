import axios from "axios";
import config from "config";
import { Schedules } from "mp-models";
import { Schedule } from "../types/scheduling";

const historyUrl: string = config.get("historyModule.url");
const historyType: string = config.get("historyModule.historyType");

export async function saveHistory(schedule: Schedules) {
  const response = await axios.post<{
    id: string;
    schedule: Schedule;
  }>(`${historyUrl}/api/history/save`, {
    historyType,
    schedule,
  });

  return response.data;
}

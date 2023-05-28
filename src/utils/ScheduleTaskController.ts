import axios from "axios";
import config from "config";

export const getTask = async (taskId: string) => {
  const taskModuleUrl = config.get("taskModule.url");
  const getTaskEndpointPath = config.get("taskModule.getTaskEndpointPath");
  const { data } = await axios.get(`${taskModuleUrl}/${getTaskEndpointPath}/${taskId}`);

  return data.data.task;
};

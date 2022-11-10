import { TaskDto } from "src/tasks/dtos/task.dto";

export interface FetchAllTasksResponse {
  tasks: TaskDto[];
}
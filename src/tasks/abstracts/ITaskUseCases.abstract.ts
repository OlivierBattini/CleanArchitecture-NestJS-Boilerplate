import { Result } from "../../shared/domain/result/Result";
import { Task } from "../entities/task.entity";
import { CreateTaskRequest } from "../usecases/create-task/fetch-all-tasks.request";
import { DeleteTaskParams } from "../usecases/delete-task/delete-task.params";
import { UpdateTaskParams } from "../usecases/update-task/update-task.params";
import { UpdateTaskRequest } from "../usecases/update-task/update-task.request";

export interface ITaskUseCases {
  fetchAllTasks(): Promise<Result<Task[]>>;
  createTask(request: CreateTaskRequest): Promise<Result<Task>>;
  updateTask(params: UpdateTaskParams, request: UpdateTaskRequest): Promise<Result<Task>>;
  deleteTask(params: DeleteTaskParams): Promise<Result<void>>;
}
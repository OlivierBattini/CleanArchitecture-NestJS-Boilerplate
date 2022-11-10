import { Task } from "../entities/task.entity";

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
}
import { Result } from "../../../shared/domain/result/Result";
import { Task } from "../../entities/task.entity";

export type FetchAllTasksResult = Result<Task[]>;
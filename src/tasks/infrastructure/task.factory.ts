import { Injectable } from "@nestjs/common";
import { Result } from "src/shared/domain/result/Result";

import { IFactory } from "../../shared/domain/abstracts/factory.abstract";
import { ITaskModel } from "../abstracts/ITaskModel.abstract";
import { TaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task.entity";
import { TaskModel } from "./task.model";

@Injectable()
export class TaskFactory implements IFactory<Task, TaskModel, TaskDto> {
  public fromModel(model: TaskModel): Result<Task> {
    return Task.create({
      taskDescription: model.description,
      taskIsDone: model.isDone,
      taskCreatedAt: model.createdAt,
    },
    model.id);
  }

  public fromModelCollection(modelCollection: TaskModel[]): Result<Task[]> {
    const taskResults = modelCollection.map(taskModel => this.fromModel(taskModel));
    const errorResults = taskResults.filter(taskResult => taskResult.isFailure);
    if (errorResults.length > 0) {
      return Result.failure<Task[]>(errorResults[0].error);
    }
    const taskCollection: Task[] = taskResults.map(taskResult => taskResult.value);
    return Result.success<Task[]>(taskCollection);
  }

  public toModel(entity: Task): TaskModel {
    const taskModelProps: ITaskModel = {
      id: entity.id,
      description: entity.props.taskDescription,
      isDone: entity.props.taskIsDone,
      createdAt: entity.props.taskCreatedAt,
    };
    return taskModelProps as TaskModel;
  }

  public fromDto(dto: TaskDto): Result<Task> {
    return Task.create({
      taskDescription: dto.description,
      taskIsDone: dto.isDone,
      taskCreatedAt: new Date(dto.createdAt),
    },
    dto.id);
  }

  public toDto(entity: Task): TaskDto {
    const taskDto: TaskDto = {
      id: entity.id,
      description: entity.props.taskDescription,
      isDone: entity.props.taskIsDone,
      createdAt: entity.props.taskCreatedAt.toJSON(),
    };
    return taskDto;
  }
}
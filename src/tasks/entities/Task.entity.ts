import { Result } from "../../shared/domain/result/Result";
import { Entity } from "../../shared/domain/abstracts/entity.abstract";
import { TaskError } from "./task.error";

type TaskProps = {
  taskDescription: string;
  taskIsDone: boolean;
  taskCreatedAt: Date;
};

export class Task extends Entity<TaskProps> {
  /**
   * Nota: in Clean Architecture, using a private constructor
   * is necessary to protect an Entity from being created
   * without proper business rules validation.
   */
  private constructor(props: TaskProps, id?: string) {
    super(props, id);
  }

  /**
   * Creates a new Task based on props
   * after checking business rules validation.
   */
  public static create(props: TaskProps, id?: string): Result<Task> {
    if (props.taskDescription.length < 3) {
      return Result.failure<Task>(new TaskError.TaskDescriptionValidationError());
    }

    if (props.taskCreatedAt > new Date()) {
      return Result.failure<Task>(new TaskError.TaskCreatedAtValidationError());
    }

    const task = new Task(props, id);
    return Result.success<Task>(task);
  }
}
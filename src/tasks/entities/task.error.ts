import { DomainError } from "../../shared/domain/abstracts/domain-error.abstract";

export namespace TaskError {
  export class TaskDescriptionValidationError extends DomainError {
    constructor() {
      super('Task description must be at least 3 characters long');
    }
  }

  export class TaskCreatedAtValidationError extends DomainError {
    constructor() {
      super('Task creation date must be posterior to current date/time');
    }
  }
  
  export class TaskIdNotFoundError extends DomainError {
    constructor(id: string) {
      super(`Task id ${id} not found`);
    }
  }
}
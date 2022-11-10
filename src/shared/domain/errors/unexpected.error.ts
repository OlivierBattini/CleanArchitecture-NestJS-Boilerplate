import { DomainError } from "../abstracts/domain-error.abstract";

export class UnexpectedError extends DomainError {
  constructor(message?: string) {
    super(message ? message : 'Unexpected Error');
  }
}
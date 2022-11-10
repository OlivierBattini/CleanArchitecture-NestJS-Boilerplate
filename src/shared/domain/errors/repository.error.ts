import { DomainError } from "../abstracts/domain-error.abstract";

export class RepositoryError extends DomainError {
  constructor(message?: string) {
    super(message ? message : 'Repository Error');
  }
}
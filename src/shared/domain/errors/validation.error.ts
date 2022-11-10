import { DomainError } from "../abstracts/domain-error.abstract";

export class ValidationError extends DomainError {
  constructor(propertyName: string, constraintMessage: string) {
    super(`ValidationError : Property '${propertyName}' does not match constraint message: ${constraintMessage}`);
  }
}
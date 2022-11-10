import { DomainError } from "../abstracts/domain-error.abstract";

export class Result<T> {
  private constructor(
    private _isSuccess: boolean,
    private _error?: DomainError,
    private _value?: T,
  ) {
    if (this._isSuccess && this._error) {
      throw new Error(`Invalid operation : A success result cannot contain an error`);
    }
    
    if (!this._isSuccess && !this._error) {
      throw new Error(`Invalid operation : A failed result must contain an error`);
    }
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get value(): T {
    if (!this._isSuccess) {
      throw new Error(`Invalid operation : Cannot get value from a failed result`);
    }
    return this._value;
  }

  public get error(): DomainError {
    if (this._isSuccess) {
      throw new Error(`Invalid operation : Cannot get error from a success result`);
    }
    return this._error;
  }

  public static success<T>(value?: T): Result<T> {
    return new Result<T>(true, null, value);
  }

  public static failure<T>(error: DomainError): Result<T> {
    return new Result<T>(false, error, null);
  }
}
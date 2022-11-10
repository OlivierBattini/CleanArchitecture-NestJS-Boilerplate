export abstract class DomainError {
  protected constructor(private _message: string) {
    console.error(_message);
  }

  public get message(): string {
    return this._message;
  }
}
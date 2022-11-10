import * as dotenv from 'dotenv'
dotenv.config();

import Debug, { Debugger } from 'debug';

export interface ILog {
  info: (formatter: any, ...args: any[]) => void;
  error: (formatter: any, ...args: any[]) => void;
}

export default class Log implements ILog {
  private _namespace: string;
  private _info: Debugger;
  private _error: Debugger;

  constructor(namespace: string) {
    this._namespace = `${namespace}(${process.pid})`;

    // Setting up info level logging
    this._info = Debug(this._namespace);
    this._info.log = console.log.bind(console);

    // Setting up error level logging
    this._error = Debug(this._namespace);
  }

  public info(formatter: any, ...args: any[]): void {
    this._info(formatter, ...args);
  }

  public error(formatter: any, ...args: any[]): void {
    this._error(formatter, ...args);
  }
}

import * as dotenv from 'dotenv';
dotenv.config();

export default class DatabaseConfig {
  public static get dbUrl(): string {
    return process.env.DB_URL;
  }
}

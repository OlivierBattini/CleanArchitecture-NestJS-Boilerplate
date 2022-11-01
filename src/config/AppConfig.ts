import * as dotenv from 'dotenv';
dotenv.config();

export enum NodeEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export default class AppConfig {
  public static get nodeEnvironment(): NodeEnvironment {
    return process.env.NODE_ENV as NodeEnvironment;
  }

  public static get clusterEnabled(): boolean {
    return process.env.CLUSTER_ENABLED === 'true';
  }
}

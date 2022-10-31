import * as dotenv from 'dotenv';
dotenv.config();

export default class ServerConfig {
  public static get port(): number {
    return parseInt(process.env.SRV_PORT) || 8080;
  }

  public static get ip(): string {
    return process.env.SRV_IP || '127.0.0.1';
  }

  public static get httpsEnabled(): boolean {
    return process.env.SRV_HTTPS_ENABLED === 'true';
  }

  public static get sslKeyPath(): string {
    return process.env.SRV_HTTPS_ENABLED;
  }

  public static get sslCertificatePath(): string {
    return process.env.SRV_SSL_CRT_PATH;
  }
}

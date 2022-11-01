import cluster from 'cluster';
import os from 'os';
import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import AppConfig from './config/AppConfig';
import ServerConfig from './config/ServerConfig';
import { WebServerModule } from './shared/infrastructure/http/WebServerModule';

import Log from './Log';
const log = new Log('app');

export class App {
  /**
   * Starts up the app
   * Sets up clustering if enabled
   * Creates NestJS app with optional HTTPS
   */
  public static async startup() {
    try {
      App.subscribeToProcessEvents();

      const clusterEnabled = AppConfig.clusterEnabled;

      clusterEnabled
        ? log.info('Clustering enabled')
        : log.info('Clustering disabled');

      if (clusterEnabled && cluster.isPrimary) {
        const cpuCount = os.cpus().length;

        log.info(`Primary process #${process.pid} running`);
        log.info(`Forking workers on ${cpuCount} CPUs available`);

        for (let i = 0; i < cpuCount; i++) {
          cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
          const message = `Worker #${worker.process.pid} exited via signal ${signal} with code ${code}`;
          code !== 0 ? log.error(message) : log.info(message);

          cluster.fork();
        });
      } else {
        log.info(`Worker #${process.pid} running`);

        let nestOptions = {};
        if (ServerConfig.httpsEnabled) {
          nestOptions = {
            httpsOptions: {
              key: fs.readFileSync(ServerConfig.sslKeyPath),
              cert: fs.readFileSync(ServerConfig.sslCertificatePath),
            }
          };
        }

        NestFactory
          .create(WebServerModule, nestOptions)
          .then((nestApp: INestApplication) => nestApp.listen(ServerConfig.port));
      }
    } catch (error) {
      log.error('Exception while starting Application :', error);
      App.shutdownProperly(1);
    }
  }

  /**
   * Subscribes to parent/child exception and termination process events
   */
  private static subscribeToProcessEvents() {
    process.on('uncaughtException', (error: Error) => {
      log.error('Uncaught exception', error);
      App.shutdownProperly(1);
    });
    process.on(
      'unhandledRejection',
      (reason: Record<string, unknown> | null | undefined) => {
        log.error('Unhandled Rejection at promise', reason);
        App.shutdownProperly(2);
      },
    );
    process.on('SIGINT', () => {
      log.info('Caught SIGINT');
      App.shutdownProperly(128 + 2);
    });
    process.on('SIGTERM', () => {
      log.info('Caught SIGTERM');
      App.shutdownProperly(128 + 2);
    });
    process.on('exit', () => {
      log.info('Exiting');
    });
  }

  /**
   * Properly shuts down the app
   */
  public static shutdown() {
    App.shutdownProperly(0);
  }

  /**
   * Properly shuts down the app providing an exit code
   * @param {number} exitCode - Exit code
   */
  private static shutdownProperly(exitCode: number) {
    log.info('Shutting down Application');
    Promise.resolve()
      /*.then(() => WebServer.getInstance().shutdown())*/
      .then(() => {
        log.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch((error) => {
        log.error('Error during shutdown', error);
        process.exit(1);
      });
  }
}

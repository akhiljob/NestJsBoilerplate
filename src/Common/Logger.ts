import { Injectable } from '@nestjs/common';
import winston, { transports, format, createLogger } from 'winston';
const { combine, colorize, printf } = format;

export interface LoggerInterface {
  log(message: any): void;
  debug(message: any): void;
  warn(message: any): void;
  error(message: string | Error): void;
}

@Injectable()
export class Logger implements LoggerInterface {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      exitOnError: false,
      format: process.env.NODE_ENV === 'prd' ? prodFormat() : devFormat(),
      level: 'info',
      silent: process.env.NODE_ENV === 'test',
      transports: [
        new transports.Console(),
        // new winston.transports.File({ filename: "errors.log" }),
      ],
    });
  }

  /**
   * Log a message with the level of "Debug".
   */
  debug(message: any): void {
    this.createLog('debug', message);
  }

  /**
   * Log a message with the level of "Log".
   */
  log(message: any): void {
    this.createLog('info', message);
  }

  /**
   * Log a message with the level of "Error".
   */
  error(message: string | Error): void {
    this.createLog('error', message);
  }

  /**
   * Log a message with the level of "Warning".
   */
  warn(message: any): void {
    this.createLog('warn', message);
  }

  /**
   * Helper to create the log entry.
   */
  protected async createLog(level: string, message: string | Error) {
    this.logger.log({
      level,
      message:
        message && (typeof message === 'string' ? message : message.message),
      app_id: process.env.APP_NAME,
      env: process.env.NODE_ENV,
    });
  }
}
const devFormat = () => {
  const formatMessage = (info: any) => `${info.level} ${info.message}`;
  const formatError = (info: any) =>
    `${info.level} ${info.message}\n\n${info.stack}\n`;

  const fmt = (info: any) =>
    info instanceof Error ? formatError(info) : formatMessage(info);
  return combine(colorize(), printf(fmt));
};

const prodFormat = () => {
  const replaceError = ({ label, level, message, stack }: any) => ({
    label,
    level,
    message,
    stack,
  });

  const replacer = (key: string, value: any) =>
    value instanceof Error ? replaceError(value) : value;

  return combine(format.json({ replacer }));
};

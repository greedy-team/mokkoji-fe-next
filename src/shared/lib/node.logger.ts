// shared/lib/logger.node.ts
import winston from 'winston';

const { combine, colorize, timestamp, printf } = winston.format;

const nodeLogger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, timestamp: tmStamp, ...meta }) => {
      let msgStr: string;

      if (typeof message === 'object') {
        msgStr = JSON.stringify(message, null, 2);
      } else {
        msgStr = String(message);
      }

      const metaStr =
        Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta, null, 2)}` : '';

      return `[${tmStamp}] ${level}: ${msgStr}${metaStr}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default nodeLogger;

// shared/lib/logger.ts
const logger =
  process.env.NEXT_RUNTIME === 'nodejs'
    ? require('./node.logger').default
    : require('./edge.logger').default;

export default logger;

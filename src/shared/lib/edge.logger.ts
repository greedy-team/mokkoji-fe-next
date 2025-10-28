const edgeLogger = {
  info: (...args: any[]) => console.log('[edge][info]', ...args),
  error: (...args: any[]) => console.error('[edge][error]', ...args),
  warn: (...args: any[]) => console.warn('[edge][warn]', ...args),
  debug: (...args: any[]) => console.debug('[edge][debug]', ...args),
};
export default edgeLogger;

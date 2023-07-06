/**
 * Causes a segfault in the current process.
 */
export function segfault(): void;

/**
 * Register a handler to be called when a segfault occurs.
 * 
 * @param path The path to the file to write when a segfault occurs.
 *             If not specified, stacktraces will be written to stderr.
 */
export function registerHandler(path?: string | undefined): void;

/**
 * Print the native stacktraces of all threads in the current process.
 */
export function printNativeStacktraces(): void;
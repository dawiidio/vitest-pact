import { PactfileWriteMode, LogLevel } from '@pact-foundation/pact';
import * as path from 'path';
import { ViteMessageConsumerOptions, VitePactOptions } from '../types';

const logHint = (options: VitePactOptions) =>
  options.port ? `-port-${options.port}` : '';

const applyCommonDefaults = (
  options: VitePactOptions | ViteMessageConsumerOptions
) => ({
  log: path.resolve(
    options.logDir ? options.logDir : path.join(process.cwd(), 'pact', 'logs'),
    options.logFileName
      ? options.logFileName
      : `${options.consumer}-${
          options.provider
        }-mockserver-interaction${logHint(options)}.log`
  ),
  dir: path.resolve(process.cwd(), 'pact/pacts'),
  logLevel: 'warn' as LogLevel,
  pactfileWriteMode: 'update' as PactfileWriteMode,
});

export const applyPactOptionDefaults = (
  options: VitePactOptions
): VitePactOptions => ({
  ...applyCommonDefaults(options),
  spec: 2,
  ...options,
});

export const applyMessagePactOptionDefaults = (
  options: ViteMessageConsumerOptions
): ViteMessageConsumerOptions => ({
  ...applyCommonDefaults(options),
  spec: 3,
  ...options,
});

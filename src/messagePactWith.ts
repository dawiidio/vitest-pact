import { MessageConsumerPact } from '@pact-foundation/pact';

import { applyMessagePactOptionDefaults } from './internal/config';
import { WrapperFn } from './internal/types';
import { withTimeout } from './internal/withTimeout';

import { extendPactWith } from './internal/scaffold';
import { ViteMessageConsumerOptions, JestProvidedMessagePactFn } from './types';

const setupMessageProvider = (
  options: ViteMessageConsumerOptions
): MessageConsumerPact => new MessageConsumerPact(options);

const jestMessagePactWrapper = (
  options: ViteMessageConsumerOptions,
  tests: JestProvidedMessagePactFn
): void => {
  withTimeout(options, () => {
    tests(setupMessageProvider(applyMessagePactOptionDefaults(options)));
  });
};

export const messagePactWith = extendPactWith<
  ViteMessageConsumerOptions,
  JestProvidedMessagePactFn,
  WrapperFn<ViteMessageConsumerOptions, JestProvidedMessagePactFn>
>(jestMessagePactWrapper);

export const xmessagePactWith = messagePactWith.skip;
export const fmessagePactWith = messagePactWith.only;

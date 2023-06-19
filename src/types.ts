import {
  MessageConsumerPact,
  Pact,
  MessageConsumerOptions,
  PactOptions,
} from '@pact-foundation/pact';
import { WrapperWithOnlyAndSkip } from './internal/types';

interface ExtraOptions {
  timeout?: number;
  logDir?: string;
  logFileName?: string;
}

export type VitePactOptions = PactOptions & ExtraOptions;

export type ViteMessageConsumerOptions = MessageConsumerOptions & ExtraOptions;

export type ViteProvidedPactFn = (provider: Pact) => void;

export type JestProvidedMessagePactFn = (
  messagePact: MessageConsumerPact
) => void;

export type PactWith = WrapperWithOnlyAndSkip<
  VitePactOptions,
  ViteProvidedPactFn
>;

export type MessagePactWith = WrapperWithOnlyAndSkip<
  ViteMessageConsumerOptions,
  JestProvidedMessagePactFn
>;

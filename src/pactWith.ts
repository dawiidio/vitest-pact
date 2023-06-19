import { Pact } from '@pact-foundation/pact';
import { applyPactOptionDefaults } from './internal/config';
import { WrapperFn } from './internal/types';
import { withTimeout } from './internal/withTimeout';

import { extendPactWith } from './internal/scaffold';
import { VitePactOptions, ViteProvidedPactFn } from './types';

const setupProvider = (options: VitePactOptions): Pact => {
  const pactMock: Pact = new Pact(options);

  beforeAll(() => pactMock.setup());
  afterAll(() => pactMock.finalize());
  afterEach(() => pactMock.verify());

  return pactMock;
};

// This should be moved to pact-js, probably
export const getProviderBaseUrl = (provider: Pact): string =>
  provider.mockService
    ? provider.mockService.baseUrl
    : `http://${provider.opts.host}:${provider.opts.port}`;

const pactWithWrapper = (
  options: VitePactOptions,
  tests: ViteProvidedPactFn
): void => {
  withTimeout(options, () => {
    tests(setupProvider(applyPactOptionDefaults(options)));
  });
};

export const pactWith = extendPactWith<
  VitePactOptions,
  ViteProvidedPactFn,
  WrapperFn<VitePactOptions, ViteProvidedPactFn>
>(pactWithWrapper);

export const xpactWith = pactWith.skip;
export const fpactWith = pactWith.only;

import { Pact } from '@pact-foundation/pact';
import { applyPactOptionDefaults } from './internal/config';
import { WrapperFn } from './internal/types';
import { withTimeout } from './internal/withTimeout';

import { extendPactWith } from './internal/scaffold';
import { VitePactOptions, ViteProvidedPactFn } from './types';

const setupProvider = async (options: VitePactOptions): Promise<Pact> => {
  const pactMock: Pact = new Pact(options);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  beforeAll(() => pactMock.setup());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  afterAll(() => pactMock.finalize());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
  withTimeout(options, async () => {
    tests(await setupProvider(applyPactOptionDefaults(options)));
  });
};

export const pactWith = extendPactWith<
  VitePactOptions,
  ViteProvidedPactFn,
  WrapperFn<VitePactOptions, ViteProvidedPactFn>
>(pactWithWrapper);

export const xpactWith = pactWith.skip;
export const fpactWith = pactWith.only;

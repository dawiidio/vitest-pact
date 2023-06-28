import { MessageConsumerOptions, PactOptions } from '@pact-foundation/pact';
import { ConsumerOptions, WrapperFn, WrapperWithOnlyAndSkip } from './types';

const describeString = (options: PactOptions | MessageConsumerOptions) =>
  `Pact between ${options.consumer} and ${options.provider}`;

const describePactWith = <
  O extends ConsumerOptions,
  P,
  W extends WrapperFn<O, P>
>(
  describeFn: (desc: string, fn: () => void) => void,
  wrapper: W
) => (options: O, tests: P) =>
  describeFn(describeString(options), () => wrapper(options, tests));

export const extendPactWith = <
  O extends ConsumerOptions,
  P,
  W extends WrapperFn<O, P>
>(
  wrapper: W
): WrapperWithOnlyAndSkip<O, P> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ret = describePactWith<O, P, W>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    describe,
    wrapper
  ) as WrapperWithOnlyAndSkip<O, P>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ret.only = describePactWith<O, P, W>(describe.only, wrapper);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ret.skip = describePactWith<O, P, W>(describe.skip, wrapper);
  return ret;
};

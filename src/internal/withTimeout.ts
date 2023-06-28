interface TimeoutOption {
  timeout?: number;
}

export const withTimeout = (
  options: TimeoutOption,
  tests: () => void
): void => {
  const pactTestTimeout = options.timeout || 30000;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  describe(`with ${pactTestTimeout} ms timeout for Pact`, () => {
    tests();
  }, {
    timeout: pactTestTimeout,
  });
};

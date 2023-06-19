import { describe } from "vitest";

interface TimeoutOption {
  timeout?: number;
}

export const withTimeout = (
  options: TimeoutOption,
  tests: () => void
): void => {
  const pactTestTimeout = options.timeout || 30000;

  describe(`with ${pactTestTimeout} ms timeout for Pact`, () => {
    tests();
  }, {
    timeout: pactTestTimeout,
  });
};

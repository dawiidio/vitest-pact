declare global {
  function it(desc: string, fn: () => void): void;

  function describe(desc: string, fn: () => void, options?: { timeout: number }): void;
}

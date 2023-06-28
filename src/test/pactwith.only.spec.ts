import { InteractionObject, Pact } from '@pact-foundation/pact';
import supertest = require('supertest');
import { pactWith } from '../index';

const getClient = (provider: Pact) => supertest(provider.mockService.baseUrl);

const postValidRequest: InteractionObject = {
  state: 'A pet 1845563262948980200 exists',
  uponReceiving: 'A get request to get a pet 1845563262948980200',
  willRespondWith: {
    status: 200,
  },
  withRequest: {
    method: 'GET',
    path: '/v2/pet/1845563262948980200',
    headers: { api_key: '[]' },
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe('pactwith.only', () => {
  pactWith.only(
    { consumer: 'MyConsumer', provider: 'NoProvider' },
    (provider: Pact) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      beforeEach(() => provider.addInteraction(postValidRequest));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      it('should only run this test', () =>
        getClient(provider)
          .get('/v2/pet/1845563262948980200')
          .set('api_key', '[]')
          .expect(200));
    }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  it('the test that should be skipped', () => {
    throw new Error('this test should not be run');
  });
});

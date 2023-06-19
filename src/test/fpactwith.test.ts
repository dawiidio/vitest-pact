import { InteractionObject, Pact } from '@pact-foundation/pact';
import supertest from 'supertest';
import { fpactWith } from '../index';

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

describe('fpactwith', () => {
  fpactWith(
    { consumer: 'MyConsumer', provider: 'NoProvider' },
    (provider: Pact) => {
      beforeEach(() => provider.addInteraction(postValidRequest));

      it('should only run this test', () =>
        getClient(provider)
          .get('/v2/pet/1845563262948980200')
          .set('api_key', '[]')
          .expect(200));
    }
  );

  test('the test that should be skipped', () => {
    throw new Error('this test should not be run');
  });
});

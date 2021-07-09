import reducer from './reducer';

describe('reducer test', () => {
  it('reducer state should not change for un-expected types', () => {
      const mockState = {};

      const nextState = reducer(mockState, { type: 'test'});
      expect(nextState).toEqual(mockState);
  });
});

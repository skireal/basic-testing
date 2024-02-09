import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -1, b: -2, action: Action.Add, expected: -3 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: -1, b: -2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: -1, b: -2, action: Action.Multiply, expected: 2 },
  { a: 0, b: 10, action: Action.Multiply, expected: 0 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: -4, b: 2, action: Action.Divide, expected: -2 },
  { a: 0, b: 1, action: Action.Divide, expected: 0 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: 'unknown', expected: null },
  { a: 10, b: 5, action: 'null', expected: null },
  { a: 1, b: 1, action: {}, expected: null },
  { a: 'a', b: {}, action: Action.Add, expected: null },
  { a: 2, b: 'b', action: Action.Subtract, expected: null },
  { a: false, b: '2', action: Action.Multiply, expected: null },
];

describe('simpleCalculator table tests', () => {
  test.each(testCases)(
    'simpleCalculator(a, b, action) returns expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});

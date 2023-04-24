import { test } from 'vitest';
import { assert } from 'chai';

const sum = (number1, number2) => {
  return number1 + number2;
}

test('sum function', () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(-1, 1), 0);
  assert.equal(sum(0, 0), 0);
});

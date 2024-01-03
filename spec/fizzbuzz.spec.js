import test from 'test'
import assert from 'assert'
import fizzbuzz from '../fizzbuzz.js'

test('Assert it shows...', async t => {
  await t.test('"Fizz" when number is a multiple of 3', () => {
    const tested = fizzbuzz.iterative(1, 3)
    assert.deepEqual([1, 2, 'Fizz'], tested)
  })
  await t.test('"Buzz" when number is a multiple of 5', () => {
    const tested = fizzbuzz.iterative(4, 5)
    assert.deepEqual([4, 'Buzz'], tested)
  })
  await t.test('"FizzBuzz" when number is a multiple of both 3 and 5', () => {
    const tested = fizzbuzz.iterative(14, 15)
    assert.deepEqual([14, 'FizzBuzz'], tested)
  })
})

test('Assert that given sample match with Fizz Buzz', (_, done) => {
  // sample is issued from https://sulfuric-canary-933.notion.site/Fizzbuss-49da66076b1146e4a27169ae8facb926
  const expected = '12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz1617Fizz19Buzz'
  const tested = fizzbuzz.iterative(1, 100)
  assert.strictEqual(true, tested.join('').includes(expected))
  done()
})

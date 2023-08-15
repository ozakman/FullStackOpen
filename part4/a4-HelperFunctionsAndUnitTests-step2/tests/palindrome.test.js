const palindrome = require('../utils/for_testing').palindrome

test.skip('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test.skip('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test.skip('palindrome of saippuakauppias', () => {
  const result = palindrome('saippuakauppias')

  expect(result).toBe('saippuakauppias')
})
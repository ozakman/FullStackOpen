const palindrome = require('../utils/for_testing').palindrome

test.skip('palindrome of saippuakauppias', () => {
  const result = palindrome('saippuakauppias')
  expect(result).toBe('saippuakauppias')
})

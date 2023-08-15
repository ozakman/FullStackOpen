const average = array => { 
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
}

describe('average', () => {
  test.skip('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })
})
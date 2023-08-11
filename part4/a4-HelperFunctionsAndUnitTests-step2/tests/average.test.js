const average = array => { 
  const reducer = (sum, item) => {
    return sum + item
  }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
}

describe.skip('average', () => {
  test.skip('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test.skip('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test.skip('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
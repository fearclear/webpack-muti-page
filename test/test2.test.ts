const assert = require('assert')

describe('test/test2.test.ts', () => {
  it('查看ts是否成功', () => {
    assert(true)
  })

  it('哈哈', () => {
    const arr = [1,2,3]
    const two = 2
    assert(arr.indexOf(2) === two)
  })
})

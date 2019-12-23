const assert = require('assert')

describe('test/test.test.js', () => {
  it('查看js是否成功', () => {
    const arr = [1,2,3]
    const two = 2
    assert(arr.indexOf(2) === two)
  })
})

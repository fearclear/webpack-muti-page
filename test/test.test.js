const assert = require('assert')

describe(__filename, () => {
  it('查看js是否成功', () => {
    const arr = [1, 2, 3]
    const two = 1
    assert(arr.indexOf(2) === two)
  })

  describe('测试', function () {
    it('用例1', function () {
      const isRight = !!0
      assert(!isRight)
    })
  })
})


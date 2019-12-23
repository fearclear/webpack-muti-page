import assert from 'assert'

describe(__filename, () => {
  it('查看ts是否成功', () => {
    assert(true)
  })

  it('哈哈', () => {
    const arr = [1,2,3]
    const two = 1
    assert(arr.indexOf(2) === two)
  })
})

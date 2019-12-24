import assert from 'assert'

describe(__filename, () => {
  it('测试typescript', () => {
    enum Color {
      Red = '#ff0000',
      Green = '#00ff00',
      Blue = '#0000ff'
    }
    assert(Color.Blue === '#0000ff')
  })
})

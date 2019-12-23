const mockjs = require('mockjs')

module.exports = {
  '/api': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  }),
  '/api/none': (req, res) => {
    // console.log(req, res)
    return res.json({ bb: 1 })
  }
}

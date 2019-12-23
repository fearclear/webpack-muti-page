const mockjs = require('mockjs')

module.exports = {
  '/api': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  }),
  'GET /api/fun': (req, res) => {
    return res.json(mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
    }))
  }
}

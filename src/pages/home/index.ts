import './index.less'
import './main.css'
import { request, config } from '../../utils'
request(config.api.cm)
  .then(data => {
    console.log(data, 'data')
  })


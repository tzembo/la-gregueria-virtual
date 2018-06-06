var request = require('superagent')
var config = {}

config.api = {
  protocol: 'http',
  host: '0.0.0.0',
  port: 5000,
  prefix: 'api'
}

config.endpoint = ''
config.endpoint += config.api.protocol + '://'
config.endpoint += config.api.host + ':'
config.endpoint += config.api.port + '/'
config.endpoint += config.api.prefix + '/'

config.get = function(route, callback) {
  request
    .get(config.endpoint + route)
    .set('Accept', 'application/json')
    .end(callback)
}

module.exports = config
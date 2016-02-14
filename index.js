var path = require('path')

function createPattern(path) {
  return {pattern: path, included: true, served: true, watched: false}
}

function initPainless(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));
}

initPainless.$inject = ['config.files', 'config.client.painless']

module.exports = {
  'framework:painless': ['factory', initPainless]
};
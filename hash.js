const { createHash } =  require('node:crypto')

function hashFunction(details) { 
var hash = createHash('sha256');
    return`${hash.update(details).digest('hex')}`;

  }

  module.exports = {
    hashFunction
  }
var _ = require('lodash');
var Struct = require('./Struct');

var ObjectDecoder = function() {
  return {
    structFromObject: function(name, obj) {
      var struct = Struct();

      struct.setName(name);

      return struct;
    }
  };
};

module.exports = ObjectDecoder;

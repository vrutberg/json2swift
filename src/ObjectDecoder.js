var _ = require('lodash');
var Struct = require('./Struct');
var TypeDecorator = require('./TypeDecorator')

var ObjectDecoder = function() {

  var propertyBuilder = function(objWithTypeInfo) {
    var properties = [];

    for (var prop in objWithTypeInfo) {
      if (objWithTypeInfo.hasOwnProperty(prop)) {
        if (prop.indexOf('_type') !== -1) {
          continue;
        }

        var type = objWithTypeInfo[prop+'_type'];

        if (typeof type === 'undefined') {
          throw { message: 'Type with no type info: '+ prop };
        }

        properties.push({ name: prop, type: type });
      }
    }

    return properties;
  };

  return {
    structFromObject: function(name, obj) {
      var struct = Struct();
      var objWithTypeInfo = TypeDecorator().decorate(obj);
      var properties = propertyBuilder(objWithTypeInfo);

      struct.setName(name);
      struct.setProperties(properties);

      return struct;
    }
  };
};

module.exports = ObjectDecoder;

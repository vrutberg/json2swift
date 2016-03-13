var _ = require('lodash');
var Struct = require('./Struct');
var TypeDecorator = require('./TypeDecorator')

var ObjectDecoder = function() {
  var structsFromObject = function(name, obj) {
    var objWithTypeInfo = TypeDecorator().decorate(obj);
    var result = propertyBuilder(objWithTypeInfo);

    var properties = result.properties;
    var structs = result.subStructs;

    var struct = Struct();
    struct.setName(name);
    struct.setProperties(properties);
    structs.push(struct);

    return structs;
  };

  var propertyBuilder = function(objWithTypeInfo) {
    var properties = [];
    var subStructs = [];

    for (var prop in objWithTypeInfo) {
      (function(prop) {
        if (objWithTypeInfo.hasOwnProperty(prop)) {
          if (prop.indexOf('_type') !== -1) {
            return;
          }

          if (_.isObject(objWithTypeInfo[prop])) {
            var result = propertyBuilder(objWithTypeInfo[prop]);
            var structName = _.upperFirst(prop);

            var subStruct = Struct();
            subStruct.setName(structName);
            subStruct.setProperties(result.properties);

            subStructs.push(subStruct);
            properties.push({ name: prop, type: structName });
          } else {
            var type = objWithTypeInfo[prop+'_type'];

            if (typeof type === 'undefined') {
              throw { message: 'Type with no type info: '+ prop };
            }

            properties.push({ name: prop, type: type });
          }
        }
      })(prop);
    }

    return { properties: properties, subStructs: subStructs };
  };

  return {
    structsFromObject: structsFromObject
  };
};

module.exports = ObjectDecoder;

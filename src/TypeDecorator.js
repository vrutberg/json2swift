var _ = require('lodash');

var TypeDecorator = function() {
  var typeMappings = {
    "string": "String",
    "boolean": "Bool",
    "number": "Float"
  };

  var mapType = function(propertyValue) {
    var type = undefined;
    var mappedType = undefined;

    if (_.isArray(propertyValue)) {
      if (propertyValue.length > 0) {
        type = typeof propertyValue[0];

        return '[' + typeMappings[type] + ']'
      } else {
        return '[AnyObject]';
      }
    } else {
      type = typeof propertyValue;
      return typeMappings[type];
    }
  };

  var decorate = function(obj) {
    var returnObj = JSON.parse(JSON.stringify(obj));

    for (var prop in returnObj) {
      (function(prop) {
        if (returnObj.hasOwnProperty(prop) && prop.indexOf('_type') === -1) {
          var propValue = returnObj[prop];

          if (_.isPlainObject(propValue)) {
            returnObj[prop] = decorate(returnObj[prop]);
          } else {
            var mappedType = mapType(propValue);

            if (typeof mappedType !== 'undefined') {
              returnObj[prop+'_type'] = mappedType;
            } else {
              throw { message: "No type mapping found for value: "+ propValue };
            }
          }
        }
      })(prop);
    }

    return returnObj;
  }

  return {
    decorate: decorate
  };
};

module.exports = TypeDecorator;

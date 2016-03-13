var _ = require('lodash');

var TypeDecorator = function() {
  var typeMappings = {
    "string": "String",
    "boolean": "Bool",
    "number": "Float"
  };

  var decorate = function(obj) {
    var returnObj = JSON.parse(JSON.stringify(obj));

    for (var prop in returnObj) {
      (function(prop) {
        if (returnObj.hasOwnProperty(prop) && prop.indexOf('_type') === -1) {
          if (_.isObject(returnObj[prop])) {
            returnObj[prop] = decorate(returnObj[prop]);
          } else {
            var type = typeof returnObj[prop];
            var mappedType = typeMappings[type];

            if (typeof mappedType !== 'undefined') {
              returnObj[prop+'_type'] = mappedType;
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

var _ = require('lodash');

var TypeDecorator = function() {

  var typeMappings = {
    "string": "String",
    "boolean": "Bool",
    "number": "Float"
  };

  return {
    decorate: function(obj) {
      var returnObj = JSON.parse(JSON.stringify(obj));

      for (var prop in returnObj) {
        if (returnObj.hasOwnProperty(prop) && prop.indexOf('_type') === -1) {
          var type = typeof prop;
          var mappedType = typeMappings[type];

          if (typeof mappedType !== 'undefined') {
            returnObj[prop+'_type'] = mappedType;
          }
        }
      }

      return returnObj;
    }
  };
};

module.exports = TypeDecorator;

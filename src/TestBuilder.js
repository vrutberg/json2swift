'use strict';

var _ = require('lodash');

var TestBuilder = function(struct) {
  if (typeof struct === 'undefined') {
    throw { 'message': 'Cannot be instantiated without a Struct as parameter' };
  }

  var getName = function() {
    return struct.getName() + "TestBuilder";
  };

  var getDeclaration = function() {
    return "\nclass " + getName() + " {";
  };

  var getPropertyList = function() {
    var result = "";

    struct.getProperties().forEach(function(property) {
      result += "\nprivate var "+ property.name + ": " + property.type;
    });

    return result;
  };

  var getInitializer = function() {
    var result = "\nprivate init() {";

    struct.getProperties().forEach(function(property) {
      result += "\n" + property.name + " = " + JSON.stringify(property.defaultValue);
    });

    result += "\n}";
    return result;
  };

  var getABuilderMethod = function() {
    return "\n class func aBuilder() -> " + getName() + " {" +
     "\n return " + getName() + "()" +
     "\n}";
  };

  var getSinglePropertySetter = function(property) {
    return "\nfunc with" + _.upperFirst(property.name) + "(" + property.name + ": " + property.type + ") -> " + getName() + " {" +
      "\nself." + property.name + " = " + property.name +
      "\nreturn self" +
      "\n}";
  };

  var getPropertySetters = function() {
    return struct.getProperties().map(getSinglePropertySetter).join("\n");
  };

  var getBuildMethod = function() {
    var parameterList = "";

    struct.getProperties().forEach(function(property) {
      if (parameterList !== "") {
        parameterList += ", ";
      }

      parameterList += property.name + ": "+ property.name;
    });

    return "\nfunc build() -> " + struct.getName() + " {" +
      "\nreturn " + struct.getName() + "(" + parameterList + ")" +
      "\n}";
  };

  return {
    toString: function() {
      return getDeclaration() +
        getPropertyList() +
        getInitializer() +
        getABuilderMethod() +
        getPropertySetters() +
        getBuildMethod() +
        "\n}";
    }
  };
};

module.exports = TestBuilder;

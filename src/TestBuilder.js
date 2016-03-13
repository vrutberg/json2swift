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
    return "class " + getName() + " {";
  };

  var getPropertyList = function() {
    var result = "";

    struct.getProperties().forEach(function(property) {
      result += "\n\tprivate var "+ property.name + ": " + property.type;
    });

    return result;
  };

  var getInitializer = function() {
    var result = "\n\n\tprivate init() {";

    struct.getProperties().forEach(function(property) {
      result += "\n\t\t" + property.name + " = " + JSON.stringify(property.defaultValue);
    });

    result += "\n\t}";
    return result;
  };

  var getABuilderMethod = function() {
    return "\n\n\tclass func aBuilder() -> " + getName() + " {" +
     "\n\t\treturn " + getName() + "()" +
     "\n\t}";
  };

  var getSinglePropertySetter = function(property) {
    return "\n\n\tfunc with" + _.upperFirst(property.name) + "(" + property.name + ": " + property.type + ") -> " + getName() + " {" +
      "\n\t\tself." + property.name + " = " + property.name +
      "\n\t\treturn self" +
      "\n\t}";
  };

  var getPropertySetters = function() {
    return struct.getProperties().map(getSinglePropertySetter).join("");
  };

  var getBuildMethod = function() {
    var parameterList = "";

    struct.getProperties().forEach(function(property) {
      if (parameterList !== "") {
        parameterList += ", ";
      }

      parameterList += property.name + ": "+ property.name;
    });

    return "\n\n\tfunc build() -> " + struct.getName() + " {" +
      "\n\t\treturn " + struct.getName() + "(" + parameterList + ")" +
      "\n\t}";
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

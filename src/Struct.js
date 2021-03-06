'use strict';

var Struct = function() {
  var properties = [];
  var name = "UnnamedStruct";
  var superTypes = [];

  var getDeclaration = function() {
    var nameDeclaration = "struct "+ name;
    var superTypeString = "";

    superTypes.forEach(function(superType) {
      if (superTypeString.length === 0) {
        superTypeString += ": ";
      } else {
        superTypeString += ", ";
      }

      superTypeString += superType;
    });

    return nameDeclaration + superTypeString + " {";
  };

  var getPropertyDeclarations = function() {
    var result = "";

    properties.forEach(function(property) {
      result += "\n\tlet "+ property.name + ": " + property.type;
    });

    return result;
  };

  var getInitializer = function() {
    var initParams = "";

    properties.forEach(function(property) {
      if (initParams !== "") {
        initParams += ", ";
      }

      initParams += property.name + ": " + property.type;
    });

    var result = "\n\n\tinit("+ initParams + ") {";

    properties.forEach(function(property) {
      result += "\n\t\t\tself." + property.name + " = " + property.name;
    });

    result += "\n\t}";

    return result;
  };

  return {
    getSuperTypes: function() {
      return superTypes;
    },

    setSuperTypes: function(newSuperTypes) {
      superTypes = newSuperTypes;
    },

    getProperties: function() {
      return properties;
    },

    setProperties: function(newProperties) {
      properties = newProperties;
    },

    getName: function() {
      return name;
    },

    setName: function(newName) {
      name = newName;
    },

    toString: function() {
      return getDeclaration() +
        getPropertyDeclarations() +
        getInitializer() +
        "\n}";
    }
  };
};

module.exports = Struct;

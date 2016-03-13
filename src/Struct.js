var Struct = function() {
  var properties = [];
  var name = "UnnamedStruct";

  var getDeclaration = function() {
    return "struct "+ name + " {";
  };

  var getPropertyDeclarations = function() {
    var result = "";

    properties.forEach(function(property) {
      result += "\nlet "+ property.name + ": " + property.type;
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

    result = "\ninit("+ initParams + ") {";

    properties.forEach(function(property) {
      result += "\nself." + property.name + " = " + property.name;
    });

    result += "\n}";

    return result;
  };

  return {
    setProperties: function(newProperties) {
      properties = newProperties;
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

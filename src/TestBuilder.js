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

  return {
    toString: function() {
      return getDeclaration() +
        "\n}";
    }
  };
};

module.exports = TestBuilder;

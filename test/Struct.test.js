var Struct = require('../src/Struct');

describe("Struct", function() {
  it("should have the correct public api", function() {
    var aStruct = Struct();

    expect(typeof aStruct.toString).toBe('function');
    expect(typeof aStruct.getProperties).toBe('function');
    expect(typeof aStruct.setProperties).toBe('function');
    expect(typeof aStruct.getName).toBe('function');
    expect(typeof aStruct.setName).toBe('function');
  });

  describe("getName", function() {
    it("should return the correct name", function() {
      var aStruct = Struct();
      aStruct.setName('Name');

      expect(aStruct.getName()).toBe('Name');
    });
  });

  describe("getProperties", function() {
    it("should return the correct properties", function() {
      var aStruct = Struct();
      aStruct.setProperties([{ type: 'A', name: 'Prop' }]);

      expect(aStruct.getProperties()).toEqual([{ type: 'A', name: 'Prop' }]);
    });
  });

  describe("toString", function() {
    it("should print the name correctly", function() {
      var aStruct = Struct();
      aStruct.setName('Banana');
      var output = aStruct.toString();

      expect(output).toContain('struct Banana {');
    });

    it("should print a property correctly", function() {
      var myStruct = Struct();

      myStruct.setName('Banana');
      myStruct.setProperties([
        { name: 'aProperty', type: 'String' }
      ]);

      var output = myStruct.toString();

      expect(output).toContain('let aProperty: String');
    });

    it("should print an empty initializer correctly", function() {
      var myStruct = Struct();
      myStruct.setName('Banana');
      var output = myStruct.toString();

      expect(output).toContain('init() {');
    });

    it("should print an initializer with 1 property correctly", function() {
      var myStruct = Struct();

      myStruct.setName('Banana');
      myStruct.setProperties([
        { name: 'aProperty', type: 'String' }
      ]);

      var output = myStruct.toString();

      expect(output).toContain('init(aProperty: String) {');
      expect(output).toContain('self.aProperty = aProperty');
    });

    it("should print an initializer with 2 properties correctly", function() {
      var myStruct = Struct();

      myStruct.setName('Banana');
      myStruct.setProperties([
        { name: 'aProperty', type: 'String' },
        { name: 'anotherProperty', type: 'String' }
      ]);

      var output = myStruct.toString();

      expect(output).toContain('init(aProperty: String, anotherProperty: String) {');
      expect(output).toContain('self.aProperty = aProperty');
      expect(output).toContain('self.anotherProperty = anotherProperty');
    });
  });
});

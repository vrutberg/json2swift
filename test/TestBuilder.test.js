var Struct = require('../src/Struct');
var TestBuilder = require('../src/TestBuilder');

describe('TestBuilder', function() {
  it('should have the correct public api', function() {
    expect(typeof TestBuilder(Struct()).toString).toBe('function');
  });

  it('should not be possible to instantiate without a struct', function() {
    expect(function() { TestBuilder(); }).toThrow();
  });

  describe('toString', function() {
    it('should print the correct class name', function() {
      var struct = Struct();
      struct.setName('AStruct');

      var testBuilder = TestBuilder(struct);

      expect(testBuilder.toString()).toContain('class AStructTestBuilder {');
    });

    it('should include properties from the struct as properties', function() {
      var struct = Struct();
      struct.setName('AStruct');
      struct.setProperties([
        { name: 'color', type: 'UIColor' }
      ]);

      var testBuilder = TestBuilder(struct, []);

      expect(testBuilder.toString()).toContain('private var color: UIColor');
    });

    it('should have a private initializer', function() {
      var struct = Struct();
      struct.setName('AStruct');

      var testBuilder = TestBuilder(struct);

      expect(testBuilder.toString()).toContain('private init() {');
    });

    it('should make assignments to default values in initializer', function() {
      var struct = Struct();
      struct.setName('AStruct');
      struct.setProperties([
        { name: 'color', type: 'String' }
      ]);

      var testBuilder = TestBuilder(struct, { color: '"red"' });

      expect(testBuilder.toString()).toContain('color = "red"');
    });

    it('should include the aBuilder method', function() {
      var struct = Struct();
      struct.setName('AStruct');

      var testBuilder = TestBuilder(struct);

      expect(testBuilder.toString()).toContain('class func aBuilder() -> AStructTestBuilder {');
    });

    it('should include property setter for a property', function() {
      var struct = Struct();
      struct.setName('AStruct');
      struct.setProperties([
        { name: 'color', type: 'String' }
      ]);

      var testBuilder = TestBuilder(struct, { color: '"red"' });

      expect(testBuilder.toString()).toContain('func withColor(color: String) -> AStructTestBuilder {');
      expect(testBuilder.toString()).toContain('self.color = color');
      expect(testBuilder.toString()).toContain('return self');
    });

    it('should include a build method', function() {
      var struct = Struct();
      struct.setName('AStruct');
      struct.setProperties([
        { name: 'color', type: 'String' }
      ]);

      var testBuilder = TestBuilder(struct, { color: '"red"' });

      expect(testBuilder.toString()).toContain('func build() -> AStruct {');
      expect(testBuilder.toString()).toContain('return AStruct(color: color)');
    });
  });
});

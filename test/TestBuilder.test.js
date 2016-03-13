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
  });
});

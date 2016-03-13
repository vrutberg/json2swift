var ObjectDecoder = require('../src/ObjectDecoder');

describe("ObjectDecoder", function() {

  it("should have the correct public api", function() {
    var objectDecoder = ObjectDecoder();

    expect(typeof objectDecoder.structFromObject).toBe('function');
  });

  describe("structFromObject", function() {
    it("should return an Empty struct for an empty object", function() {
      var objectDecoder = ObjectDecoder();
      var struct = objectDecoder.structFromObject("MyStruct", {});

      expect(struct.getProperties()).toEqual([]);
    });

  });

});

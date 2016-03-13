var ObjectDecoder = require('../src/ObjectDecoder');

describe("ObjectDecoder", function() {

  it("should have the correct public api", function() {
    var objectDecoder = ObjectDecoder();

    expect(typeof objectDecoder.structFromObject).toBe('function');
  });

  describe("structFromObject", function() {
    it("should set correct name on Struct", function() {
      var objectDecoder = ObjectDecoder();
      var struct = objectDecoder.structFromObject("MyStruct", {});

      expect(struct.getName()).toEqual("MyStruct");
    });

    it("should return an Empty struct for an empty object", function() {
      var objectDecoder = ObjectDecoder();
      var struct = objectDecoder.structFromObject("MyStruct", {});

      expect(struct.getProperties()).toEqual([]);
    });

    it("should return a correct Struct with 1 simple parameter", function() {
      var objectDecoder = ObjectDecoder();
      var struct = objectDecoder.structFromObject("MyStruct", { propName: "prop value" });

      expect(struct.getProperties()).toEqual([ { type: 'String', name: 'propName' } ]);
    });
  });
});

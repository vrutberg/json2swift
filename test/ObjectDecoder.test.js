var ObjectDecoder = require('../src/ObjectDecoder');

describe("ObjectDecoder", function() {

  it("should have the correct public api", function() {
    var objectDecoder = ObjectDecoder();

    expect(typeof objectDecoder.structsFromObject).toBe('function');
  });

  var expectProperty = function(struct, name, type) {
    expect(struct.getProperties().filter(function(prop) { return prop.type === type && prop.name === name; }).length).toBe(1);
  };

  describe("structsFromObject", function() {
    it("should set correct name on Struct", function() {
      var structs = ObjectDecoder().structsFromObject("MyStruct", {});

      expect(structs.length).toBe(1);
      expect(structs[0].getName()).toEqual("MyStruct");
    });

    it("should correctly handle an empty object", function() {
      var structs = ObjectDecoder().structsFromObject("MyStruct", {});

      expect(structs.length).toBe(1);
      expect(structs[0].getProperties()).toEqual([]);
    });

    it("should correctly handle an object with 1 string property", function() {
      var structs = ObjectDecoder().structsFromObject("MyStruct", { propName: "prop value" });

      expect(structs.length).toBe(1);
      expect(structs[0].getProperties()).toEqual([ { type: 'String', name: 'propName' } ]);
    });

    it("should correctly handle an object with a complex property", function() {
      var object = {
        subLevel: {
          a: 1
        },
        b: '2'
      };

      var structs = ObjectDecoder().structsFromObject("MyStruct", object);
      expect(structs.length).toBe(2);

      var subLevelStruct = structs.filter(function(struct) { return struct.getName() === "SubLevel"; })[0];
      expect(subLevelStruct).not.toBeUndefined();
      expect(subLevelStruct.getProperties().length).toBe(1);
      expectProperty(subLevelStruct, 'a', 'Float');

      var myStructStruct = structs.filter(function(struct) { return struct.getName() === "MyStruct"; })[0];
      expect(myStructStruct).not.toBeUndefined();
      expect(myStructStruct.getProperties().length).toBe(2);
      expectProperty(myStructStruct, 'subLevel', 'SubLevel');
      expectProperty(myStructStruct, 'b', 'String');
    });
  });
});

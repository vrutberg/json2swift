var ObjectDecoder = require('../src/ObjectDecoder');

describe("ObjectDecoder", function() {

  it("should have the correct public api", function() {
    var objectDecoder = ObjectDecoder();

    expect(typeof objectDecoder.structsFromObject).toBe('function');
  });

  var expectProperty = function(struct, name, type) {
    expect(struct.getProperties().filter(function(prop) { return prop.type === type && prop.name === name; }).length).toBe(1);
  };

  var expectProperties = function(struct, properties) {
    expect(struct.getProperties().length).toBe(properties.length);

    properties.forEach(function(prop) {
      expectProperty(struct, prop.name, prop.type);
    });
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

    it("should correctly handle an object 1-level nested properties", function() {
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
      expectProperties(subLevelStruct, [
        { name: 'a', type: 'Float' }
      ]);

      var myStructStruct = structs.filter(function(struct) { return struct.getName() === "MyStruct"; })[0];
      expect(myStructStruct).not.toBeUndefined();
      expectProperties(myStructStruct, [
        { name: 'subLevel', type: 'SubLevel' },
        { name: 'b', type: 'String' }
      ]);
    });

    iit("should correctly handle an object 2-level nested properties", function() {
      var object = {
        subLevel: {
          a: 1,
          deeperLevel: {
            c: false
          }
        },
        b: '2'
      };

      var structs = ObjectDecoder().structsFromObject("MyStruct", object);
      expect(structs.length).toBe(3);

      var subLevelStruct = structs.filter(function(struct) { return struct.getName() === "SubLevel"; })[0];
      expect(subLevelStruct).not.toBeUndefined();
      expectProperties(subLevelStruct, [
        { name: 'a', type: 'Float' },
        { name: 'deeperLevel', type: 'DeeperLevel' }
      ]);

      var deeperLevelStruct = structs.filter(function(struct) { return struct.getName() === "DeeperLevel"; })[0];
      expect(deeperLevelStruct).not.toBeUndefined();
      expectProperties(deeperLevelStruct, [
        { name: 'c', type: 'Bool' }
      ]);

      var myStructStruct = structs.filter(function(struct) { return struct.getName() === "MyStruct"; })[0];
      expect(myStructStruct).not.toBeUndefined();
      expectProperties(myStructStruct, [
        { name: 'subLevel', type: 'SubLevel' },
        { name: 'b', type: 'String' }
      ]);
    });
  });
});

var TypeDecorator = require('../src/TypeDecorator');

describe('TypeDecorator', function() {
  describe('decorate', function() {
    it('should decorate with known types', function() {
      var obj = { propName: '123' };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['propName_type']).toBe('String');
    });

    it('should decorate with other types than string', function() {
      var obj = { propName: false };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['propName_type']).toBe('Bool');
    });

    it('should correctly decorate arrays with values', function() {
      var obj = { array: [1] };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['array_type']).toBe('[Float]');
    });

    it('should correctly decorate arrays without', function() {
      var obj = { array: [] };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['array_type']).toBe('[AnyObject]');
    });

    it('should not decorate type info', function() {
      var obj = { propName: '123', propName_type: 'String' };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['propName_type_type']).toBeUndefined();
    });

    it('should decorate known types deeply', function() {
      var object = {
        subLevel: {
          a: 1
        },
        b: '2'
      };

      var decorated = TypeDecorator().decorate(object);

      expect(decorated['b_type']).toBe('String');
      expect(decorated.subLevel['a_type']).toBe('Float');
    });
  });
});

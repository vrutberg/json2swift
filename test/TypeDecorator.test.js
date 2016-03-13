var TypeDecorator = require('../src/TypeDecorator');

describe('TypeDecorator', function() {
  describe('decorate', function() {
    it('should decorate with known types', function() {
      var obj = { propName: '123' };
      var decorated = TypeDecorator().decorate(obj);

      expect(decorated['propName_type']).toBe('String');
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

    // it('should handle unknown types', function() {
    //   var object = {
    //     subLevel: {
    //       a: 1
    //     },
    //     b: '2'
    //   };
    //
    //   var decorated = TypeDecorator().decorate(object);
    //
    //   console.log('decorated', decorated);
    // });
  });
});

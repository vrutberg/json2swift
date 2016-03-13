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
  });
});

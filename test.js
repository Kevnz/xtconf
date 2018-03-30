var test = require('tap').test;

test('Make sure default development enviroment is returned', function(t) {
  var config = require('./index')();
  t.equal(
    config.get('test-name'),
    'config.development.json',
    'config should be for development'
  );
  t.equal(
    config.get('test-named'),
    'config.development.named.json',
    'config should also include the named version for dev'
  );
  t.end();
});

test('Make sure passing in an enviroment returns correct config', function(t) {
  var config = require('./index')('test');
  t.equal(
    config.get('test-name'),
    'config.test.json',
    'config should be for development'
  );
  t.equal(config.get('test-named'), undefined);
  t.end();
});

test('Config should accept an object as the argument to specify overrides', function(t) {
  var config = require('./index')({ 'test-name': 'config.overrides' });
  t.equal(
    config.get('test-name'),
    'config.overrides',
    'config should be for development'
  );
  t.end();
});

test('Config should accept overrides with an enviroment as well', function(t) {
  var config = require('./index')({ env: 'test', myKey: 'TestOverride' });
  t.equal(
    config.get('test-name'),
    'config.test.json',
    'config should be for development'
  );
  t.equal(config.get('myKey'), 'TestOverride', 'should be set from overrides');
  t.notOk(config.get('env'), 'This should have been deleted');
  t.end();
});

test('Config should add a TEST_PROP to env when testProp is set in config', t => {
  const val = 'test prop';
  var config = require('./index')({ env: 'test', testProp: val });
  t.equal(process.env.TEST_PROP, val);
  t.end();
});

test('Config should add a OBJ_PROP to env when obj.prop is set in config', t => {
  const val = 'test prop';
  var config = require('./index')({ env: 'test', obj: { prop: val } });
  t.equal(process.env.OBJ_PROP, val);
  t.end();
});

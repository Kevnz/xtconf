var test = require("tap").test

var util = require('util');
test("Make sure default development enviroment is returned", function (t) {
    var config = require('./index')();
    t.equal(config.get('test-name'), "config.development.json", "config should be for development");
    t.end();
});

test("Make sure passing in an enviroment returns correct config", function (t) {
    var config = require('./index')('test'); 
    t.equal(config.get('test-name'), "config.test.json", "config should be for development");
    t.end();
});

test('Config should accept an object as the argument to specify overrides', function (t) {
	var config = require('./index')({'test-name': 'config.overrides'});
    t.equal(config.get('test-name'), "config.overrides", "config should be for development");
    t.end();
});

test('Config should accept overrides with an enviroment as well', function (t) {
	var config = require('./index')({'env': 'test', myKey: 'TestOverride' });
    t.equal(config.get('test-name'), "config.test.json", "config should be for development");
    t.equal(config.get('myKey'), "TestOverride", "should be set from overrides");
    t.notOk(config.get('env'), "This should have been deleted"); 
    t.end();
});
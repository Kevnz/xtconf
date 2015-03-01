var qconf = require('qconf');
var path = require('path');

module.exports = function (config) {
	var env, configFile, baseConfig, overrides;
	if (arguments.length === 0) {
		env = process.env.NODE_ENV || 'development';
	} else {
		if (typeof config ==='string'){
			env = config
		} else { //config is believed to be an object
			env = config.env ? config.env : process.env.NODE_ENV;
			overrides = config;
			delete overrides.env;
		} 
	}

	configFile = 'file://config/config.' + env + '.json';
	baseConfig = 'file://config/config.json'; 
	var c = qconf(overrides,[baseConfig, configFile] );
	return c;
}
 
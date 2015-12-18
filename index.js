var qconf = require('qconf');
var path = require('path');
var fs = require('fs');

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
	var configFiles = [baseConfig, configFile];
	if (env === 'development') {
		// look for a "named" development file
		var files = fs.readdirSync('./config');
		for (var i = 0; i < files.length; i++) {
			
			if(files[i].indexOf('config.development.') > -1 && files[i] !== 'config.development.json') {
				configFiles.push('file://config/'+ files[i]);
			}
		};
	}
	var c = qconf(overrides, configFiles );
	return c;
}
 
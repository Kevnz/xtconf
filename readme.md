[![Build Status](https://travis-ci.org/Kevnz/xtconf.png?branch=master)](https://travis-ci.org/Kevnz/xtconf)

# xtconf

Extended qconf based on environment. Additionally it will load your settings into environment variables.

## install

```
npm install xtconf --save
```

### Usage

Create a config folder and then json files for each environment like config.development.json, config.production.json
\config
-config.json
-config.development.json
-config.production.json
-config.test.json

```
var config = require('xtconf')();
config.get('setting');
// OR
process.env.SETTING
```

You can also create a config.json to share settings against multiple environments

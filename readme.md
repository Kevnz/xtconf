# xtconf

[![Build Status](https://travis-ci.org/Kevnz/xtconf.png?branch=master)](https://travis-ci.org/Kevnz/xtconf)



Configuration based on environment. Additionally it will load your settings into environment variables.

## Install

```bash
npm install xtconf --save
```

### Usage

Create a config folder and then json files for each environment like config.development.json, config.production.json

```
\config
 -config.json
 -config.development.json
 -config.production.json
 -config.test.json
```

```js
var config = require('xtconf')();
config.get('setting');
// OR
process.env.SETTING
```

You can also create a config.json to share settings against multiple environments

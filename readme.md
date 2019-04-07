# xtconf

[![npm version](https://badge.fury.io/js/xtconf.svg)](https://badge.fury.io/js/xtconf) ![Build Status](https://img.shields.io/circleci/project/github/Kevnz/xtconf/master.svg) [![Coverage Status](https://coveralls.io/repos/github/Kevnz/xtconf/badge.svg?branch=master)](https://coveralls.io/github/Kevnz/xtconf?branch=master)

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

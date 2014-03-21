#xtconf

Extended qconf based on environment

###Install

```
npm install xtconf
```

###Use
Create a config folder and then json files for each environment like config.development.json, config.production.json

```
var config = require('xtconf')();
config.get('setting');
```

You can also create a config.json to share settings against multiple environments 


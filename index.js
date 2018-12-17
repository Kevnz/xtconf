const fs = require('fs')
const to = require('to-case')

const configurator = function(overrides, configFiles) {
  const configs = configFiles.map(config => {
    if (config.indexOf('undefined') > -1) return {}
    const content = fs.readFileSync(config)
    return JSON.parse(content)
  })
  const configProps = Object.assign({}, ...configs, overrides)

  return Object.assign({}, ...configs, overrides, {
    getAll: function() {
      const keys = Object.keys(configProps)
      const mapped = {}
      keys.forEach(k => {
        if (typeof configProps[k] !== 'function') {
          mapped[k] = configProps[k]
        }
      })

      return mapped
    },
    get: function(key) {
      return configProps[key]
    },
  })
}
const normalizeConfig = config => {
  if (typeof config === 'string') {
    return {
      env: config,
    }
  }
  return config
}
function loadDevFiles(env, configFiles) {
  if (env === 'development') {
    // look for a "named" development file
    var files = fs.readdirSync('./config')
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].indexOf('config.development.') > -1 &&
        files[i] !== 'config.development.json'
      ) {
        configFiles.push('config/' + files[i])
      }
    }
  }
}

function addToProcess(conf, key, process) {
  const element = conf[key]
  const fkey = to.constant(key)

  if (typeof element === 'object') {
    for (const subkey in element) {
      if (element.hasOwnProperty(subkey)) {
        const subElement = element[subkey]
        const nestedkey = `${to.constant(key)}_${to.constant(subkey)}`
        process.env[nestedkey] = subElement
      }
    }
  } else {
    process.env[fkey] = element
  }
}

module.exports = function(
  config = {
    env: process.env.NODE_ENV || 'development',
  }
) {
  let env, configFile, baseConfig, overrides

  config = normalizeConfig(config)
  env = config.env ? config.env : process.env.NODE_ENV
  overrides = config
  delete overrides.env
  configFile = 'config/config.' + env + '.json'
  baseConfig = 'config/config.json'
  var configFiles = [baseConfig, configFile]
  loadDevFiles(env, configFiles)
  const c = configurator(overrides, configFiles)
  const conf = c.getAll()
  for (const key in conf) {
    if (conf.hasOwnProperty(key)) {
      addToProcess(conf, key, process)
    }
  }
  return c
}

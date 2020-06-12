const { sh, cli } = require('tasksfile')

/**
 * Runs jsdoc with optional config
 * @param {*} options An object with the arguments passed from cli
 */
function doc (options) {
  const projectDefaults = {
    src: [
      './sensu-nodejs-plugins/*',
      './README.md'
    ],
    config: './jsdoc-config.json',
    dest: 'docs',
    template: 'node_modules/jsdoc-fresh'
  }
  const customSrc = options.src || []
  const src = [...projectDefaults.src, ...customSrc]
  const config = options.config || projectDefaults.config
  const dest = options.dest || projectDefaults.dest
  const template = options.template || projectDefaults.template
  sh(`npx jsdoc ${src.join(' ')} -c ${config} -d ${dest} -t ${template}`)
}

/**
 * Runs pkg as a global package
 */
function build () {
  const myPkg = require('./package.json')
  const projectDefaults = {
    output: './bin/sensu-nodejs-plugins',
    target: 'node12-alpine-x64',
    version: myPkg.version,
    project: myPkg.name
  }
  sh(`pkg . --output ${projectDefaults.output} --target ${projectDefaults.target}`)
  sh(`export VERSION=${projectDefaults.version} && export PROJECT=${projectDefaults.project} && make`)
}

cli({
  doc,
  build
})

#!/usr/bin/env node
const plugins = require('./index')

;(async () => {
  try {
    if (!process.argv[2]) throw new Error('Plugin argument not passed.')
    await plugins[process.argv[2]]()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()

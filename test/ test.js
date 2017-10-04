'use strict'

const assert = require('chai').assert
const fs = require('fs')
const exec = require('child_process').exec
//const spawn = require('child_process').spawn
//const os = require('os')


/*function getOS() {
  let osName = ''
  switch (os.type()) {
    case 'Darwin':
      osName = 'macos'
      break
    case 'win32':
      osName = 'win'
      break
    default:
      osName = 'linux'
      break
  }
  return osName
}*/


describe('Build binary with pkg', function(done) {
  this.timeout(80000)
  before(function(done) {
    exec('npm run dist', (err, stdout, stderr) => {
      assert.equal(err, null, 'Binary build failed')
      assert.equal(stderr, '', 'stderr exists from pkg')
      done()
    })
  })

  let targets = ['linux', 'macos', 'win.exe']
  targets.forEach(function(target) {
    it(`Build ${target}`, function(done) {
      let binaryFile = `./bin/socket-chat-example-${target}`
      fs.stat(binaryFile, function(err, stats) {
        assert.equal(err, null, `binary file not produced, ${binaryFile}`)
        done()
      })
    })
  })
})
/*describe('Build installer with wix', function(done) {
  this.timeout(30000)
  before(function(done) {
    exec('npm run wix', (err, stdout, stderr) => {
      assert.equal(err, null, 'Installer build failed')
      assert.equal(stderr, '', 'stderr exists from pkg')
      done()
    })
  })

  let targets = ['linux', 'macos', 'win.exe']
  targets.forEach(function(target) {
    it(`Build ${target}`, function(done) {
      let binaryFile = `./bin/socket-chat-example-${target}`
      fs.stat(binaryFile, function(err, stats) {
        assert.equal(err, null, `binary file not produced, ${binaryFile}`)
        done()
      })
    })
  })
})*/
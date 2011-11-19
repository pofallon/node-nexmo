/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var fs = require('fs');
var testCase = require('nodeunit').testCase;

var path = process.env.HOME || (process.env.HOMEDRIVE + process.env.HOMEPATH);
var testCredentials = JSON.parse(fs.readFileSync(path + '/.nexmo/test.json','ascii'));
    
var nexmo = require('../lib/nexmo')({key : testCredentials.key, secret : testCredentials.secret});

module.exports = testCase({

  setUp: function (callback) {

    callback();
    
  },

  getBalance: function (test) {

    var a = nexmo.account();

    a.balance(function(err, b) {
      test.equals(err,null);
      test.notEqual(b,null);
      test.done();
    });

  }
  
});

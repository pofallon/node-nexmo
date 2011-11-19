/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var fs = require('fs');
var MemoryStream = require('memorystream');
var testCase = require('nodeunit').testCase;

var path = process.env.HOME || (process.env.HOMEDRIVE + process.env.HOMEPATH);
var testCredentials = JSON.parse(fs.readFileSync(path + '/.nexmo/test.json','ascii'));
    
var nexmo = require('../lib/nexmo')({key : testCredentials.key, secret : testCredentials.secret});

module.exports = testCase({

  setUp: function (callback) {

    this.to = testCredentials.to;
    this.from = testCredentials.from || "nodeNexmoTest";
    callback();
    
  },

  sendTextSms: function (test) {

    var s = nexmo.sms({to: this.to, from: this.from, text: 'Nexmo Test!'});

    s.send(function(err, results) {
      test.equals(err,null);
      test.notEqual(results,null);
      if (results) {
        test.notEqual(results.id,null);
        test.notEqual(results.price,null);
        test.notEqual(results.balance,null);
      }
      test.done();
    });

  }
  
});

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

    nexmo.account.balance(function(err, b) {
      test.equals(err,null);
      test.notEqual(b,null);
      test.equals(b > 0,true)
      test.done();
    });

  },

  getPricing: function (test) {

    nexmo.account.pricing('US',function(err, p) {
      test.equals(err,null);
      test.notEqual(p,null);
      test.done();
    });

  },

  setSecret: function (test) {

    nexmo.account.secret(testCredentials.secret, function(err, s) {
      test.equals(err,null);
      test.notEqual(s,null);
      test.equal(s,testCredentials.secret);
      test.done();
    });

  },

  setInboundUrl: function (test) {

    nexmo.account.inboundUrl('http://www.google.com', function(err, url) {
      test.equals(err,null);
      test.notEqual(url,null);
      test.equals(url,'http://www.google.com');
      test.done();
    });

  },

  setReceiptsUrl: function (test) {

    nexmo.account.receiptsUrl('http://www.google.com', function(err, url) {
      test.equals(err,null);
      test.notEqual(url,null);
      test.equals(url,'http://www.google.com');
      test.done();
    });

  }
  
});

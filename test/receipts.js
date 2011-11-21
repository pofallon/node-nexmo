/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var testCase = require('nodeunit').testCase;
var url = require('url');
var request = require('request');

var nexmo = require('../lib/nexmo')();

module.exports = testCase({

  setUp: function (callback) {

    callback();

  },

  receiptEmit: function (test) {

    test.expect(9);

    nexmo.receipts.on('failed', function(msg) {
      test.notEqual(msg,null);
      test.equals(msg.to,'0011234567890');
      test.equals(msg['network-code'],'ABC');
      test.equals(msg['message-id'],'ABC123');
      test.equals(msg.msisdn,'XYZ');
      test.equals(msg.scts,'1101181426');
      nexmo.receipts.stop();
    });

    nexmo.receipts.start();

    var uri = url.format({
      protocol : 'http:',
      hostname : 'localhost',
      port : 3001,
      pathname : '/receipts',
      query : {
        status : 'FAILED',
        to : '0011234567890',
        'network-code' : 'ABC',
        messageId : 'ABC123',
        msisdn : 'XYZ',
        scts : '1101181426'
      }
    });

    request.get({
      uri : uri,
    }, function (error, response, body) {
      test.equal(error, null);
      test.notEqual(response, null)
      test.equal(response.statusCode, 200);
      test.done();
    });
  },

  /* receiptEmitAltPort: function (test) {

    test.expect(9);

    nexmo.receipts.on('failed', function(msg) {
      test.notEqual(msg,null);
      test.equals(msg.to,'0011234567890');
      test.equals(msg['network-code'],'ABC');
      test.equals(msg['message-id'],'ABC123');
      test.equals(msg.msisdn,'XYZ');
      test.equals(msg.scts,'1101181426');
      nexmo.receipts.stop();
    });

    nexmo.receipts.start({port:8080});

    var uri = url.format({
      protocol : 'http:',
      hostname : 'localhost',
      port : 8080,
      pathname : '/receipts',
      query : {
        status : 'FAILED',
        to : '0011234567890',
        'network-code' : 'ABC',
        messageId : 'ABC123',
        msisdn : 'XYZ',
        scts : '1101181426'
      }
    });

    request.get({
      uri : uri,
    }, function (error, response, body) {
      test.equal(error, null);
      test.notEqual(response, null)
      test.equal(response.statusCode, 200);
      test.done();
    });

  } */

});

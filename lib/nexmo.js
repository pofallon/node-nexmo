/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var Sms = require('./sms');
var Account = require('./account');
// var Num = require('./number');
var Receipts = require('./receipts');

module.exports = function(options) {
  
  function Nexmo () {
  }
  
  Nexmo.sms = function(opts) {
    opts.key = options.key;
    opts.secret = options.secret;
    return(new Sms(opts));
  };

  Nexmo.account = new Account(options);

  // Nexmo.number = new Num(options);

  Nexmo.receipts = new Receipts(options);
    
  return Nexmo;
  
};

/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var Sms = require("./sms");

module.exports = function(options) {
  
  function Nexmo () {
  }
  
  Nexmo.sms = function(opts) {
    opts.key = options.key;
    opts.secret = options.secret;
    return(new Sms(opts));
  };
    
  return Nexmo;
  
};

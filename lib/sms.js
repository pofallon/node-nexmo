/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var request = require('request');
var url = require('url');

function Sms(options) {
  this.options = options;
}

Sms.prototype.send = function(callback) {

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/sms/json',
    query : {
      username : this.options.key,
      password : this.options.secret,
      from : this.options.from,
      to : this.options.to,
      text : this.options.text
    }
  });

  request.post({
    uri : uri,
  }, function (error, response, body) {
    if (error) {
      callback(error);
    } else {
      var results = JSON.parse(body);
      if (results.messages[0].status > 0) {
        callback(new Error(results.messages[0]['error-text']))
      } else {
        callback(null,results);
      }
    }
  });
  
};

module.exports = Sms;

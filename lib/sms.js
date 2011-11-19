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

  var query = {
    username : this.options.key,
    password : this.options.secret,
    from : this.options.from,
    to : this.options.to,
  }

  if (this.options.text) {
    query.text = this.options.text;

  } else if (this.options.body) {
    query.body = this.options.body;
    query.udh = this.options.udh;
    query.type = 'binary';

  } else if (this.options.title) {
    query.title = this.options.title;
    query.url = this.options.url;
    if (this.options.validity) {
      query.validity = this.options.validity;
    }
    query.type = 'wappush';
 
  } else if (this.options.vcard) {
    query.vcard = this.options.vcard;
    query.type = 'vcard';

  } else if (this.options.vcal) {
    query.vcal = this.options.vcal;
    query.type = 'vcal';
  }

  if (this.options['client-ref']) {
    query['client-ref'] = this.options['client-ref'];
  }

  if (this.options.ttl) {
    query.ttl = this.options.ttl;
  }

  if (this.options['network-code']) {
    query['network-code'] = this.options['network-code'];
  }

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/sms/json',
    query : query
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

/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var request = require('request');
var url = require('url');

function Account(options) {
  this.options = options;
}

Account.prototype.balance = function(callback) {

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/account/get-balance/'+ this.options.key + '/' + this.options.secret,
  });

  request.get({
    uri : uri,
    headers : {
      Accept : 'application/json'
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error || new Error());
    } else {
      var results = JSON.parse(body);
      if (results.value) {
        callback(null,results.value);
      } else {
        callback(new Error());
      }
    }
  });
  
};

Account.prototype.pricing = function(country,callback) {

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/account/get-pricing/outbound/'+ this.options.key + '/' + this.options.secret + '/' + country,
  });

  request.get({
    uri : uri,
    headers : {
      Accept : 'application/json'
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error || new Error());
    } else {
      var results = JSON.parse(body);
      if (results.country) {
        callback(null,results);
      } else {
        callback(new Error());
      }
    }
  });

};

Account.prototype.secret = function(secret,callback) {

  var that = this;

  if (secret.length > 8) {
    callback(new Error('Secret greater than 8 characters'));
    return;
  }

  if (secret === null) {
    callback(new Error('Secret is required'));
  }

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/account/settings/'+ this.options.key + '/' + this.options.secret,
    query : {
      newSecret : secret
    }
  });

  request.post({
    uri : uri,
    headers : {
      Accept : 'application/json'
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error || new Error());
    } else {
      var results = JSON.parse(body);
      if (results['api-secret']) {
        callback(null,results['api-secret']);
      } else {
        callback(new Error());
      }
    }
  });

};

Account.prototype.inboundUrl = function(newUrl,callback) {

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/account/settings/'+ this.options.key + '/' + this.options.secret,
    query : {
      moCallBackUrl: newUrl
    }
  });

  request.post({
    uri : uri,
    headers : {
      Accept : 'application/json'
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error || new Error(response.statusCode));
    } else {
      var results = JSON.parse(body);
      if (results['mo-callback-url']) {
        callback(null,results['mo-callback-url']);
      } else {
        callback(new Error());
      }
    }
  });

};

Account.prototype.receiptsUrl = function(newUrl,callback) {

  var uri = url.format({
    protocol : 'http:',
    host : 'rest.nexmo.com',
    pathname : '/account/settings/'+ this.options.key + '/' + this.options.secret,
    query : {
      drCallBackUrl: newUrl
    }
  });

  request.post({
    uri : uri,
    headers : {
      Accept : 'application/json'
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error || new Error());
    } else {
      var results = JSON.parse(body);
      if (results['dr-callback-url']) {
        callback(null,results['dr-callback-url']);
      } else {
        callback(new Error());
      }
    }
  });

}

module.exports = Account;

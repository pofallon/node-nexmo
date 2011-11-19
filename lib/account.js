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

Account.prototype.settings = function(options,callback) {

  return(new Error("Not Yet Implemented"));

};

module.exports = Account;

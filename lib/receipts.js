/*!
 * node-nexmo
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var connect = require('connect');

function Receipts(options) {
  this.options = options || {};
  this.server = null;
}

util.inherits(Receipts,EventEmitter);

Receipts.prototype.start = function(opts,callback) {

  var opts;

  if (!opts) {
    opts = {port: 3001}
  }

  var that = this;

  this.server = connect()
                  .use(connect.query())
                  .use('/receipts',function(req,res) {
                    res.writeHead(200);
                    // res.write('OK');
                    res.end();
                    that.emit(req.query.status.toLowerCase(), {
                      to : req.query.to,
                      'network-code' : req.query['network-code'],
                      'message-id' : req.query.messageId,
                      msisdn : req.query.msisdn,
                      scts : req.query.scts
                    });
                  })
                  .listen(opts.port || 3001);

};

Receipts.prototype.stop = function(country,callback) {

  this.server.close();

};

module.exports = Receipts;

# node-nexmo
A node.js library for accessing the Nexmo REST API.

## Usage

```javascript
var nexmo = require('nexmo')({key: 'key', secret: 'secret'});

// Send an SMS message

var message = nexmo.sms({to: 'to', from: 'from', text: 'Welcome to Nexmo from Node!'});

message.send(function(err, results) {
  if (!err) {
    console.log('Your message was delivered in ' + results['message-count'] + ' part(s)!');
  }
});

// Check your account balance

nexmo.account.balance(function(err, balance) {
  if (!err) {
    console.log('Your account balance is: ' + balance);
  }
});

// ... or spin up an http server and emit message receipts

nexmo.receipts.on('failed', function(msg) {
  console.log('Message to ' + msg.to + ' failed!');
  nexmo.receipts.stop();
}
nexmo.receipts.start();

```

## Install

<pre>
  npm install nexmo
</pre>

## Dependencies

This library depends on:

* [mikeal/request](https://github.com/mikeal/request)
* [senchalabs/connect](https://github.com/senchalabs/connect)
* [caolan/nodeunit](https://github.com/caolan/nodeunit) (for unit tests)

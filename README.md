# node-nexmo
A node.js library for accessing the Nexmo REST API.

## Usage

```javascript
var nexmo = require('nexmo')({key: 'key', secret: 'key'});

// Send an SMS message

var message = nexmo.sms({to: 'to', from: 'from', text: 'Welcome to Nexmo on Node!'});

message.send(function(err, results) {
  if (!err) {
    console.log('Your message (ID ' + results.id + ') was sent!');
  }
});

// ... or check your account balance

nexmo.account.balance(function(err,balance) {
  console.log('Your account balance is: ' + balance);
});

```

## Install

<pre>
  npm install nexmo
</pre>

## Dependencies

This library depends on:

* [mikeal/request](https://github.com/mikeal/request)
* [caolan/nodeunit](https://github.com/caolan/nodeunit) (for unit tests)

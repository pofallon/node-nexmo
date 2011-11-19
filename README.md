# node-nexmo
A node.js library for accessing the Nexmo REST API.

## Usage

```javascript
var nexmo = require('nexmo')({key: 'key', secret: 'key'});

var message = nexmo.sms({to: 'to', from: 'from', text: 'Welcome to Nexmo on Node!'});

message.send(function(err, results) {
  if (err) {
    console.log('Nexmo error: ' + err);
  } else {
    console.log('Message ID: ' + results.id + ' sent!');
  }
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

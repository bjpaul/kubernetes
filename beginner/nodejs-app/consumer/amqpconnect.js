var amqp = require('amqplib/callback_api');
let ENV = require('./env');

const CONN_URL = 'amqp://'+ENV.RABBIT_USER+':'+ENV.RABBIT_PASSWORD+'@'+ENV.RABBIT_HOST+':'+ENV.RABBIT_PORT;
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

module.exports.Publish = (queueName, data) => {
    ch.assertQueue(queueName, {
        durable: true
      });
   ch.sendToQueue(queueName, Buffer.from(data), {persistent: true});
 }

 module.exports.Consume = (queueName, callback) => {
    ch.assertQueue(queueName, {
        durable: true
      });
   ch.consume(queueName, function(msg) {
        callback(msg.content.toString())
    }, {
        noAck: true
    });
 }

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});

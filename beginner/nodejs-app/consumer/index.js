#!/usr/bin/env node
// Import Mongo
let db = require('./mongoconnect');
let AMQP = require('./amqpconnect');
let Stat = require('./controller/stat');
let ENV = require('./env');

let queueName = ENV.QUEUE_NAME

let consume = function(msg){
    data = JSON.parse(msg);
    console.log(data.action)
    Stat.update(data.action)
}

setInterval(() => AMQP.Consume(queueName, consume), 2000);

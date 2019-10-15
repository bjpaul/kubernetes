module.exports.QUEUE_NAME = process.env.QUEUE_NAME || "contact_event_queue"
module.exports.MONGO_HOST = process.env.MONGO_HOST || "localhost"
module.exports.MONGO_PORT = process.env.MONGO_PORT || 27017
module.exports.RABBIT_HOST = process.env.RABBIT_HOST || "localhost"
module.exports.RABBIT_PORT = process.env.RABBIT_PORT || 5672
module.exports.RABBIT_USER = process.env.RABBIT_USER || "user"
module.exports.RABBIT_PASSWORD = process.env.RABBIT_PASSWORD || "password"
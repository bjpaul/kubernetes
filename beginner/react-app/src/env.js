// let WRITER_PROTOCOL = process.env.WRITER_PROTOCOL || "http://"
// let WRITER_HOST = process.env.WRITER_HOST || "localhost"
// let WRITER_PORT = process.env.WRITER_PORT || 8081
// module.exports.WRITER_ENDPOINT = WRITER_PROTOCOL+WRITER_HOST+':'+WRITER_PORT

// let READER_PROTOCOL = process.env.READER_PROTOCOL || "http://"
// let READER_HOST = process.env.READER_HOST || "localhost"
// let READER_PORT = process.env.READER_PORT || 8080
// module.exports.READER_ENDPOINT = READER_PROTOCOL+READER_HOST+':'+READER_PORT

let WRITER_PROTOCOL = "https://"
let WRITER_HOST = "demo-kube.com"
let WRITER_PORT = "30443"
module.exports.WRITER_ENDPOINT = WRITER_PROTOCOL+WRITER_HOST+':'+WRITER_PORT

let READER_PROTOCOL = "https://"
let READER_HOST = "demo-kube.com"
let READER_PORT = "30443"
module.exports.READER_ENDPOINT = READER_PROTOCOL+READER_HOST+':'+READER_PORT
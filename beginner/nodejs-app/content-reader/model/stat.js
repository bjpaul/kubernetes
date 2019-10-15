var mongoose = require('mongoose');
// Setup schema
var statSchema = mongoose.Schema({
    createEvent: {
        type: Number,
        required: false
    },
    updateEvent: {
        type: Number,
        required: false
    },
    deleteEvent: {
        type: Number,
        required: false
    }
});
// Export Stat model
module.exports.Stat = mongoose.model('stat', statSchema);
module.exports.get = function (callback, limit) {
    Stat.find(callback).limit(limit);
}
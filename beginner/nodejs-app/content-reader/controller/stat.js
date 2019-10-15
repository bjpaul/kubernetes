// Import stat model
Schema = require('../model/stat');

// Handle view contact info
exports.view = function (req, res) {
    Schema.Stat.findOne({}, function (err, stat) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'Contact details loading..',
            data: stat
        });
    });
};

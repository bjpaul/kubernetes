// Import contact model
Contact = require('../model/contact');
// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle view contact count
exports.count = function (req, res) {
    Contact.find({"gender": req.params.gender}).count(function (err, count) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            res.json({
                message: 'Contact count loading..',
                data: count
            });
        }
    });
};
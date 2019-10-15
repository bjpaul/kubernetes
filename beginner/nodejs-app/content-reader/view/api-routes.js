// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Reader is working!',
    });
});
// Import contact controller
var contactController = require('../controller/contact');
// Import stat controller
var statController = require('../controller/stat');
// Contact routes
router.route('/contacts')
    .get(contactController.index);
router.route('/contacts/stat')
    .get(statController.view);
router.route('/contacts/:contact_id')
    .get(contactController.view);
router.route('/contacts/count/:gender')
    .get(contactController.count);
// Export API routes
module.exports = router;
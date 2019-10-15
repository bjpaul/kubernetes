// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Writer is working!',
    });
});
// Import contact controller
var contactController = require('../controller/contact');
// Contact routes
router.route('/contacts')
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;
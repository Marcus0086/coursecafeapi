const express = require('express');
const router = express.Router();
const RazorPayService = require('../services/razorpayservice');
router.route('/order').post(RazorPayService.order);
router.route('/verify').post(RazorPayService.verify);
module.exports = router;
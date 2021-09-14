const express = require('express');
const router = express.Router();
const PublicService = require('../services/PublicServices');
router.route('/topbarcourses').get(PublicService.topbarcourses);
router.route('/courses').get(PublicService.carouselCourses);
router.route('/coursedetails').get(PublicService.courseDetails);
module.exports = router;
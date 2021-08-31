const express = require('express');
const router = express.Router();
const ApiService = require('../services/ApiService');
router.route('/student/login').post(ApiService.webLogin)
router.route('/student/mycourses').get(ApiService.myCourses);
router.route('/student/mycourseinside').get(ApiService.mycoursesInside);
router.route('/bannerCourses').get(ApiService.bannerCourses);
router.route('/bannerCoursesDetails').get(ApiService.bannerCoursesDetailed);
router.route('/carouselCourses').get(ApiService.carouselCourses);
module.exports = router;
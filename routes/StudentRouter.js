const express = require('express');
const router = express.Router();
const ApiService = require('../services/StudentServices');
router.route('/login').post(ApiService.webLogin)
router.route('/signup').post(ApiService.webSignup)
router.route('/mycourses').get(ApiService.myCourses);
router.route('/mycourseinside').get(ApiService.mycoursesInside);

// Student DashBoard Router
router.route('/student/dashboard').get(ApiService.dashBoard);

module.exports = router;
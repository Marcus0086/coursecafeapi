const express = require('express');
const router = express.Router();
const ApiService = require('../services/StudentServices');
router.route('/StudentLogin').post(ApiService.webLogin)
router.route('/mycourses').get(ApiService.myCourses);
router.route('/mycourseinside').get(ApiService.mycoursesInside);
module.exports = router;
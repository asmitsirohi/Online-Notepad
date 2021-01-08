const express = require('express');
const DashboardController = require('../controllers/DashoardController');

const router = express.Router();
const DashboardControllerObj = new DashboardController();

router.get('/', DashboardControllerObj.index);
router.post('/', DashboardControllerObj.mail);

module.exports = router;
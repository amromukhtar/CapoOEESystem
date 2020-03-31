const experss = require('express');
const router = experss.Router();

const inputsContoller = require('../controllers/inputs');
const liveViewController = require('../controllers/live-view');
const reportController = require('../controllers/reports');


router.get('/live-view', liveViewController.liveView);

router.get('/set-inputs', inputsContoller.setInputs);

router.get('/reports', reportController.getReports);

router.post('/post-inputs', inputsContoller.postInputs);

// API

router.post('/reports/machine', reportController.getMachineReports);

router.post('/reports/download', reportController.downloadReport);

module.exports = router
const experss = require('express');
const router = experss.Router();

const isAuth = require('../middleware/is-auth');

const authController = require('../controllers/auth')
const inputsContoller = require('../controllers/inputs');
const liveViewController = require('../controllers/live-view');
const reportController = require('../controllers/reports');
const settingsController = require('../controllers/settings')


// Login Routes

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/', authController.getLogin);

router.get('/index', isAuth, authController.index);

// Main Routes

router.get('/live-view', liveViewController.liveView);

router.get('/set-inputs', isAuth, inputsContoller.setInputs);

router.get('/reports', isAuth, reportController.getReports);

router.post('/post-inputs', isAuth, inputsContoller.postInputs);

//settings 

router.get('/settings', isAuth, settingsController.getSettings);


// API

router.post('/reports/machine', isAuth, reportController.getMachineReports);

router.post('/reports/download', isAuth, reportController.downloadReport);

router.post('/settings/factors', isAuth, settingsController.postFactors);

module.exports = router
const experss = require('express');
const router = experss.Router();

const inputsContoller = require('../controllers/inputs');
const liveViewController = require('../controllers/live-view')


router.get('/live-view', liveViewController.liveView);

router.get('/set-inputs', inputsContoller.setInputs);

router.post('/post-inputs', inputsContoller.postInputs);

module.exports = router
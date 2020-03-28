const experss = require('express');
const router = experss.Router();

const loginController = require('../controllers/login')

router.get('/index', loginController.index)

router.post('/login', loginController.postLogin);

router.use('/', loginController.getLogin);

module.exports = router
const Router = require('koa-router');
const passwdRec = require('../controllers/passwdRec');

const router = new Router();

router.get('/email', passwdRec.passwdRec);

module.exports = router;

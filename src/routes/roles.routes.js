const {Router} = require('express');
const { getRoles } = require('../controllers/users.controller');
const {verifyToken,isAdmin} = require('../middleware/');

const router = Router();

router.get("/",getRoles)

module.exports = router

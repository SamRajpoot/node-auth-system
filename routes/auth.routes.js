// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/auth.controller');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;

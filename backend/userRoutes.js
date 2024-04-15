const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/get', userController.getAllUsers);
router.post('/post', userController.createUser);

module.exports = router;
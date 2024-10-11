
const express = require('express');
const { login_controller, signup_controller,history_controller } = require('../Controllers/auth');
const { history_delete } = require('../Controllers/history_delete');

const router = express.Router();

router.route('/login').post(login_controller);

router.route('/signup').post(signup_controller);

router.route('/history').post(history_controller);

router.route('/history/delete').post(history_delete);



module.exports = router;
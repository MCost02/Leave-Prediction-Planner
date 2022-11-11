const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.get('/', controller.index);

router.get('/instructor-home', controller.instructorHome);
router.get('/admin-home', controller.adminHome);
router.get('/database', controller.database);
router.get('/events', controller.events);

router.get('/login', controller.getUserLogin);
router.get('/signup', controller.signUp);

router.get('/profile', controller.profile);
router.get('/editprofile', controller.editProfile);

module.exports = router;

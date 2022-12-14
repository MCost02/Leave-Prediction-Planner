const express = require('express');
const controller = require('../controllers/mainController');
const { isGuest, isLoggedIn, isCreator } = require('../middlewares/auth');
const { logInLimiter } = require('../middlewares/rateLimiters');
const { validateSignUp, validateLogIn, validateProfile, validateDate, validateResult } = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.index);

router.get('/instructor-home', isLoggedIn, controller.instructorHome);
router.get('/admin-home', isLoggedIn, controller.adminHome);
router.get('/database', isLoggedIn, controller.database);
router.get('/events', isLoggedIn, controller.events);

router.get('/signup', isGuest, controller.signUp);
router.post('/', isGuest, validateSignUp, validateResult, controller.create);
router.get('/login', isGuest, controller.getUserLogin);
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);
router.get('/logout', isLoggedIn, controller.logout);

router.get('/profile', isLoggedIn, controller.profile);
router.get('/editprofile', isLoggedIn, controller.editProfile);
router.put('/:id', isLoggedIn, validateProfile, validateResult, controller.updateProfile);

router.get('/addDate', isLoggedIn, controller.newDate)
router.post('/sigdates', isLoggedIn, validateDate, validateResult, controller.addDate);
router.delete('/:id', isLoggedIn, isCreator, controller.deleteDate);

module.exports = router;

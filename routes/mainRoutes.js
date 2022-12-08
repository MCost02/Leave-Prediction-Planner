const express = require('express');
const controller = require('../controllers/mainController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { logInLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.get('/', controller.index);

router.get('/instructor-home', isLoggedIn, controller.instructorHome);
router.get('/admin-home', isLoggedIn, controller.adminHome);
router.get('/database', isLoggedIn, controller.database);
router.get('/events', isLoggedIn, controller.events);

router.get('/signup', isGuest, controller.signUp);
router.post('/', isGuest, controller.create);
router.get('/login', isGuest, controller.getUserLogin);
router.post('/login', logInLimiter, isGuest, controller.login);
router.get('/logout', isLoggedIn, controller.logout);

router.get('/profile', isLoggedIn, controller.profile);
router.get('/editprofile', isLoggedIn, controller.editProfile);
router.put('/:id', isLoggedIn, controller.updateProfile);

router.get('/addDate', isLoggedIn, controller.newDate)
router.post('/sigdates', isLoggedIn, controller.addDate);
router.delete('/:id', isLoggedIn, controller.deleteDate);

module.exports = router;

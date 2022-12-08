const express = require('express');
const controller = require('../controllers/mainController');
const { logInLimiter } = require('../middlewares/rateLimiters');

const router = express.Router();

router.get('/', controller.index);

router.get('/instructor-home', controller.instructorHome);
router.get('/admin-home', controller.adminHome);
router.get('/database', controller.database);
router.get('/events', controller.events);

router.get('/signup', controller.signUp);
router.post('/', controller.create);
router.get('/login', controller.getUserLogin);
router.post('/login', logInLimiter, controller.login);
router.get('/logout', controller.logout);

router.get('/profile', controller.profile);
router.get('/editprofile', controller.editProfile);
router.put('/:id', controller.updateProfile);


router.get('/addDate', controller.newDate)
router.post('/sigdates', controller.addDate);
router.delete('/:id', controller.deleteDate);

module.exports = router;

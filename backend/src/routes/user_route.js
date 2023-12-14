const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller');
const admin_controller = require('../controller/admin_controller');
const { userAuth, adminAuth} = require('../middleware/auth');

//user routes
router.post('/user/signup', user_controller.signup);
router.post('/user/login', user_controller.login);
router.get('/user/getFaqsList', user_controller.getFaqsList);
router.get('/user/get_profile_detail', userAuth, user_controller.get_profile_detail);
router.post('/user/change_password', userAuth, user_controller.change_password);
router.post('/user/send_inquiry', userAuth, user_controller.send_inquiry);
router.get('/user/delete_account', userAuth, user_controller.delete_account)

//admin routes
router.post('/admin/signUp', admin_controller.signUp);
router.post('/admin/signIn', admin_controller.signIn)

router.get('/admin/getFaqsList', user_controller.getFaqsList);
router.post('/admin/addFaqs', adminAuth, admin_controller.addFaqs);
router.get('/admin/delete_faq_detail/:faq_id', adminAuth,admin_controller.delete_faq_detail);


router.get('/admin/get_user_list', adminAuth, admin_controller.get_user_list);
router.get('/admin/user_detail/:user_id', adminAuth, admin_controller.user_detail);


router.get('/admin/get_inquiry_list', adminAuth, admin_controller.get_inquiry_list);



//

module.exports = router;
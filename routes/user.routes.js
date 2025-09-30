const express=require('express');
const{body}=require("express-validator");
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');

const router=express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long')
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email!'),
    body('password').isLength({min:6}).withMessage('password should be of 6 character!')
],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser);


module.exports=router;  
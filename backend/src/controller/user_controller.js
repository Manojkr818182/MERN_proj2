const bcrypt = require('bcrypt');
const { MESSAGE } = require('../utils/message_code');
const { ERROR_CODE, ERROR_MESSEGE } = require('../utils/error_code');
const utils = require('../utils/utils');
const User = require('../models/user.model');
const Faqs = require('../models/faqs.model');
const Inquiry = require('../models/inquiry.model');


exports.signup = (req, res) => {
    User.findOne({ phone: req.body.phone }).then((user_data) => {
        if (user_data) {
            return res.json({
                code: ERROR_CODE.PHONE_ALLREADY_USED,
                message: ERROR_MESSEGE.PHONE_ALLREADY_USED
            })
        }
        User.findOne({ email: req.body.email }).then((user_detail) => {
            if (user_detail) {
                return res.json({
                    code: ERROR_CODE.EMAIL_ALLREADY_USED,
                    message: ERROR_MESSEGE.EMAIL_ALLREADY_USED
                })
            }
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                company: req.body.company,
                abn_number: req.body.abn_number,
                payment_cycle:req.body.payment_cycle,
            });
            user.save().then((user_details) => {
                res.json({
                    code: 1,
                    message: MESSAGE.REGISTER_SUCCESSFULLY,
                    data: user_details
                })
            }).catch(err => {
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user_detail) => {
        if (!user_detail) {
            return res.json({
                code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
            })
        }
        bcrypt.compare(req.body.password, user_detail.password).then(async (isMatched) => {
            if (!isMatched) {
                return res.json({
                    code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                    message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
                })
            }
            const user_token = await utils.generateToken(user_detail._id.toString());
            user_detail.server_token = user_token;
            user_detail.save().then((user_details) => {
                res.json({
                    code: 1,
                    message: MESSAGE.LOGIN_SUCCESSFULLY,
                    data: user_details
                })
            }).catch(err => {
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};


exports.get_profile_detail = (req, res) => {
    const user_id = req.user_id;
    User.findOne({ _id: user_id }, { server_token: 0, password: 0 }).then((user_details) => {
        res.json({
            code: 1,
            message: 'User Details !',
            data: user_details
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.change_password = (req, res) => {
    User.findOne({ _id: req.user_id }).then((user_detail) => {
        if (user_detail) {
            bcrypt.compare(req.body.current_password, user_detail.password).then((isMatched) => {
                if (!isMatched) {
                    return res.json({
                        code: ERROR_CODE.INVALID_CURRENT_PASSWORD,
                        message: ERROR_MESSEGE.INVALID_CURRENT_PASSWORD
                    })
                }
                user_detail.password = req.body.new_password;
                user_detail.save().then((user_detals) => {
                    res.json({
                        code: 1,
                        message: 'Password Changed !'
                    })
                }).catch(err => {
                    res.json({
                        code: ERROR_CODE.SERVER_ERROR,
                        message: err.toString()
                    })
                })
            })
        }
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};


exports.send_inquiry = (req, res) => {
    const user_id = req.user_id;
    const inquiry_msg = req.body.inquiry_msg;

    const inquiry = new Inquiry({
        userId:user_id,
        inquiry_msg:inquiry_msg
    });
    inquiry.save().then((inquiry_detail) =>{
        res.json({
            code: 1,
            message: 'Inquiry Sent !',
            data: inquiry_detail
        })
    }).catch(err =>{
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })

};

exports.delete_account = (req, res) =>{
    const user_id = req.user_id;
    User.deleteOne({_id:user_id }).then((result)=>{
        if(result){
            Inquiry.deleteMany({userId:user_id}).then((result) =>{
                res.json({
                    code: 1,
                    message: 'Account Deleted !',
                    data: result
                })
            }).catch(err =>{
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        } else{
            res.json({
                code: 100,
                message: 'Failed to Delete'
            })
        }
    }).catch(err =>{
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};


exports.getFaqsList = (req, res) => {
    Faqs.find({}).then((faqsList) => {
        res.json({
            code: 1,
            message: MESSAGE.LIST_FOUND,
            data: faqsList
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

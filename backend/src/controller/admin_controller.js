const bcrypt = require('bcrypt');
const { ERROR_CODE, ERROR_MESSEGE } = require('../utils/error_code');
const { MESSAGE } = require('../utils/message_code');
const User = require('../models/user.model');
const Faqs = require('../models/faqs.model');
const Inquiry = require('../models/inquiry.model');
const Admin = require('../models/admin.model');
const utils = require('../utils/utils');

exports.signUp = (req, res) => {
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    admin.save().then((admin_detail) => {
        res.json({
            code: 1,
            message: 'Admin Added',
            data: admin_detail
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.signIn = (req, res) => {
    Admin.findOne({ email: req.body.email }).then((admin_data) => {
        if (!admin_data) {
            return res.json({
                code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
            })
        }
        bcrypt.compare(req.body.password, admin_data.password).then(async (isMatched) => {
            if (!isMatched) {
                return res.json({
                    code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                    message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
                })
            }
            const token = await utils.generateToken(admin_data._id.toString());
            admin_data.server_token = token;
            admin_data.save().then((admin_details) => {
                res.json({
                    code: 1,
                    message: 'Login Success',
                    data: admin_details
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

exports.addFaqs = (req, res) => {
    const faq = new Faqs({
        title: req.body.title,
        content: req.body.content
    });

    faq.save().then((faq_detail) => {
        res.json({
            code: 1,
            message: MESSAGE.ADDED_SUCCESSFULLY,
            data: faq_detail
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};


exports.delete_faq_detail = (req, res) => {
    const faq_id = req.params.faq_id;
    Faqs.deleteOne({ _id: faq_id }).then((result) => {
        res.json({
            code: 1,
            message: 'Removed !',
            data: result
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

//***user ********
exports.get_user_list = (req, res) => {
    User.find({}).then((user_list) => {
        res.json({
            code: 1,
            message: "User List Found",
            data: user_list
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.user_detail = (req, res) => {
    const user_id = req.params.user_id;

    User.findOne({ _id: user_id }).then((user_data) => {
        if (!user_data) {
            return res.json({
                code: 0,
                message: 'User Not found !'
            })
        } else {
            res.json({
                code: 1,
                data: user_data,
                message: 'User  found !'
            })
        }

    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

//***inquiry ******
exports.get_inquiry_list = (req, res) => {
    Inquiry.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user_detail"
            }
        },
        { $unwind: "$user_detail" },
        {
            $group: {
                _id: '$_id',
                inquiry_msg: { $first: '$inquiry_msg' },
                first_name: { $first: '$user_detail.first_name' },
                last_name: { $first: '$user_detail.last_name' },
                email: { $first: '$user_detail.email' },
                user_id: { $first: '$user_detail._id' },
                company: { $first: '$user_detail.company' },
                createdAt: { $first: '$createdAt' },
            }
        },
        { $sort: { createdAt: -1 } }
    ]).then((list) => {
        res.json({
            code: 1,
            message: 'Inquiry List',
            data: list
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};
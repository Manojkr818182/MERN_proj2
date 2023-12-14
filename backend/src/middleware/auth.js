const { ERROR_CODE, ERROR_MESSEGE } = require('../utils/error_code');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    code: ERROR_CODE.INVALID_SERVER_TOKEN,
                    message: err.toString()
                })
            } else {
                // User.findOne({ _id: decoded.aud, server_token: token }).then((user_data) => {
                User.findOne({ _id: decoded.aud }).then((user_data) => {
                    if (!user_data) {
                        return res.json({
                            code: ERROR_CODE.NOT_AUTHORIZED,
                            message: ERROR_MESSEGE.NOT_AUTHORIZED
                        })
                    }
                    req.user_id = user_data._id;
                    next();
                }).catch(err => {
                    return res.json({
                        code: ERROR_CODE.INVALID_SERVER_TOKEN,
                        message: err.toString()
                    })
                })
            }
        })
    } catch (err) {
        return res.json({
            code: ERROR_CODE.INVALID_SERVER_TOKEN,
            message: err.toString()
        })
    }
};


exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    code: ERROR_CODE.INVALID_SERVER_TOKEN,
                    message: err.toString()
                })
            } else {
                // Admin.findOne({ _id: decoded.aud, server_token: token }).then((user_data) => {
                    Admin.findOne({ _id: decoded.aud }).then((admin_detail) => {
                    if (!admin_detail) {
                        return res.json({
                            code: ERROR_CODE.NOT_AUTHORIZED,
                            message: ERROR_MESSEGE.NOT_AUTHORIZED
                        })
                    }
                    req.user_id = admin_detail._id;
                    next();
                }).catch(err => {
                    return res.json({
                        code: ERROR_CODE.INVALID_SERVER_TOKEN,
                        message: err.toString()
                    })
                })
            }
        })
    } catch (err) {
        return res.json({
            code: ERROR_CODE.INVALID_SERVER_TOKEN,
            message: err.toString()
        })
    }
};


exports.authRole = (role) => {
    return (req, res, next) => {
        const user_id = req.user_id;
        User.findOne({ _id: user_id, type: role }).then((user_detail) => {
            if (!user_detail) {
                return res.json({
                    code: ERROR_CODE.NOT_AUTHORIZED,
                    message: ERROR_MESSEGE.NOT_AUTHORIZED
                })
            } else {
                next();
            }
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }
}
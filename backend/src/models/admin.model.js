const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: "",
            index: true
        },
        password: {
            type: String,
            default: ""
        },
        server_token: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 10);
    }
    next();
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const inquirySchema = new schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        inquiry_msg: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);



const Inquiry = mongoose.model('inquiry', inquirySchema);
module.exports = Inquiry;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqsSchema = new schema(
    {
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);



const Faqs = mongoose.model('faqs', faqsSchema);
module.exports = Faqs;
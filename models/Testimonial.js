const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
    ,
    webId: String
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    room: String,
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Message', MessageSchema);
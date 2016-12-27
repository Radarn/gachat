var mongoose = require('mongoose');

module.exports = mongoose.model('ChatMessage', {
    message: String,
    type: String,
    user: String,
    date: {
      type: Date,
      default: Date.now
    }
});

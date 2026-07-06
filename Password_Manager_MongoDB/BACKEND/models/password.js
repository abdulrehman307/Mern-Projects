const mongoose = require('mongoose');

// Mongoose Schema define kar rahay hain
const passwordSchema = new mongoose.Schema({
    site: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Model export kar rahay hain taa ke server.js mein use ho sakay
module.exports = mongoose.model('Password', passwordSchema);
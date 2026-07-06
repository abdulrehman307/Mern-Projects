const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*', // Pehle asterisk se try karte hain (sab allow kar dega)
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());

const Password = require('./models/Password'); // Hamara banaya hua model

mongoose.connect("mongodb://localhost:27017/PassX")
.then(() => console.log('MongoDB Connected successfully via Mongoose!'))
    .catch((err) => console.log('Database Connection Error:', err));

    //CRUD Operations
    app.get('/api/passwords', async (req, res) => {
        try {
            const passwords = await Password.find({});
            res.json(passwords);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

        //Post method
      // POST request for saving passwords
app.post('/api/passwords', async (req, res) => {
    try {
        // Database me naya password save karo
        const newPassword = new Password(req.body);
        const savedPassword = await newPassword.save();
        res.json(savedPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

        // PUT method for updating passwords
app.put('/api/password/:id', async (req, res) => {
    try {
        const updatedPassword = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update password" });
    }
});

        // 3. DELETE
app.delete('/api/passwords/:id', async (req, res) => {
    try {
        await Password.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Password deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete password" });
    }
});

        app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const testimonials = require('./routes/testimonials');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://abubakar:hahatestimonial@cluster0.gc80wvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    ssl: true,
    sslValidate: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
// Routes
app.use('/api/testimonials', testimonials);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

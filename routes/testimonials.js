const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial'); // Assuming you have a Testimonial model

// Get testimonials by webId
router.get('/testimonials/:webId', async (req, res) => {
    try {
        const { webId } = req.params;
        const testimonials = await Testimonial.find({ webId });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit a testimonial
router.post('/testimonials/:webId', async (req, res) => {
    const { webId } = req.params;
    const { author, message } = req.body;
    const testimonial = new Testimonial({ author, message, webId });
    try {
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

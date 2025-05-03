const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this file exists
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

// Function to generate a 4-digit CAPTCHA
function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'Please log in first.');
    res.redirect('/login');
}

// GET Signup Page
router.get('/signup', (req, res) => {
    const captcha = generateCaptcha();
    req.session.captcha = captcha;
    res.render('signup', { captcha, message: req.flash('error') });
});

// POST Signup Form
router.post('/signup', async (req, res) => {
    const { email, password, captcha } = req.body;

    if (captcha != req.session.captcha) {
        req.flash('error', 'Invalid CAPTCHA');
        return res.redirect('/signup');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email already registered');
            return res.redirect('/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (err) {
        console.error("Signup Error:", err);
        req.flash('error', 'Something went wrong. Try again.');
        res.redirect('/signup');
    }
});

// GET Login Page
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

// POST Login Form
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        req.session.user = { email: user.email };  // Store user email in session
        req.flash('success', 'Login successful!');
        res.redirect('/dashboard');  // Redirect to dashboard
    } catch (err) {
        console.error("Login Error:", err);
        req.flash('error', 'Login failed. Try again.');
        res.redirect('/login');
    }
});

// GET Dashboard (Protected Route)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { email: req.session.user.email }); // Pass email to the template
});

// GET Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout Error:", err);
        }
        res.redirect('/login');
    });
});

module.exports = router;
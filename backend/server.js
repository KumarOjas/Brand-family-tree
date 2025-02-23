const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    }
});
const upload = multer({ storage: storage });

// Google Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Here you would typically save the user profile to your database
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Brand Family Tree API');
});

// Google Authentication Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to your desired page
        res.redirect('/'); // Change this to your frontend URL
    }
);

// Route to fetch state and city data
app.get('/api/states', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'states.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading states data');
        }
        res.json(JSON.parse(data));
    });
});

// Route to handle review submissions
app.post('/submit-review', upload.single('profilePicture'), (req, res) => {
    const { review } = req.body;
    const profilePicture = req.file; // Access the uploaded file
    console.log('Review submitted:', review);
    console.log('Profile picture:', profilePicture);
    
    // Save review to JSON file
    const reviewData = {
        review: review,
        profilePicture: profilePicture.filename, // Save the filename
        timestamp: new Date().toISOString()
    };

    fs.readFile(path.join(__dirname, 'data', 'reviews.json'), 'utf8', (err, data) => {
        let reviews = [];
        if (!err) {
            reviews = JSON.parse(data);
        }
        reviews.push(reviewData);
        fs.writeFile(path.join(__dirname, 'data', 'reviews.json'), JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving review');
            }
            res.status(200).send('Review submitted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

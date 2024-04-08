const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Require the path module

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Specify your email service provider
  auth: {
    user: 'festusmbahconnect@gmail.com', 
    pass: 'ifgaafyevlngv' 
  }
});

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});


// Route handler for 'Choose.html'
app.get('/Choose.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Choose.html')); 
  });
  

// Route handler for 'Start.html'
app.get('/Start.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Start.html')); 
  });
   
// Route to handle form submissions
app.post('/submit_email', (req, res) => {
  const emailText = req.body.textarea; // Get the textarea field from the form

  // Email content
  const mailOptions = {
    from: 'festusmbahconnect@gmail.com',
    to: 'festusmbahconnect@gmail.com', // Your email address
    subject: 'New form submission',
    text: emailText 
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.send('Error submitting form');
    } else {
      console.log('Email sent:', info.response);
      res.redirect('/Start.html');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

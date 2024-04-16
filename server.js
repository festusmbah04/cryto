require('dotenv').config(); // Load environment variables from a .env file

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

app.get('/Choose.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Choose.html')); 
});

app.get('/Start.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Start.html')); 
});

app.post('/submit_email', (req, res) => {
  const emailText = req.body.textarea;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New form submission',
    text: emailText 
  };

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

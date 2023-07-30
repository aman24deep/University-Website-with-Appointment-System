const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());

// Set up CORS middleware
app.use(cors({
  origin: 'http://127.0.0.1:7000',
  optionsSuccessStatus: 200
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rvscettemp@gmail.com',
    pass: 'fwzarhmnznkgdhtg'
  }
});


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'appointments'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// The API endpoint
app.get('/api/data', (req, res) => {
  // mysql query 
  const query = 'SELECT * FROM students ORDER BY created_at';

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      return;
    }
    // console.log(rows)
    res.json(rows);
  });
});

app.put('/api/update', (req, res) => {
  // const query = 'UPDATE students'
  const { email, appointDate, appointTime } = req.body;
  // console.log(req.body)
  // console.log(email)
  // console.log(appointDate)
  // console.log(appointTime)
  const query = "UPDATE students SET appointment_date	 = ?, appointment_time = TIME_FORMAT(?, '%h:%i %p') WHERE email = ?";
  connection.query(query, [appointDate, appointTime, email], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to Update data from MySQL' });
      return;
    }
    else {
      const mail = {
        from: 'rvscettemp@gmail.com',
        to: email,
        subject: 'Appointment Scheduled',
        text: 'Your Appointment Scheduled on ' + String(appointDate) + " at " + String(appointTime)
      };

      transporter.sendMail(mail, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.send(`Appointment Updated`);
      return;
    }
    // console.log(rows)
  });
  return;
})

app.delete('/api/delete', (req, res) => {
  const { email } = req.body;
  const query = "DELETE FROM students WHERE email = ?"
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to Delete data from MySQL' });
      return;
    }
    const mail = {
      from: 'rvscettemp@gmail.com',
      to: email,
      subject: 'Not Eligible',
      text: "We're Sorry to inform you but we can't move forward with you at this time."
    };
    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log('Mail Sent Successfully')
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

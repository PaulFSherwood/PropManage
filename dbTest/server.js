const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sherwood',
  database: 'PropertyManagementSystem'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.post('/addProperty', (req, res) => {
  const { address, size, type, stage, image, purchaseAmount } = req.body;

  const addPropertyQuery = `INSERT INTO Properties (address, size, type, stage, image) VALUES (?, ?, ?, ?, ?)`;
  connection.query(addPropertyQuery, [address, size, type, stage, image], (err, result) => {
    if (err) return res.status(500).send(err);

    const propertyId = result.insertId;
    const addPaymentQuery = `INSERT INTO Payments (property_id, payment_type, amount, date) VALUES (?, 'Purchase', ?, CURDATE())`;
    connection.query(addPaymentQuery, [propertyId, purchaseAmount], (err, result) => {
      if (err) return res.status(500).send(err);

      res.send('Property and purchase payment added successfully.');
    });
  });
});

app.post('/addExpense', (req, res) => {
  const { propertyId, expenseType, amount } = req.body;

  const addExpenseQuery = `INSERT INTO Expenses (property_id, expense_type, amount, date) VALUES (?, ?, ?, CURDATE())`;
  connection.query(addExpenseQuery, [propertyId, expenseType, amount], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send('Expense added successfully.');
  });
});

// Default route
app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve add_property.html
app.get('/add_property', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve add_expense.html
app.get('/add_expense', (req, res) => {
  console.log('Serving expense.html');
  res.sendFile(path.join(__dirname, 'public', 'expense.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

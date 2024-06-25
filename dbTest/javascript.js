const express = require('express');
const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

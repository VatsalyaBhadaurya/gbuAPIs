const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL/MariaDB');
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ REST API is running');
});

//////////////////// USERS ////////////////////

// GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// POST new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, email });
  });
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User updated successfully');
  });
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User deleted successfully');
  });
});

//////////////////// ADMIN ////////////////////

// GET all admins
app.get('/admin', (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET admin by ID
app.get('/admin/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// POST new admin
app.post('/admin', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO admin (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, email });
  });
});

// PUT update admin
app.put('/admin/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query('UPDATE admin SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Admin updated successfully');
  });
});

// DELETE admin
app.delete('/admin/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM admin WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Admin deleted successfully');
  });
});


// GET all users
app.get('/assignments', (req, res) => {
  db.query('SELECT * FROM assignments', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET user by ID
app.get('/assignemnts/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM assignments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// POST new ass
app.post('/assignments', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO assignments (course_code, faculty_id, title, description, attachments, due_date,max_marks, rubric_criteria, status, auto_grade) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, email });
  });
});

// PUT update ass
app.put('/assignments/:id', (req, res) => {
  const {  course_code, faculty_id, title, description, attachments, due_date, max_marks, rubric_criteria, status, auto_grade } = req.body;
  const { id } = req.params;
  db.query('UPDATE assignments SET name = ?, email = ? WHERE id = ?', [ course_code, faculty_id, title, description, attachments, due_date, max_marks, rubric_criteria, status, auto_graded], (err) => {
    if (err) return res.status(500).send(err);
    res.send('assignemnts updated successfully');
  });
});

// DELETE ass
app.delete('/assignemnts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM assignemnts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('assignemnts deleted successfully');
  });
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
});

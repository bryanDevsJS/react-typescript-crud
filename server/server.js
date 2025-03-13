import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

// Create an express application
const app = express();
app.use(cors());
app.use(express.json());

// Create a database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_crud'
    });

// SQL query to select all students
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Server connection error" });
        return res.json(result);
    });

});

// SQL query to insert a student
app.post('/student', (req, res) => {
    const sql = "INSERT INTO students (`name`, `email`) VALUES (?)";
    const studentValues = [
        req.body.name,
        req.body.email
    ]

    db.query(sql, [studentValues], (err, result) => {
        if (err) return res.json({ Message: "Server connection error" });
        return res.json({ Message: "Student inserted successfully" });
    });
});

// SQL query to select a student by id
app.get('/view-student/:id', (req, res) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Message: "Server connection error" });
        if (result.length > 0) {
            return res.json(result[0]); // Send the first (and only) object
        } else {
            return res.status(404).json({Message: "Student not found"});//send a 404 status, and a message.
        }
    });
});

// SQL query to update a student by id
app.put('/update-student/:id', (req, res) => {
    const sql = 'UPDATE students SET `name` = ?, `email` = ? WHERE id = ?';
    const studentValues = [
        req.body.name,
        req.body.email,
        req.params.id
    ]

    db.query(sql, studentValues, (err, result) => {
        if (err) return res.json({ Message: "Server connection error" });
        return res.json(result);
    });
});

// SQL query to delete a student by id
app.delete('/delete-student/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Message: "Server connection error" });
        return res.json({ Message: "Student deleted successfully" });
    });
});

// listen for a connection
app.listen(8081, () => {
    console.log('Server running on port 8081');
    });
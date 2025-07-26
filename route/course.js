const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/cou', (req, res) => {
    const query = 'SELECT * FROM course ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching course :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { CourseID, CourseName  } = req.body;
    const query = 'INSERT INTO course (CourseID, CourseName) VALUES (?, ?)';
    
    db.query(query, [CourseID, CourseName ], (err, results) => {
        if (err) {
            console.error('Error inserting course:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'course added successfully', id: results.insertId });
    });
});


module.exports = router;
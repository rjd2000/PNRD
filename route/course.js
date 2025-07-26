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
router.delete('/cc/:CourseID', (req, res) => {
    const { CourseID } = req.params;
    const query = 'DELETE FROM course WHERE CourseID = ?';

    db.query(query, [CourseID], (err, results) => {
        if (err) {
            console.error('Error deleting course:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    });
});


module.exports = router;
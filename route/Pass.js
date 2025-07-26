const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/pa', (req, res) => {
    const query = 'SELECT * FROM Pass';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Pass :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { Password,Email } = req.body;
    const query = 'INSERT INTO Pass (Password,Email) VALUES (?, ?)';

    db.query(query, [Password,Email], (err, results) => {
        if (err) {
            console.error('Error inserting Pass:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Pass added successfully', id: results.insertId });
    });
});
module.exports = router;
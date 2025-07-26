const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/dis', (req, res) => {
    const query = 'SELECT * FROM district';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching districts:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { DistrictID , DistrictName  } = req.body;
    const query = 'INSERT INTO district (DistrictID , DistrictName) VALUES (?, ?)';
    
    db.query(query, [DistrictID , DistrictName ], (err, results) => {
        if (err) {
            console.error('Error inserting district:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'district added successfully', id: results.insertId });
    });
});


module.exports = router;
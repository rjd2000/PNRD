const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/ca', (req, res) => {
    const query = 'SELECT * FROM caste ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching caste :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.post('/cc', (req, res) => {
    const { CasteID, CasteName } = req.body;
    const query = 'INSERT INTO caste (CasteID, CasteName) VALUES (?, ?)';
    
    db.query(query, [CasteID, CasteName], (err, results) => {
        if (err) {
            console.error('Error inserting caste:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Caste added successfully', id: results.insertId });
    });
});
module.exports = router;
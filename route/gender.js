const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/dis', (req, res) => {
    const query = 'SELECT * FROM gender ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching gender :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
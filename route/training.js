const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/tra', (req, res) => {
    const query = 'SELECT * FROM Training ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Training :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
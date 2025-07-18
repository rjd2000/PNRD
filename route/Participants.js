const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/par', (req, res) => {
    const query = 'SELECT * FROM participants';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching participants :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
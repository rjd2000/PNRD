const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/cat', (req, res) => {
    const query = 'SELECT * FROM category ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching category :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
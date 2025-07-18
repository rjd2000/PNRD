const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/pp', (req, res) => {
    const query = 'SELECT * FROM employeetype ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employeetype :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
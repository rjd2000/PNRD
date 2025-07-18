const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/tran', (req, res) => {
    const query = 'SELECT * FROM trainingtype ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching trainingtype :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
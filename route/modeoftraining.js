const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/mod', (req, res) => {
    const query = 'SELECT * FROM modeoftraining';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching modeoftraining :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})


module.exports = router;
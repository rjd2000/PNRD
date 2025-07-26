const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/fi', (req, res) => {
    const query = 'SELECT * FROM financialyear ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching financialyear :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { FinancialYearID , FinancialYear  } = req.body;
    const query = 'INSERT INTO financialyear (FinancialYearID , FinancialYear) VALUES (?, ?)';
    
    db.query(query, [FinancialYearID , FinancialYear ], (err, results) => {
        if (err) {
            console.error('Error inserting financialyear:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'financialyear added successfully', id: results.insertId });
    });
});


module.exports = router;
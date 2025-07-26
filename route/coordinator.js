const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/cor', (req, res) => {
    const query = 'SELECT * FROM coordinator ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching coordinator :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { CoordinatorID , EmployeeID   } = req.body;
    const query = 'INSERT INTO coordinator (CoordinatorID , EmployeeID ) VALUES (?, ?)';
    
    db.query(query, [CoordinatorID , EmployeeID ], (err, results) => {
        if (err) {
            console.error('Error inserting coordinator:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'coordinator added successfully', id: results.insertId });
    });
});



module.exports = router;
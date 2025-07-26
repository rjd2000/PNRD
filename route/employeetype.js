const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/eee', (req, res) => {
    const query = 'SELECT * FROM employeetype ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employeetype :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { EmployeeTypeID , EmployeeType  } = req.body;
    const query = 'INSERT INTO employeetype (EmployeeTypeID , EmployeeType) VALUES (?, ?)';
    
    db.query(query, [EmployeeTypeID , EmployeeType ], (err, results) => {
        if (err) {
            console.error('Error inserting employeetype:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'employeetype added successfully', id: results.insertId });
    });
});


module.exports = router;
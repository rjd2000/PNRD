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
router.delete('/cc/:EmployeeTypeID', (req, res) => {
    const { EmployeeTypeID } = req.params;
    const query = 'DELETE FROM employeetype WHERE EmployeeTypeID = ?';

    db.query(query, [EmployeeTypeID], (err, results) => {
        if (err) {
            console.error('Error deleting employeetype:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee type not found' });
        }
        res.status(200).json({ message: 'Employee type deleted successfully' });
    });
});


module.exports = router;
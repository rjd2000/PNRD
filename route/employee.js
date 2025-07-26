const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/em', (req, res) => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { EmployeeID , EmployeeName,DesignationID ,Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID  } = req.body;
    const query = 'INSERT INTO employee (EmployeeID , EmployeeName,DesignationID ,Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [EmployeeID , EmployeeName,DesignationID ,Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID ], (err, results) => {
        if (err) {
            console.error('Error inserting category:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'category added successfully', id: results.insertId });
    });
});


module.exports = router;
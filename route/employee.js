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
    const { EmployeeID, EmployeeName, DesignationID, Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID } = req.body;
    const query = 'INSERT INTO employee (EmployeeID, EmployeeName, DesignationID, Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [EmployeeID, EmployeeName, DesignationID, Contact,Email,Qualification,AreaOfSpecialization,Photographs,EmployeeTypeID ], (err, results) => {
        if (err) {
            console.error('Error inserting employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Employee added successfully', id: results.insertId });
    });
});

router.delete('/cc/:EmployeeID', (req, res) => {
    const { EmployeeID } = req.params;
    const query = 'DELETE FROM employee WHERE EmployeeID = ?';

    db.query(query, [EmployeeID], (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
});

router.put('/cd/:EmployeeID', (req, res) => {
    const { EmployeeID } = req.params;
    const { EmployeeName, DesignationID, Contact, Email, Qualification, AreaOfSpecialization, Photographs, EmployeeTypeID } = req.body;
    
    if (!EmployeeName) {
        return res.status(400).json({ error: 'EmployeeName is required' });
    }
    
    let query = 'UPDATE employee SET ';
    let values = [];
    let updateFields = [];
    
    if (EmployeeName) {
        updateFields.push('EmployeeName = ?');
        values.push(EmployeeName);
    }
    if (DesignationID) {
        updateFields.push('DesignationID = ?');
        values.push(DesignationID);
    }
    if (Contact) {
        updateFields.push('Contact = ?');
        values.push(Contact);
    }
    if (Email) {
        updateFields.push('Email = ?');
        values.push(Email);
    }
    if (Qualification) {
        updateFields.push('Qualification = ?');
        values.push(Qualification);
    }
    if (AreaOfSpecialization) {
        updateFields.push('AreaOfSpecialization = ?');
        values.push(AreaOfSpecialization);
    }
    if (Photographs) {
        updateFields.push('Photographs = ?');
        values.push(Photographs);
    }
    if (EmployeeTypeID) {
        updateFields.push('EmployeeTypeID = ?');
        values.push(EmployeeTypeID);
    }
    
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    query += updateFields.join(', ') + ' WHERE EmployeeID = ?';
    values.push(EmployeeID);
    
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json({ 
            message: 'Employee updated successfully',
            updatedEmployee: { 
                EmployeeID, 
                EmployeeName,
                DesignationID: DesignationID || 'Not updated',
                Contact: Contact || 'Not updated',
                Email: Email || 'Not updated',
                Qualification: Qualification || 'Not updated',
                AreaOfSpecialization: AreaOfSpecialization || 'Not updated',
                Photographs: Photographs || 'Not updated',
                EmployeeTypeID: EmployeeTypeID || 'Not updated'
            }
        });
    });
});


module.exports = router;
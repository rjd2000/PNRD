const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/raj', (req, res) => {
    const query = 'SELECT * FROM centre';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching centers:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    }); 
});

router.get('/specificCenter', (req, res) => {
    const query = 'SELECT * FROM centre WHERE CentreName = ?'; 
    const centerName = req.query.name; 
    db.query(query, [centerName], (err, results) => {           
        if (err) {
            console.error('Error fetching specific center:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Center not found' });
        }
        res.json(results[0]); // Return the first matching center
    })
});


router.post('/ce', (req, res) => {
    const { CentreID ,CentreName,Address,FocalPersonEmployeeID } = req.body;
   
   const query = 'INSERT INTO centre ( CentreID ,CentreName,Address,FocalPersonEmployeeID  ) VALUES (?, ? , ?, ?)';
   
    
    db.query(query, [CentreID ,CentreName,Address,FocalPersonEmployeeID  ], (err, results) => {
        if (err) {
            console.error('Error inserting centre :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'centre added successfully', id: results.insertId });
    });
});
router.delete('/cc/:CentreID', (req, res) => {
    const { CentreID } = req.params;
    const query = 'DELETE FROM centre WHERE CentreID = ?';

    db.query(query, [CentreID], (err, results) => {
        if (err) {
            console.error('Error deleting center:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Center not found' });
        }
        res.status(200).json({ message: 'Center deleted successfully' });
    });
});
router.put('/cd/:CentreID', (req, res) => {
    const { CentreID } = req.params;
    const { CentreName, Address, FocalPersonEmployeeID } = req.body;
    
   
    if (!CentreName) {
        return res.status(400).json({ error: 'CentreName is required' });
    }
    
    if (FocalPersonEmployeeID && !Number.isInteger(Number(FocalPersonEmployeeID))) {
        return res.status(400).json({ error: 'Invalid FocalPersonEmployeeID format' });
    }
    
    let query = 'UPDATE centre SET ';
    let values = [];
    let updateFields = [];
    
    
    if (CentreName) {
        updateFields.push('CentreName = ?');
        values.push(CentreName);
    }
    if (Address) {
        updateFields.push('Address = ?');
        values.push(Address);
    }
    if (FocalPersonEmployeeID) {
        updateFields.push('FocalPersonEmployeeID = ?');
        values.push(FocalPersonEmployeeID);
    }
    
    
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    query += updateFields.join(', ') + ' WHERE CentreID = ?';
    values.push(CentreID);
    
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating center:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Center name already exists' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Center not found' });
        }
        
        res.status(200).json({ 
            message: 'Center updated successfully',
            updatedCenter: { 
                CentreID, 
                CentreName, 
                Address: Address || 'Not updated', 
                FocalPersonEmployeeID: FocalPersonEmployeeID || 'Not updated'
            }
        });
    });
});

module.exports = router;

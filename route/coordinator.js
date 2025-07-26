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
router.delete('/cc/:CoordinatorID', (req, res) => {
    const { CoordinatorID } = req.params;
    const query = 'DELETE FROM coordinator WHERE CoordinatorID = ?';

    db.query(query, [CoordinatorID], (err, results) => {
        if (err) {
            console.error('Error deleting coordinator:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Coordinator not found' });
        }
        res.status(200).json({ message: 'Coordinator deleted successfully' });
    });
});



module.exports = router;
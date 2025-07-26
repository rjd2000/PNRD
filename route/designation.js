const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/des', (req, res) => {
    const query = 'SELECT * FROM designation ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching designation :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { DesignationID ,Designation  } = req.body;
    const query = 'INSERT INTO designation (DesignationID ,Designation ) VALUES (?, ?)';
    
    db.query(query, [DesignationID ,Designation ], (err, results) => {
        if (err) {
            console.error('Error inserting designation:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'designation added successfully', id: results.insertId });
    });
});


module.exports = router;
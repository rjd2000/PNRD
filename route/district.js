const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/dis', (req, res) => {
    const query = 'SELECT * FROM district';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching districts:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { DistrictID, DistrictName } = req.body;
    const query = 'INSERT INTO district (DistrictID, DistrictName) VALUES (?, ?)';
    
    db.query(query, [DistrictID, DistrictName], (err, results) => {
        if (err) {
            console.error('Error inserting district:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'District added successfully', id: results.insertId });
    });
});

router.delete('/cc/:DistrictID', (req, res) => {
    const { DistrictID } = req.params;
    const query = 'DELETE FROM district WHERE DistrictID = ?';

    db.query(query, [DistrictID], (err, results) => {
        if (err) {
            console.error('Error deleting district:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'District not found' });
        }
        res.status(200).json({ message: 'District deleted successfully' });
    });
});


module.exports = router;
const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/ca', (req, res) => {
    const query = 'SELECT * FROM caste ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching caste :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { CasteID, CasteName } = req.body;
    const query = 'INSERT INTO caste (CasteID, CasteName) VALUES (?, ?)';
    
    db.query(query, [CasteID, CasteName], (err, results) => {
        if (err) {
            console.error('Error inserting caste:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Caste added successfully', id: results.insertId });
    });
});



router.delete('/cc/:CasteID', (req, res) => {
    const { CasteID } = req.params;
    const query = 'DELETE FROM caste WHERE CasteID = ?';

    db.query(query, [CasteID], (err, results) => {
        if (err) {
            console.error('Error deleting caste:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Caste not found' });
        }
        res.status(200).json({ message: 'Caste deleted successfully' });
    });
});
module.exports = router;
router.put('/cd/:CasteID', (req, res) => {
    const { CasteID } = req.params;
    const { CasteName } = req.body;
    
    if (!CasteName) {
        return res.status(400).json({ error: 'CasteName is required' });
    }
    
    const query = 'UPDATE caste SET CasteName = ? WHERE CasteID = ?';
    
    db.query(query, [CasteName, CasteID], (err, results) => {
        if (err) {
            console.error('Error updating caste:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Caste not found' });
        }
        
        res.status(200).json({ 
            message: 'Caste updated successfully',
            updatedCaste: { CasteID, CasteName }
        });
    });
});

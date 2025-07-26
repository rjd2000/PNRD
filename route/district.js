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
const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/fi', (req, res) => {
    const query = 'SELECT * FROM financialyear ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching financialyear :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.delete('/cc/:FinancialYearID', (req, res) => {
    const { FinancialYearID } = req.params;
    const query = 'DELETE FROM financialyear WHERE FinancialYearID = ?';

    db.query(query, [FinancialYearID], (err, results) => {
        if (err) {
            console.error('Error deleting financialyear:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Financial year not found' });
        }
        res.status(200).json({ message: 'Financial year deleted successfully' });
    });
});


module.exports = router;
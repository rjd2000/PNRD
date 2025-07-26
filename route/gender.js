const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/gen', (req, res) => {
    const query = 'SELECT * FROM gender ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching gender :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.delete('/cc/:GenderID', (req, res) => {
    const { GenderID } = req.params;
    const query = 'DELETE FROM gender WHERE GenderID = ?';

    db.query(query, [GenderID], (err, results) => {
        if (err) {
            console.error('Error deleting gender:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'gender not found' });
        }
        res.status(200).json({ message: 'gender deleted successfully' });
    });
});









module.exports = router;
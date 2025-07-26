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
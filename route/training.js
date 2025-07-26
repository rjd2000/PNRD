const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/tee', (req, res) => {
    const query = 'SELECT * FROM Training ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Training :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.delete('/cc/:TrainingID', (req, res) => {
    const { TrainingID } = req.params;
    const query = 'DELETE FROM Training WHERE TrainingID = ?';

    db.query(query, [TrainingID], (err, results) => {
        if (err) {
            console.error('Error deleting Training:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.status(200).json({ message: 'Training deleted successfully' });
    });
});


module.exports = router;
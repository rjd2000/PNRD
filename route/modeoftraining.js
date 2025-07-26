const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/mod', (req, res) => {
    const query = 'SELECT * FROM modeoftraining ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching modeoftraining :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { TrainingModeID, TrainingModeName } = req.body;
    const query = 'INSERT INTO modeoftraining (TrainingModeID, TrainingModeName) VALUES (?, ?)';
    
    db.query(query, [TrainingModeID, TrainingModeName], (err, results) => {
        if (err) {
            console.error('Error inserting modeoftraining:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Mode of training added successfully', id: results.insertId });
    });
});

router.delete('/cc/:TrainingModeID', (req, res) => {
    const { TrainingModeID } = req.params;
    const query = 'DELETE FROM modeoftraining WHERE TrainingModeID = ?';

    db.query(query, [TrainingModeID], (err, results) => {
        if (err) {
            console.error('Error deleting modeoftraining:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mode of training not found' });
        }
        res.status(200).json({ message: 'Mode of training deleted successfully' });
    });
});



module.exports = router;
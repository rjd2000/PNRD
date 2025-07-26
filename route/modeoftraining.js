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
    const { TrainingModeID,TrainingModeName } = req.body;
    const query = 'INSERT INTO modeoftraining (TrainingModeID,TrainingModeName) VALUES (?, ?)';
    
    db.query(query, [TrainingModeID,TrainingModeName ], (err, results) => {
        if (err) {
            console.error('Error inserting modeoftraining:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'modeoftraining added successfully', id: results.insertId });
    });
});


module.exports = router;
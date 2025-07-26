const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/tran', (req, res) => {
    const query = 'SELECT * FROM trainingtype ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching trainingtype :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { TrainingTypeID, TrainingTypeName } = req.body;
    const query = 'INSERT INTO trainingtype (TrainingTypeID, TrainingTypeName) VALUES (?, ?)';
    
    db.query(query, [TrainingTypeID, TrainingTypeName], (err, results) => {
        if (err) {
            console.error('Error inserting trainingtype:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'trainingtype added successfully', id: results.insertId });
    });
});


module.exports = router;
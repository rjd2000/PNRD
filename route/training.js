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
router.post('/ch', (req, res) => {
    const { TrainingID, TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID  } = req.body;
    const query = 'INSERT INTO Training (TrainingID, TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [TrainingID, TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID ], (err, results) => {
        if (err) {
            console.error('Error inserting Training:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Training added successfully', id: results.insertId });
    });
});


module.exports = router;
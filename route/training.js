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
    const { TrainingID,TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID } = req.body;
    const query = 'INSERT INTO Training (TrainingID,TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [TrainingID,TrainingTitle,StartDate,EndDate,CourseID,TargetedNosOfParticipant,TypeOfTraining,ModeOfTraining,CoordinatorID,CentreID,FinancialYearID], (err, results) => {
        if (err) {
            console.error('Error inserting Training:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Training added successfully', id: results.insertId });
    });
});


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
router.put('/cd/:TrainingID', (req, res) => {
    const { TrainingID } = req.params;
    const { TrainingTitle, StartDate, EndDate, CourseID, TargetedNosOfParticipant, 
            TypeOfTraining, ModeOfTraining, CoordinatorID, CentreID, FinancialYearID } = req.body;
    
    if (!TrainingTitle) {
        return res.status(400).json({ error: 'TrainingTitle is required' });
    }
    
    let query = 'UPDATE Training SET ';
    let values = [];
    let updateFields = [];
    
    if (TrainingTitle) {
        updateFields.push('TrainingTitle = ?');
        values.push(TrainingTitle);
    }
    if (StartDate) {
        updateFields.push('StartDate = ?');
        values.push(StartDate);
    }
    if (EndDate) {
        updateFields.push('EndDate = ?');
        values.push(EndDate);
    }
    if (CourseID) {
        updateFields.push('CourseID = ?');
        values.push(CourseID);
    }
    if (TargetedNosOfParticipant) {
        updateFields.push('TargetedNosOfParticipant = ?');
        values.push(TargetedNosOfParticipant);
    }
    if (TypeOfTraining) {
        updateFields.push('TypeOfTraining = ?');
        values.push(TypeOfTraining);
    }
    if (ModeOfTraining) {
        updateFields.push('ModeOfTraining = ?');
        values.push(ModeOfTraining);
    }
    if (CoordinatorID) {
        updateFields.push('CoordinatorID = ?');
        values.push(CoordinatorID);
    }
    if (CentreID) {
        updateFields.push('CentreID = ?');
        values.push(CentreID);
    }
    if (FinancialYearID) {
        updateFields.push('FinancialYearID = ?');
        values.push(FinancialYearID);
    }
    
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    query += updateFields.join(', ') + ' WHERE TrainingID = ?';
    values.push(TrainingID);
    
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating training:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Training not found' });
        }
        
        res.status(200).json({ 
            message: 'Training updated successfully',
            updatedTraining: { 
                TrainingID,
                TrainingTitle,
                StartDate: StartDate || 'Not updated',
                EndDate: EndDate || 'Not updated',
                CourseID: CourseID || 'Not updated',
                TargetedNosOfParticipant: TargetedNosOfParticipant || 'Not updated',
                TypeOfTraining: TypeOfTraining || 'Not updated',
                ModeOfTraining: ModeOfTraining || 'Not updated',
                CoordinatorID: CoordinatorID || 'Not updated',
                CentreID: CentreID || 'Not updated',
                FinancialYearID: FinancialYearID || 'Not updated'
            }
        });
    });
});

module.exports = router;
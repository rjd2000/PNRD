const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/par', (req, res) => {
    const query = 'SELECT * FROM Participants';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Participants :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { ParticipationID ,Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID } = req.body;
    const query = 'INSERT INTO Participants (ParticipationID ,Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [ParticipationID ,Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID], (err, results) => {
        if (err) {
            console.error('Error inserting Participants:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Participants added successfully', id: results.insertId });
    });


router.delete('/cc/:ParticipationID', (req, res) => {
    const { ParticipationID } = req.params;
    const query = 'DELETE FROM Participants WHERE ParticipationID = ?';

    db.query(query, [ParticipationID], (err, results) => {
        if (err) {
            console.error('Error deleting Participants:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Participants not found' });
        }
        res.status(200).json({ message: 'Participants deleted successfully' });
    });
});


module.exports = router;
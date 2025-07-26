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
    const { ParticipationID, Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID } = req.body;
    const query = 'INSERT INTO Participants (ParticipationID, Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [ParticipationID, Name,CategoryID,SubCategory,Organization,DistrictID,Block,GaonPanchayat,GenderID,CasteID,Phone,EmailID,TrainingID ], (err, results) => {
        if (err) {
            console.error('Error inserting Participants:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Participants added successfully', id: results.insertId });
    });
});


module.exports = router;
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
router.put('/cd/:ParticipationID', (req, res) => {
    const { ParticipationID } = req.params;
    const { Name, CategoryID, SubCategory, Organization, DistrictID, Block, GaonPanchayat, GenderID, CasteID, Phone, EmailID, TrainingID } = req.body;
    
    if (!Name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    
    let query = 'UPDATE Participants SET ';
    let values = [];
    let updateFields = [];
    
    if (Name) {
        updateFields.push('Name = ?');
        values.push(Name);
    }
    if (CategoryID) {
        updateFields.push('CategoryID = ?');
        values.push(CategoryID);
    }
    if (SubCategory) {
        updateFields.push('SubCategory = ?');
        values.push(SubCategory);
    }
    if (Organization) {
        updateFields.push('Organization = ?');
        values.push(Organization);
    }
    if (DistrictID) {
        updateFields.push('DistrictID = ?');
        values.push(DistrictID);
    }
    if (Block) {
        updateFields.push('Block = ?');
        values.push(Block);
    }
    if (GaonPanchayat) {
        updateFields.push('GaonPanchayat = ?');
        values.push(GaonPanchayat);
    }
    if (GenderID) {
        updateFields.push('GenderID = ?');
        values.push(GenderID);
    }
    if (CasteID) {
        updateFields.push('CasteID = ?');
        values.push(CasteID);
    }
    if (Phone) {
        updateFields.push('Phone = ?');
        values.push(Phone);
    }
    if (EmailID) {
        updateFields.push('EmailID = ?');
        values.push(EmailID);
    }
    if (TrainingID) {
        updateFields.push('TrainingID = ?');
        values.push(TrainingID);
    }
    
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    query += updateFields.join(', ') + ' WHERE ParticipationID = ?';
    values.push(ParticipationID);
    
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating participant:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        
        res.status(200).json({ 
            message: 'Participant updated successfully',
            updatedParticipant: { 
                ParticipationID,
                Name,
                CategoryID: CategoryID || 'Not updated',
                SubCategory: SubCategory || 'Not updated',
                Organization: Organization || 'Not updated',
                DistrictID: DistrictID || 'Not updated',
                Block: Block || 'Not updated',
                GaonPanchayat: GaonPanchayat || 'Not updated',
                GenderID: GenderID || 'Not updated',
                CasteID: CasteID || 'Not updated',
                Phone: Phone || 'Not updated',
                EmailID: EmailID || 'Not updated',
                TrainingID: TrainingID || 'Not updated'
            }
        });
    });
});



module.exports = router;
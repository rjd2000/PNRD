const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/pa', (req, res) => {
    const query = 'SELECT * FROM Pass';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Pass :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.post('/ch', (req, res) => {
    const { Password,Email } = req.body;
    const query = 'INSERT INTO Pass (Password,Email) VALUES (?, ?)';

    db.query(query, [Password,Email], (err, results) => {
        if (err) {
            console.error('Error inserting Pass:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Pass added successfully', id: results.insertId });
    });
});
router.delete('/cc/:Password', (req, res) => {
    const { Password } = req.params;
    const query = 'DELETE FROM Pass WHERE Password = ?';

    db.query(query, [Password], (err, results) => {
        if (err) {
            console.error('Error deleting Pass:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        res.status(200).json({ message: 'Pass deleted successfully' });
    });
});
router.put('/cd/:Password', (req, res) => {
    const { Password } = req.params;
    const { Email } = req.body;

    if (!Email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'UPDATE Pass SET Email = ? WHERE Password = ?';

    db.query(query, [Email, Password], (err, results) => {
        if (err) {
            console.error('Error updating Pass:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pass not found' });
        }
        res.status(200).json({ message: 'Pass updated successfully' });
    });
});
module.exports = router;
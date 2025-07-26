const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/des', (req, res) => {
    const query = 'SELECT * FROM designation ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching designation :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})
router.delete('/cc/:DesignationID', (req, res) => {
    const { DesignationID } = req.params;
    const query = 'DELETE FROM designation WHERE DesignationID = ?';

    db.query(query, [DesignationID], (err, results) => {
        if (err) {
            console.error('Error deleting designation:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Designation not found' });
        }
        res.status(200).json({ message: 'Designation deleted successfully' });
    });
});


module.exports = router;
const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/eee', (req, res) => {
    const query = 'SELECT * FROM employeetype ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employeetype :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.delete('/cc/:EmployeeTypeID', (req, res) => {
    const { EmployeeTypeID } = req.params;
    const query = 'DELETE FROM employeetype WHERE EmployeeTypeID = ?';

    db.query(query, [EmployeeTypeID], (err, results) => {
        if (err) {
            console.error('Error deleting employeetype:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee type not found' });
        }
        res.status(200).json({ message: 'Employee type deleted successfully' });
    });
});


module.exports = router;
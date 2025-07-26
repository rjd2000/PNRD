const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/em', (req, res) => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.delete('/cc/:EmployeeID', (req, res) => {
    const { EmployeeID } = req.params;
    const query = 'DELETE FROM employee WHERE EmployeeID = ?';

    db.query(query, [EmployeeID], (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
});


module.exports = router;
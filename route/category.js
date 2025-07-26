const express = require('express');
const db = require('../database');
const router = express.Router();
 
router.get('/cat', (req, res) => {
    const query = 'SELECT * FROM category ';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching category :', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
})

router.post('/ch', (req, res) => {
    const { CategoryID, CategoryName  } = req.body;
    const query = 'INSERT INTO category (CategoryID, CategoryName) VALUES (?, ?)';
    
    db.query(query, [CategoryID, CategoryName ], (err, results) => {
        if (err) {
            console.error('Error inserting category:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'category added successfully', id: results.insertId });
    });
});
router.delete('/cc/:CategoryID ', (req, res) => {
    const { CasteID } = req.params;
    const query = 'DELETE FROM category WHERE CategoryID  = ?';

    db.query(query, [CasteID], (err, results) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'category deleted successfully' });
    });
});


module.exports = router;
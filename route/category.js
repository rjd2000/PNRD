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


module.exports = router;
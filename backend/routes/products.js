const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const router = express.Router();

router.get('/', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '..', 'Sample data_checkers.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

module.exports = router;

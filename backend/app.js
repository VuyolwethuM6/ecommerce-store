const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Fallback to index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

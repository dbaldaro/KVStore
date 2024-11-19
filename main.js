const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let keyValueStore = {};

app.use(express.json());

// Get a value by key
app.get('/get/:key', (req, res) => {
    const { key } = req.params;
    if (key in keyValueStore) {
        res.json({ key, value: keyValueStore[key] });
    } else {
        res.status(404).json({ error: "Key not found" });
    }
});

// Set a key/value pair
app.post('/set', (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ error: "Key and value are required" });
    }
    keyValueStore[key] = value;
    res.json({ success: true });
});

// Delete a key
app.delete('/delete/:key', (req, res) => {
    const { key } = req.params;
    if (key in keyValueStore) {
        delete keyValueStore[key];
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Key not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Key/Value Store app running on port ${PORT}`);
});

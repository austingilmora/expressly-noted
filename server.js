const express = require('express');
const path = require('path');
let notes = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.use('/', htmlRoutes);

app.get('/api/notes', (req, res) => {
    let results = notes;
    
    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    notes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, '\t'));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, '\t'));
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})
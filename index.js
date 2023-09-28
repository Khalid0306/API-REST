const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/carnet-adresses');

app.get('/', (req, res) => {
    res.send('ok');
});

app.use('/contacts', contactRoutes);

app.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Erreur interne du serveur");
})

app.listen(3000, () => {
    console.log('Application lancée sur le port 3000');
});
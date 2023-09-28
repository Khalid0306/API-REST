const Contact = require('../models/contactSchema');
const catchAsync = require('../helpers/catchAsync');
const mongoose = require('mongoose');

//Rajouter de la sécurité sur les requetes vers la base de donnée 

const create = catchAsync(async (req, res) => {

    const contact = await Contact.create(req.body);
    res.send(contact);

});

const getAll = catchAsync(async (req, res) => {

    const contacts = await Contact.find();
    res.send(contacts);

});

const getById = catchAsync(async (req, res) => {

    const { id } = req.params
    try {
        new mongoose.Types.ObjectID(id);
    } catch (error) {
        console.log(error);
        console.log("Catch erreur de conversion ObjectId");
        return res.status(400)
        .send("Format de l'ID invalide")
    }

    const contactById = await Contact.findById(id);
    if (contactById) {
        res.send(contactById);
    } else {
        res.status(404)
        .send("Contact introuvable");
    }
    

});

const updateById = catchAsync(async (req, res) => {

    const contactsUpdate = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (contactsUpdate) {
        res.send(contactsUpdate);
    } else {
        res.status(404)
        .send("Contact introuvable");
    }

});

const deleteById = catchAsync(async (req, res) => {

    const contactsDelete = await Contact.findByIdAndDelete(req.params.id, {new: true});
    console.log("contact supprimé: ", contactsDelete);
    if (contactsDelete) {
        res.send(contactsDelete);
    } else {
        res.status(404)
        .send("Contact introuvable");
    }

});

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}
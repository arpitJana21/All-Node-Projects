const express = require('express');
const {NoteModel} = require('../model/note.model.js');
const noteRouter = express.Router();
const {auth} = require('../middleware/auth.middleware.js');

noteRouter.post('/create', auth, createNoteLogic);
noteRouter.get('/', getAllNotesLogic);
noteRouter.patch('/update/:noteID', auth, updateNoteLogic);
noteRouter.delete('/delete/:noteID', auth, deleteNoteLogic);

async function createNoteLogic(req, res) {
    // logic
}

async function getAllNotesLogic(req, res) {
    // Logic
}

async function updateNoteLogic(req, res) {
    // Logic
}

async function deleteNoteLogic(req, res) {
    // Logic
}

module.exports = {noteRouter};

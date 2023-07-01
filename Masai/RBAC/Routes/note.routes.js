const express = require('express');
const {NoteModel} = require('../model/note.model.js');

const noteRouter = express.Router();
const {auth} = require('../middleware/auth.middleware.js');
const {authz} = require('../middleware/authz.middleware.js');

noteRouter.get('/', auth, authz(["User", "Admin"]), getAllNotesLogic);
noteRouter.post('/create', auth, authz(["Admin"]), createNoteLogic);
noteRouter.patch('/update/:noteID', auth, authz(["Admin"]), updateNoteLogic);
noteRouter.delete('/delete/:noteID', auth, authz(["Admin"]), deleteNoteLogic);

async function getAllNotesLogic(req, res) {
    try {
        const notes = await NoteModel.find({userID: req.body.userID});
        res.status(200).json({
            status: 'ok',
            notes: notes,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function createNoteLogic(req, res) {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        return res.status(200).json({
            status: 'ok',
            message: 'New Note has been added',
            note: note,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function updateNoteLogic(req, res) {
    try {
        const noteID = req.params.noteID;
        const note = await NoteModel.findOne({_id: noteID});
        if (note.userID !== req.body.userID)
            throw new Error('Unauthorized User');
        await NoteModel.findByIdAndUpdate({_id: noteID}, req.body);
        const updatedNote = await NoteModel.findOne({_id: noteID});
        return res.status(200).json({
            status: 'ok',
            message: 'Note is Updataed Successfully',
            updatedNote: updatedNote,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function deleteNoteLogic(req, res) {
    try {
        const noteID = req.params.noteID;
        const note = await NoteModel.findOne({_id: noteID});
        if (note.userID !== req.body.userID)
            throw new Error('Unauthorized User');
        await NoteModel.findByIdAndDelete({_id: noteID});
        return res.status(200).json({
            status: 'ok',
            message: 'Note is Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

module.exports = {noteRouter};

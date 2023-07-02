const express = require('express');
const {HotelModel} = require('../model/hotel.model.js');

const hotelRouter = express.Router();
const {auth} = require('../middleware/auth.middleware.js');

// GET /hotels: Returns a list of all the hotels.
hotelRouter.get('/', auth, getAllHotelLogic);

// POST /hotels/add: Creates a new hotel.
hotelRouter.post('/add', auth, addHotelLogic);

// GET /hotels/:id: Returns a specific hotel.
hotelRouter.get('/:id', auth, getHotelbyId);

// PUT/PATCH /hotels/update/:id: Updates a specific hotel.
hotelRouter.patch('/update/:id', auth, updatehotelByID);

// DELETE /hotels/del/:id: Deletes a specific hotel.
hotelRouter.delete('/delete/:id', auth, deleteHotelbyID);

async function deleteHotelbyID(req, res) {
    try {
        const hotelID = req.params.id;
        const hotel = await HotelModel.findOne({_id: hotelID});
        if (hotel.userID !== req.body.userID) {
            throw new Error('Unauthorized User');
        }

        await HotelModel.findByIdAndDelete({_id: hotelID});
        return res.status(200).json({
            status: 'ok',
            message: 'Hotel is Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function updatehotelByID(req, res) {
    try {
        const hotelID = req.params.id;
        const hotel = await HotelModel.findOne({_id: hotelID});
        if (hotel.userID !== req.body.userID) {
            throw new Error('Unauthorized User');
        }

        await HotelModel.findByIdAndUpdate({_id: hotelID}, req.body);
        const updatedHotel = await HotelModel.findOne({_id: hotelID});
        return res.status(200).json({
            status: 'ok',
            message: 'Hotel is Updataed Successfully',
            updatedNote: updatedHotel,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function getHotelbyId(req, res) {
    const hotelID = req.params.id;
    console.log(hotelID);
    try {
        const hotels = await HotelModel.find({
            userID: req.body.userID,
            _id: hotelID,
        });
        return res.status(200).json({
            status: 'success',
            hotels: hotels,
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
}

async function addHotelLogic(req, res) {
    try {
        console.log(req.body);
        const newHotel = new HotelModel(req.query);
        await newHotel.save();
        return res.status(200).json({
            status: 'success',
            message: 'new hotel added',
            hotel: newHotel,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}

async function getAllHotelLogic(req, res) {
    try {
        const hotels = await HotelModel.find({userID: req.body.userID});
        return res.status(200).json({
            status: 'success',
            hotels: hotels,
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
}

module.exports = {hotelRouter};

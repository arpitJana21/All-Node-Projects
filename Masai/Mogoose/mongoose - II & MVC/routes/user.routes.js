const express = require('express');
const {UserModel} = require('../model/user.model.js');
const userRouter = express.Router();

// Read
userRouter.route('/').get(async function (req, res) {
    try {
        const users = await UserModel.find(req.query);
        return res.status(200).json({status: 'success', users: users});
    } catch (error) {
        res.status(400).json({status: 'fail', error: error.message});
    }
});

// Create
userRouter.route('/add').post(async function (req, res) {
    try {
        const user = new UserModel(req.body);
        await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'A new user has been added',
            user: req.body,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

// Update
userRouter.route('/update/:userID').patch(async function (req, res) {
    const {userID} = req.params;
    try {
        await UserModel.findByIdAndUpdate({_id: userID}, req.body);
        const updatedUser = await UserModel.find({_id: userID});
        return res.status(200).json({
            status: 'success',
            message: 'User has been updated',
            user: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

// Delete
userRouter.route('/delete/:userID').delete(async function (req, res) {
    const {userID} = req.params;
    try {
        const deletedUser = await UserModel.find({_id: userID});
        await UserModel.findByIdAndDelete({_id: userID});
        return res.status(200).json({
            status: 'success',
            message: 'user has been deleted',
            user: deletedUser,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

/**
DELETE /books/delete/:id <Restricted Route>
A user has to be authenticated to access this route.
A user should be able to delete any book whose id has been passed as param
*/



module.exports = {userRouter};
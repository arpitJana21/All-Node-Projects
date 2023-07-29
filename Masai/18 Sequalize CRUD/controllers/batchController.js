const {Batch} = require('../models/batch.js');

const getAllBatches = async function (req, res) {
    try {
        const batches = await Batch.findAll();
        res.status(200).json({
            status: 'success',
            batches: batches,
        });
    } catch (error) {
        res.status(400).jons({
            status: 'fail',
            error: error.message,
        });
    }
};

const createBatch = async function (req, res) {
    const {title} = req.body;
    try {
        const batch = await Batch.create({title});
        res.status(200).json({
            status: 'success',
            message: 'Batch Created Successfully',
            batch: batch,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateBatch = async function (req, res) {
    const {id} = req.params;
    const {title} = req.body;
    try {
        await Batch.update({title}, {where: {id: id}});
        const updatedBatch = await Batch.findByPk(id);
        res.status(200).json({
            status: 'success',
            message: 'Batch Updated Successfully',
            updatedBatch: updatedBatch,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteBatch = async function (req, res) {
    const {id} = req.params;
    try {
        await Batch.destroy({where: {id}});
        res.status(200).json({
            status: 'success',
            message: 'Batch Deleted Successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    updateBatch,
    deleteBatch,
};

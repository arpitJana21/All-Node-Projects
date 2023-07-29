const express = require('express');
const batchController = require('../controllers/batchController.js');

const batchRouter = express.Router();

batchRouter.get('/', batchController.getAllBatches);
batchRouter.post('/', batchController.createBatch);
batchRouter.patch('/:id', batchController.updateBatch);
batchRouter.delete('/:id', batchController.deleteBatch);

module.exports = {batchRouter};

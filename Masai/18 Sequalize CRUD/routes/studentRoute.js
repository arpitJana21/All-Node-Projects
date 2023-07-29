const express = require('express');
const studentController = require('../controllers/studentController.js');

const studentRouter = express.Router();

studentRouter.get('/', studentController.getAllStudents);
studentRouter.post('/', studentController.createStudent);
studentRouter.patch('/:id', studentController.updateStudent);
studentRouter.delete('/:id', studentController.deleteStudent);

module.exports = {studentRouter};

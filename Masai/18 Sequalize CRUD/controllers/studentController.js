const {Student} = require('../models/student.js');
const {Batch} = require('../models/batch.js');

const getAllStudents = async function (req, res) {
    try {
        const students = await Student.findAll({
            include: [Batch],
        });

        return res.status(200).json({
            status: 'success',
            students: students,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const createStudent = async function (req, res) {
    const {name, email, batchID} = req.body;
    try {
        const student = await Student.create({name, email, batchID});
        return res.status(200).json({
            status: 'success',
            message: 'Student Created Successfully',
            student: student,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateStudent = async function (req, res) {
    const {id} = req.params;
    const {name, email, batchID} = req.body;

    try {
        await Student.update({name, email, batchID}, {where: {id: id}});
        const updatedStudent = await Student.findByPk(id);
        return res.status(200).json({
            status: 'success',
            message: 'Student Updated Successfully',
            updatedStudent: updatedStudent,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteStudent = async function (req, res) {
    const {id} = req.params;
    try {
        await Student.destroy({where: {id: id}});
        return res.status(200).json({
            status: 'success',
            message: 'Student Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};

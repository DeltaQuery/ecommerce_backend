const studentModel = require("../models/Student")
const customerModel = require("../models/Customer")

const objectController = "Student"

exports.findAll = async (req, res) => {
    await studentModel.find({}).populate(['REPRESENTANTE', 'FACTURAS'])
        .then(students => {
            res.json(students)
        })
}

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await studentModel.findById(id)
        .then(student => {
            if (student) return res.json(student)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

exports.addStudent = async (req, res, next) => {
    try {
        const newStudent = new studentModel(req.body)
        const savedStudent = await newStudent.save()

        await populateCustomer(savedStudent.REPRESENTANTE, savedStudent._id)

        res.status(201).json({
            message: `${objectController} saved!`,
            data: savedStudent
        })
    } catch (err) {
        next(err)
    }
}

exports.updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const originalStudent = await studentModel.findById(id)
        const updatedStudent = await studentModel.findByIdAndUpdate(id, req.body, { new: true })

        if (originalStudent.REPRESENTANTE !== updatedStudent.REPRESENTANTE) {
            await depopulateCustomer(originalStudent.REPRESENTANTE, id)
            await populateCustomer(updatedStudent.REPRESENTANTE, id)
        }

        res.status(200).json({
            message: `${objectController} updated!`,
            data: updatedStudent
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await studentModel.findByIdAndDelete(req.params.id)
        await depopulateCustomer(student.REPRESENTANTE, req.params.id)
        if (!student) res.status(404).send(`No ${objectController} found!`)
        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}

const depopulateCustomer = async (customerId, studentId) => {
    try {
            const customer = await customerModel.findById(customerId)

            if (customer != undefined) {
                const idIndex = customer.ESTUDIANTES.findIndex(id => {
                    return id == studentId
                  })
                customer.ESTUDIANTES.splice(idIndex, 1)
                customer.save()
            }
    } catch (err) {
        console.log(err)
    }
}

const populateCustomer = async (customerId, studentId) => {
    try {
        const customer = await customerModel.findById(customerId)

        if (customer != undefined && !customer.ESTUDIANTES.includes(studentId)) {
            customer.ESTUDIANTES.push(studentId)
            customer.save()
        }
    } catch (err) {
        console.log(err)
    }
}
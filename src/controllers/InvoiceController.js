const invoiceModel = require("../models/Invoice")
const studentModel = require("../models/Student")
const bcrypt = require("bcrypt")

const objectController = "Invoice"

exports.findAll = async (req, res) => {
    await invoiceModel.find({})
        .then(invoices => {
            res.json(invoices)
        })
} 

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await invoiceModel.findById(id)
        .then(invoice => {
            if (invoice) return res.json(invoice)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

exports.addInvoice = async (req, res, next) => {
    try {
        const newInvoice = new invoiceModel(req.body)
        const savedInvoice = await newInvoice.save()

        await populateStudent(savedInvoice.ID_ALUMNO, savedInvoice._id)

        res.status(201).json({
            message: `${objectController} saved!`,
            data: savedInvoice
        })
    } catch (err) {
        next(err)
    }
}

exports.updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const originalInvoice = await invoiceModel.findById(id)
        const updatedInvoice = await invoiceModel.findByIdAndUpdate(id, req.body, { new: true })

        if (originalInvoice.ID_ALUMNO !== updatedInvoice.ID_ALUMNO) {
            await depopulateStudent(originalInvoice.ID_ALUMNO, id)
            await populateStudent(updatedInvoice.ID_ALUMNO, id)
        }

        res.status(200).json({
            message: `${objectController} updated!`,
            data: updatedInvoice
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteInvoice = async (req, res, next) => {
    try {
        const invoice = await invoiceModel.findByIdAndDelete(req.params.id)
        await depopulateStudent(invoice.ID_ALUMNO, req.params.id)
        if (!invoice) res.status(404).send(`No ${objectController} found!`)
        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}

const depopulateStudent = async (studentId, invoiceId) => {
    try {
            const student = await studentModel.findById(studentId)

            if (student != undefined) {
                const idIndex = student.FACTURAS.findIndex(id => {
                    return id == invoiceId
                  })
                student.FACTURAS.splice(idIndex, 1)
                student.save()
            }
    } catch (err) {
        console.log(err)
    }
}

const populateStudent = async (studentId, invoiceId) => {
    try {
        const student = await studentModel.findById(studentId)

        if (student != undefined && !student.FACTURAS.includes(invoiceId)) {
            student.FACTURAS.push(invoiceId)
            student.save()
        }
    } catch (err) {
        console.log(err)
    }
}
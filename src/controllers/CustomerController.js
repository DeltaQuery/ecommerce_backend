const customerModel = require("../models/Customer")

const objectController = "Customer"

exports.findAll = async (req, res) => {
    await customerModel.find({}).populate("ESTUDIANTES")
        .then(customers => {
            res.json(customers)
        })
}

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await customerModel.findById(id)
        .then(customer => {
            if (customer) return res.json(customer)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

exports.addCustomer = async (req, res, next) => {
    try {
        const newCustomer = new customerModel(req.body)
        const savedCustomer = await newCustomer.save()

        res.status(201).json({
            message: `${objectController} saved!`,
            data: savedCustomer
        })
    } catch (err) {
        next(err)
    }
}

exports.updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const updatedCustomer = await customerModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            message: `${objectController} updated!`,
            data: updatedCustomer
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteCustomer = async (req, res, next) => {
    try {
        const customer = await customerModel.findByIdAndDelete(req.params.id)
        if (!customer) res.status(404).send(`No ${objectController} found!`)
        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}


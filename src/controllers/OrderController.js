const orderModel = require("../models/Order")

const objectController = "Order"

exports.findAll = async (req, res) => {
    await orderModel.find({})
        .then(orders => {
            res.json(orders)
        })
} 

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await orderModel.findById(id)
        .then(order => {
            if (order) return res.json(order)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

exports.addOrder = async (req, res, next) => {
    try {
        const newOrder = new orderModel(req.body)
        const savedOrder = await newOrder.save()

        res.status(201).json({
            message: `${objectController} saved!`,
            data: savedOrder
        })
    } catch (err) {
        next(err)
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const originalOrder = await orderModel.findById(id)
        const updatedOrder = await orderModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            message: `${objectController} updated!`,
            data: updatedOrder
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id)
        if (!order) res.status(404).send(`No ${objectController} found!`)
        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}
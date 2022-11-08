const productModel = require("../models/Product")

const objectController = "Product"

exports.findAll = async (req, res) => {
    await productModel.find({})
        .then(products => {
            res.json(products)
        })
}

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await productModel.findById(id)
        .then(product => {
            if (product) return res.json(product)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

exports.addProduct = async (req, res, next) => {
    try {
        const newProduct = new productModel(req.body)
        const savedProduct = await newProduct.save()

        res.status(201).json({
            message: `${objectController} saved!`,
            data: savedProduct
        })
    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            message: `${objectController} updated!`,
            data: updatedProduct
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        if (!product) res.status(404).send(`No ${objectController} found!`)
        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}


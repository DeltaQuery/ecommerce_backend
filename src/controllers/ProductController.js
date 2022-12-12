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

const populateModels = async (variantId, savedProduct) => {
    let variant = await productModel.findById(variantId)
    if (variant) {
        if (variant.models?.variants) {
            const index = variant.models.variants.findIndex(variant => variant._id === savedProduct._id)
            if (index < 0) {
                const element = { model: savedProduct.model, _id: savedProduct._id }
                variant.models.variants.push(element)
            }

            const associatedFromSaved = savedProduct.models?.variants.filter(product => (product._id !== savedProduct._id && product._id !== variantId))

            if (associatedFromSaved) {
                associatedFromSaved.forEach(function (product) {
                    variant.models.variants.push(product)
                })
            }
            variant.models.variants = getUniqueArr(variant.models.variants)
            await productModel.findByIdAndUpdate(variantId, variant, { new: true })
        }
    }
}

const depopulateModels = async (variantId, productId = undefined, deletedVariants = []) => {
    let variant = await productModel.findById(variantId)
    if (variant?.models?.variants) {
        let uniqueVariants = getUniqueArr(variant.models.variants)
        uniqueVariants = uniqueVariants.filter(({ _id }) => !deletedVariants.some(x => x._id == _id))

        variant.models.variants = uniqueVariants

        if (deletedVariants.length > 0) {
            const index = deletedVariants.findIndex(variant => variant._id === variantId)
            if (index >= 0) {
                variant.models.variants = []
            }
        } else if (productId !== undefined) {
            variant.models.variants = variant.models.variants.filter(product => product._id !== productId)
        }
        await productModel.findByIdAndUpdate(variantId, variant, { new: true })
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const newProduct = new productModel(req.body)
        const savedProduct = await newProduct.save()
        const variants = savedProduct.models?.variants
        if (variants) {
            variants.map(async (variant) => {
                await populateModels(variant._id, savedProduct)
            })
        }

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
        req.body._id = id
        if (!id) res.status(404).send(`No ${objectController} found!`)

        const originalProduct = await productModel.findById(id)
        const oldVariantsRaw = originalProduct.models?.variants
        const newVariantsRaw = req.body.models?.variants

        let oldVariants = getUniqueArr(oldVariantsRaw)
        let newVariants = getUniqueArr(newVariantsRaw)
        if (newVariants.length > 0) {
            newVariants.map(async (variant) => {
                if (variant.hasOwnProperty("_id")) {
                    await populateModels(variant._id, req.body)
                }
            })
        }

        const deletedVariants = oldVariants.filter(value => !newVariants.some(element => element._id === value._id))

        let allVariants = getUniqueArr(oldVariants.concat(newVariants))

        if (deletedVariants.length > 0) {
            allVariants.map(async (variant) => {
                await depopulateModels(variant._id, id, deletedVariants)
            })
        }

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
        const productId = req.params.id
        if (!productId) res.status(404).send(`No ${objectController} found!`)

        const originalProduct = await productModel.findById(productId)
        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) res.status(404).send(`No ${objectController} found!`)

        const variants = originalProduct.models?.variants
        if (variants) {
            variants.map(async (variant) => {
                await depopulateModels(variant._id, productId)
            })
        }

        res.status(200).send(`${objectController} deleted!`)
    } catch (err) {
        next(err)
    }
}

function getUniqueArr(arr) {
    if(arr !== undefined){
        if(arr.length > 0){
            const newArr = [...new Map(arr.map(item => [item._id, item])).values()]
            return newArr
        }
    }
     return []   
}
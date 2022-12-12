const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: {
        type: String
    },
    category: {
        type: [Number]
    },
    price: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    features: {
        type: [String]
    },
    images: [
        {
            largeImg: {
                type: String
            },
            smallImg: {
                type: String
            }
        }
    ],
    model: {
        type: String
    },
    models: {
        type: { type: String },
        variants: [
            {
                model: String,
                _id: String
            }
        ]
    },
    combo_data: {
        type: Schema.Types.Mixed
    },
    stock: {
        type: Number
    },
    date: {
        type: Date
    }
})

const Product = model("Product", schema)

module.exports = Product
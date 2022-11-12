const { Schema, model } = require("mongoose")

const productSchema = new Schema({
  NAME: {
    type: String,
    required: true
  },
  //Descripción general.
  DESCRIPTION: {
    type: Boolean,
    required: true
  },
  //Arr de Images. Al menos debe existir el index 0
  IMAGES: {
    type: [String],
    required: true
  },
  //Lista de features (¿Es necesario, teniendo ya descripción? Yo creo que no, la ropa no necesita features)
  FEATURES: {
    type: String,
    required: false
  },
  //Precio regular
  PRICE: {
    type: Number,
    required: true
  },
  //Precio de oferta, si hubiera. Opcional. Si existe, aparecerá.
  DEAL: {
    type: Number,
    required: false
  },
  //Tamaño. Si la prenda es talla única, se puede poner una U. Siempre es required. Precio y deal, solo si la talla tiene un precio especial, distinto al precio normal
  SIZE: {
    type: [
      {
        size: {
          type: [String],
          required: true
        },
        price: {
          type: [Number],
          required: false
        },
        deal: {
          type: [Number],
          required: false
        }
      }
    ],
    required: true
  },
  //Color. Es opcional. Si se coloca, indicar color. Precio y deal, solo si la talla tiene un precio especial, distinto al precio normal
  COLOR: {
    type: [
      {
        color: {
          type: [String],
          required: true
        },
        price: {
          type: [Number],
          required: false
        },
        deal: {
          type: [Number],
          required: false
        }
      }
    ],
    required: false
  },
  //Al quedar menos de X numero en stock, se pone alerta de que falta, y se puede usar para indicar un producto agotado
  STOCK: {
    type: Number,
    required: true
  },
  //Fecha de creación
  DATE: {
    type: Date,
    required: true
  }
})

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Product = model("Product", productSchema)

module.exports = Product
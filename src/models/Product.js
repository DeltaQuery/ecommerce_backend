const { Schema, model } = require("mongoose")

const productSchema = new Schema({
   /* CONCEPTO_PRODUCTO: {
      type: String,
      required: true
    },
    DESCRIPCION_PRODUCTO: {
      type: String,
      required: false
    },
    IVA_PRODUCTO: {
      type: Boolean,
      required: true
    },
    FECHA_REGISTRO: {
      type: String,
      required: true
    },
    REGISTRADO_POR: {
      type: String,
      required: true
    }*/
  }); 

productSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
    }
})

const Product = model("Product", productSchema)

module.exports = Product
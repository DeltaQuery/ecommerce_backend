const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    CONCEPTO_PRODUCTO: {
      type: String,
      required: true
    },
    PRECIO_PREESCOLAR: {
      type: Number,
      required: false
    },
    PRECIO_BASICA: {
      type: Number,
      required: false
    },
    ESCENARIO_PRODUCTO: {
      type: Number,
      required: true
    },
    TIPO_PRODUCTO: {
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
    ALICUOTA_IVA: {
      type: Number,
      required: false
    },
    PRONTO_PAGO_PREESCOLAR: {
      type: Number,
      required: true
    },
    PAGO_VENCIDO_PREESCOLAR: {
      type: Number,
      required: true
    },
    PRONTO_PAGO_BASICA: {
      type: Number,
      required: true
    },
    PAGO_VENCIDO_BASICA: {
      type: Number,
      required: true
    },
    FECHA_REGISTRO: {
      type: String,
      required: true
    },
    REGISTRADO_POR: {
      type: String,
      required: true
    }
  }); 

productSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
    }
})

const Product = model("Product", productSchema)

module.exports = Product
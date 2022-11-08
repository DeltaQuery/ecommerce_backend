const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    /*FECHA_REGISTRO: {
        type: String,
        required: true,
      },
      CODIGO_FACTURA: {
        type: Number,
      },
      ID_REPRESENTANTE: {
        type: String,
        required: true,
      },
      CIUDAD_CLIENTE: {
        type: String,
      },
      TIPO_CLIENTE: {
        type: String,
        required: true,
      },
      ID_CLIENTE: {
        type: Number,
        required: true,
      },
      NOMBRES_CLIENTE: {
        type: String,
        required: true,
      },
      DIRECCION_CLIENTE: {
        type: String,
        required: true,
      },
      TELEFONO_CLIENTE: {
        type: String,
        required: true,
      },
      CORREO_CLIENTE: {
        type: String,
        required: true,
      },
      ID_ALUMNO: {
        type: String,
        required: true,
      },
      NOMBRES_ALUMNO: {
        type: String,
        required: true,
      },
      APELLIDOS_ALUMNO: {
        type: String,
        required: true,
      },
      GRADO_ALUMNO: {
        type: String,
        required: true,
      },
      CONCEPTO_1: {
        type: Object,
        required: true,
      },
      MONTO_1_USD: {
        type: Number,
        required: true,
      },
      MONTO_1_BS: {
        type: Number,
        required: true,
      },
      MONTO_1_BCV: {
        type: Number,
        required: true,
      },
      CONCEPTO_2: {
        type: Object,
      },
      MONTO_2_USD: {
        type: Number,
      },
      MONTO_2_BS: {
        type: Number,
      },
      MONTO_2_BCV: {
        type: Number,
      },
      CONCEPTO_3: {
        type: Object,
      },
      MONTO_3_USD: {
        type: Number,
      },
      MONTO_3_BS: {
        type: Number,
      },
      MONTO_3_BCV: {
        type: Number,
      },
      CONCEPTO_4: {
        type: Object,
      },
      MONTO_4_USD: {
        type: Number,
      },
      MONTO_4_BS: {
        type: Number,
      },
      MONTO_4_BCV: {
        type: Number,
      },
      CONCEPTO_5: {
        type: Object,
      },
      MONTO_5_USD: {
        type: Number,
      },
      MONTO_5_BS: {
        type: Number,
      },
      MONTO_5_BCV: {
        type: Number,
      },
      TIPO_TRANSACCION: {
        type: String,
      },
      NO_TRANSACCION: {
        type: String,
      },
      EFECTIVO: {
        type: Number,
      },
      BANCO: {
        type: String,
      },
      SUBTOTAL_BS: {
        type: Number,
        required: true,
      },
      SUBTOTAL_USD: {
        type: Number,
        required: true,
      },
      IVA: {
        type: Boolean,
        required: true
      },
      ALICUOTA_IVA: {
        type: Number,
      },
      TOTAL_BS: {
        type: Number,
        required: true,
      },
      TOTAL_USD: {
        type: Number,
        required: true,
      },
      CREDITO_CONTADO: {
        type: String,
        required: true,
      },
      OBSERVACIONES: {
        type: String,
      },
      REGISTRADO_POR: {
        type: String,
        required: true,
      },
      ESTATUS: {
        type: Boolean,
        required: true,
      },*/
  })

orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
    }
})

const Order = model("Order", orderSchema)

module.exports = Order


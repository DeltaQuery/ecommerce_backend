const { Schema, model } = require("mongoose")

const customerSchema = new Schema({
    TIPO_REPRESENTANTE: {
        type: String,
        required: true
      },
      CEDULA_REPRESENTANTE: {
        type: Number,
        required: true
      },
      NOMBRES_REPRESENTANTE: {
        type: String,
        required: true,
      },
      DIRECCION_REPRESENTANTE: {
        type: String,
        required: true,
      },
      TELEFONO_REPRESENTANTE: {
        type: String,
        required: true,
      },
      CORREO_REPRESENTANTE: {
        type: String,
        required: true,
      },
      TIPO_CLIENTE: {
        type: String,
        required: true
      },
      ID_CLIENTE: {
        type: Number,
        required: true
      },
      NOMBRES_CLIENTE: {
        type: String,
        required: true
      },
      DIRECCION_CLIENTE: {
        type: String,
        required: true
      },
      TELEFONO_CLIENTE: {
        type: String,
        required: true
      },
      CORREO_CLIENTE: {
        type: String,
        required: true
      },
      FECHA_REGISTRO: {
        type: String,
        required: true
      },
      REGISTRADO_POR: {
        type: String,
        required: true
      },
      ESTATUS: {
        type: Boolean,
        required: true
      },
      ESTUDIANTES: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
      }]
  })

customerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
    }
})

const Customer = model("Customer", customerSchema)

module.exports = Customer
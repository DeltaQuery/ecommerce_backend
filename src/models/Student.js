const { Schema, model } = require("mongoose")

const studentSchema = new Schema({
    NOMBRES_ALUMNO: {
      type: String,
      required: true,
    },
    APELLIDOS_ALUMNO: {
      type: String,
      required: true,
    },
    TIPO_ALUMNO: {
      type: String,
      required: true
    },
    CEDULA_ALUMNO: {
      type: Number,
      required: false
    },
    GRADO_ALUMNO: {
      type: String,
      required: true
    },
    NIVEL_ALUMNO: {
      type: String,
      required: true
    },
    SEXO_ALUMNO: {
      type: Number,
      required: false
    },
    EDAD_ALUMNO: {
      type: Number,
      required: false
    },
    BECA_ALUMNO: {
      type: Boolean,
      required: true
    },
    DESC_ALUMNO: {
      type: Number,
      required: true
    },
    INICIO_COBRO: {
      type: Number,
      required: true
    },
    FINAL_COBRO: {
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
    },
    ESTATUS: {
      type: Boolean,
      required: true
    },
    FECHA_RETIRO: {
      type: Number,
      required: true
    },
    REPRESENTANTE: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true    
    },
    FACTURAS: [{
      type: Schema.Types.ObjectId,
      ref: "Invoice",  
    }]
  })

studentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
    }
})

const Student = model("Student", studentSchema)

module.exports = Student
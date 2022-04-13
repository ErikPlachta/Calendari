const { Schema, model } = require("mongoose");

const AppointmentFieldSchema = new Schema(
    {   
        field_name: {
            type: String,
            required: true
        }
    }
);

const Appointment_Field = model('Appointment_Field', AppointmentFieldSchema);

module.exports = Appointment_Field;
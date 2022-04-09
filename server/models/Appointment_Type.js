const { Schema, model } = require("mongoose");

const AppointmentTypeSchema = new Schema(
    {   
        business_id: {
            type: Schema.Types.ObjectId,
            ref: 'Business'
            //reference business model
        },
        appt_type_name: {
            type: String,
        },
        summary: {
            type: String,
            trim: true,
            length: 200,
        },
        appointment_duration: {
            type: String
        },
    }
)

const Appointment_Type = model('Appointment_Type', AppointmentTypeSchema);

module.exports = Appointment_Type;

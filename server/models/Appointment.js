const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema(
    {
        appt_type_id: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment_Type'
        },
        appointment_date: {
            type: String
        },
        appointment_time: {
            type: String
        },
        appointment_status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Canceled']
        }
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
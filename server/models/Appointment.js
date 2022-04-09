const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        business_id: {
            type: Schema.Types.ObjectId,
            ref: 'Business'
        },
        appt_type_id: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment_Type'
        },
        appointment_date: {
            type: Date
        },
        appointment_time: {
            type: Date
        },
        appointment_status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Canceled']
        }
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
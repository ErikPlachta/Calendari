const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema(
    {
        appt_type_name: {
            type: String
        },
        appt_type_summary: {
            type: String,
            length: 200
        },
        appt_type_notes: {
            type: String,
            length: 200
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
            //TODO:: 04/13/22 #EP || Change to lowercase, here. We'll capitalize in the frontend if needed.
        },
        timezone: {
            type: String
        },
        client_full_name: {
            type: String
        },
        client_email: {
            type: String
        }, 
        client_phone: {
            type: String
        },
        appt_notes: {
            type: String,
            length: 200
        }
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
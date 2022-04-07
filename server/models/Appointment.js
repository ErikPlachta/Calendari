/* All Existing Appointments */
const {Schema, model} = require("mongoose");

const AppointmentSchema = new Schema(
    {
        user_id: {
            type: String,
            //randomly generate string REFERENCE USER MODEL
        },
        business_id: {
            type: String,
            //randomly generate string
        },
        appointment_details: {
            name: {
                //1 or 2 hardcoded examples here, DO IN REACT
            },
            duration: {
                //1 hour and 2 hour?
            },
            date: {
            },
            start_time: {
            },
            end_time: {
            },
            //is universal time zone mvp?
        },
        client: {
            name: {
                type: Schema.Type.name_first,
                ref: 'User'
            },
            email: {
                type: Schema.Type.email,
                ref: 'User'
            },
            phone: {
                type: Schema.Type.phone,
                ref: 'User'
            },
            summary: {
                type: Schema.Type.summary,
                ref: 'User'
            },
            //is timezone mvp?
        },
        appointment_status: {
            //Scheduled, Completed, Cancelled. MODEL ISN'T CONCERNED WITH POST, PUT, DELETE
        },
        id: false
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
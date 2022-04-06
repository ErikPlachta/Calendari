/*
- ### Appointment
    - All Existing Appointments
    - Schema:
        - id
        - user_id
        - business_id
        - Appointment
            - Obj containing appointment details
            - Name
            - Duration
            - Date
            - Start Time
            - End Time
            - Universal time-zone
        - Client
            - Obj containing client details
            - Name
            - Email
            - Phone
            - Summary
            - timezone
        - status
            - Scheduled
            - Completed
            - Canceled
*/
const {Schema, model} = require("mongoose");

const AppointmentSchema = new Schema(
    {
        user_id: {
            
        },
        business_id: {

        },
        appointment_details: {
            name: {
                
            },
            duration: {

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

            },
            email: {

            },
            phone: {

            },
            summary: {

            },
            //is timezone mvp?
        },
        appointment_status: {
            
        },
        id: false
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
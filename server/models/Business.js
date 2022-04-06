/*
- ### Business
    - A Business is the parent of all users. A business has a primary account associated with it, contains Appointments, Contains Users, and contains a Calendar for managing Appointments based on user.
        - business_logo
        - Appointments_Type
            - Array
        - Appointments
            - Array
        - Users
            - Array
        - admin_user_id
*/

const {Schema, model} = require("mongoose");

const BusinessSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        brand_name: {
            type: String,
            required: true
        },
        settings: {
        //IS THIS MVP?
        },
        configuration: {
            //MVP??
        },
        Appointment_Type: [{
            ref: 'Appointment_Type'
        }],
        Appointments: [{
            ref: 'Appointment'
        }],
        Users: [{
            ref: 'Users'
        }],

        id:false
    }
)

const Business = model('Business', BusinessSchema);
module.exports = Business;
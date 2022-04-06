/*
- ### Business
    - A Business is the parent of all users. A business has a primary account associated with it, contains Appointments, Contains Users, and contains a Calendar for managing Appointments based on user.
        - _id
        - name
            - Internally your name
        - brand_name
            - What customers see
            - String
            - Required
        - business_logo
        - Settings
            - All account specific options
            - Obj
            - Relation
        - Configuration
            - Unique system-specific options
            - Obj
            - Relation
        - Appointments_Type
            - Array
            - Relation
        - Appointments
            - Array
            - Relation
        - Users
            - Array
            - Relation
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
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

const { Schema, model } = require("mongoose");

const BusinessSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        brand_name: {
            type: String,
            required: true,
            unique: true
        },
        // commenting these out until we know whether MVP or not
        // settings: {
        //     //IS THIS MVP?
        // },
        // configuration: {
        //     //MVP??
        // },
        Appointment_Types: [
            {
                type: Schema.Types.ObjectId,
                ref: 'AppointmentType'
            }
        ],
        Appointments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ],
        // Users: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Users'
        //     }
        // ] 
        // not sure if users is necessary under business?
        // id: false -- not sure why this one was set to false?
    }
)

const Business = model('Business', BusinessSchema);
module.exports = Business;
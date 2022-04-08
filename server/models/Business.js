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
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        configuration: {
            type: Object
        },
        appointment_types: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointment_Type'
            }
        ],
        appointments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ]
    }
)

const Business = model('Business', BusinessSchema);
module.exports = Business;
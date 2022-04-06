/*
- ### Appointment_Type
    - id
    - user_id
    - business_id
    - Appointment_Details
        - Obj containing appointment details
        - Name
        - Email
        - Phone
        - Summary
        - Duration
        - Date
        - Universal time-zone
        */
const {Schema, model} = require("mongoose");

const Appointment_TypeSchema = new Schema(
    {
        user_id: {
            type: Schema.Type.user_id,
            ref: 'User'
        },
        //what is the point of the business id?
        //i feel like the client model also needs to be included for the above information so going to include that!
        client_details: {
            type: Schema.Types.client,
            ref: 'Appointment'
        },
        appointment_details: {
            type: Schema.Types.appointment_details,
            ref: 'Appointment'
        },
        id: false
    }
)

const Appointment_Type = model('Appointment_Type', Appointment_TypeSchema);

module.exports = Appointment_Type
/*Appointment_Type */

const {Schema, model} = require("mongoose");

const Appointment_TypeSchema = new Schema(
    {
        appointment_id: {
            type: String,
            //randomly generate string
        },
        business_id: {
            type: String,
            //reference business model
        },
        user_id: {
            type: Schema.Type.user_id,
            ref: 'User'
        },
        client_details: {//this below format is probably incorrect but revisiting later with tutor!
            type: Schema.Types.name_first,
            ref: 'User',
            type: Schema.Types.email,
            ref:'User',
            type: Schema.Types.phone,
            ref: 'User'
        },
        summary: {
            type: String,
            trim: true,
            length: 200,
        },
        appointment_date: {
            //help
        },
        appointment_duration: {
            //help
        },
        //universal time zone mvp?

    }
)

const Appointment_Type = model('Appointment_Type', Appointment_TypeSchema);

module.exports = Appointment_Type
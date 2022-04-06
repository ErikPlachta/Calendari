/*Appointment_Type */

const {Schema, model} = require("mongoose");

const AppointmentTypeSchema = new Schema(
    {
        appointment_id: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
            //randomly generate string
        },
        business_id: {
            type: Schema.Types.ObjectId,
            ref: 'Business'
            //reference business model
        },
        // user_id: {
        //     type: Schema.Type.user_id,
        //     ref: 'User'
        // },
        // client_details: {//this below format is probably incorrect but revisiting later with tutor!
        //     type: Schema.Types.name_first,
        //     ref: 'User',
        //     type: Schema.Types.email,
        //     ref:'User',
        //     type: Schema.Types.phone,
        //     ref: 'User'
        // },
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

const AppointmentType = model('AppointmentType', AppointmentTypeSchema);

module.exports = AppointmentType
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
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        summary: {
            type: String,
            trim: true,
            length: 200,
        },
        appointment_date: {
            type: String
        },
        appointment_duration: {
            type: String
        },
    }
)

const Appointment_Type = model('Appointment_Type', AppointmentTypeSchema);

module.exports = Appointment_Type;
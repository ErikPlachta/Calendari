const { Schema, model } = require("mongoose");

const ApptTypeSchema = new Schema(
    {
        appt_type_name: {
            type: String,
        },
        subject: {
            type: String
        },
        summary: {
            type: String,
            trim: true,
            length: 200,
        },
        appointment_duration: {
            type: String
        },
        appt_type_notes: {
            type: String,
            lenght: 200
        },
        appt_fields: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointment_Field'
            }
        ]
    }
)

const Appointment_Type = model('Appointment_Type', ApptTypeSchema);

module.exports = Appointment_Type;

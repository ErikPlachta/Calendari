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
                ref: 'User'
            }
        ],
        configuration: {
            type: Object,
            length: 200
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
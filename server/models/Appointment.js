const { Schema, model } = require("mongoose");


//-- Example of an Appointment Type associated to a business
const example =
{
    "_id"           :   "0000-0001",
    "name"          :   "Non-Federation Citizen - Starfleet Exam 🌎",
    "summary"       :   "For non-Federation citizens, eligibility is considered with a letter of reference from a Command Level Starfleet Officer on file.",
    "description"   :   "This exam is designed to look for certain qualities a person displayed, including: integrity, intelligence, courage, imagination, and leadership qualities. Candidates are to expect the unexpected during this exam.",
    "date_time"     :   "TBD",
    "Details"       :   {
                        "subject"       : "Non-Federation Citizen - Starfleet Exam",
                        "date"          : "04/23/2022",
                        "duration"      : "Undetermined",
                        "time_start"    : "04:00",
                        "timezone"      : "Earth",
                        "client"        : {
                                            "name"          : "",
                                            "email"         : "",
                                            "phone"         : "",
                                            "notes"   : ""
                        }
                    }
}

const AppointmentSchema = new Schema(
    {
        // appt_type: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Appointment_Type'
        // },
        // client: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // },
        appointment_date: {
            type: String
        },
        appointment_time: {
            type: String
        },
        appointment_status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Canceled']
        }
    }
)

const Appointment = model('Appointment', AppointmentSchema);

module.exports = Appointment;
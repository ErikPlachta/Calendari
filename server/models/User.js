/*
- ### User
    - Anyone that can sign into the app.
    - Schema:
        - emailEmailRequiredUnique
            - password_salt - __Their unique password salt created at time of user creation__
        - password_hash
            - Their password after being salted
        - Appointments
            - Array
                - Type __Internal / Google__
                - Name
                - DateTime - __availbiliy__
        - business_id - __Association to business__
        - account_id - __The state of their account__
        - user_type_id - __Association to user type__
*/

const { Schema, model } = require('mongoose');
const dateFormat = require('../../client/src/utils/dateFormat'); /*THIS DOESNT SEEM LIKE RIGHT PATH, TRAFFIC CONE HERE*/

const UserSchema = new Schema(
    {
        user_id: {
            type: String,
            //need to randomly generate integers here
        },
        name_first: {
            type: String,
            require: true,
            trim: true
        },
        name_last: {
            type: String,
            require: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        emailRequiredUnique: {
            type: String,
            required: true,
            /*NEED HELP WITH THE SALTING PW*/ 
        },
        password_hash: {
            type: String,
            required: true,
            /*NEED HELP WITH THE SALTING PW*/ 
        },
        /*IS VERIFIED ACCOUNT MVP?? IF SO NEED HELP*/
        /*IS DATE CREATED MVP?*/
        date_created: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        /*IS DATE LOGIN MVP?*/
        /*IS USER CALENDAR MVP?*/
        appointments: [{
            type: Schema.type.ObjectId,
            ref: 'Appointment'
        }],
    }
);

//GET TOTAL COUNT OF APPOINTMENTS ON RETRIEVAL after i build out the appointments model


const User = model("User", UserSchema);
module.exports = User;
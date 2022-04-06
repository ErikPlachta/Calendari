/*
- ### User
    - Anyone that can sign into the app.
    - Schema:
        - emailEmailRequiredUnique
            - password_salt - __Their unique password salt created at time of user creation__
        - password_hash
            - Their password after being salted
        - verified - __User has verified their account__
        - date_Created - __Account created__
            - DateTime
            - Auto-Generated
        - date_Login - __Last Login__
            - DateTime
            - Auto-Updated on login
        - user_calendar - __Association to users calendar__
            - Array
                - Type __Internal / Google__
                - Name
                - DateTime - __availbiliy__
        - Appointments - __relation to appointment data type__
            - Array
                - Type __Internal / Google__
                - Name
                - DateTime - __availbiliy__
        - business_id - __Association to business__
        - account_id - __The state of their account__
        - user_type_id - __Association to user type__
*/

const { Schema, model } = require('mongoose');
const dateFormat = require('../../client/src/utils/dateFormat'); /*this looks weird to me heads up */

const UserSchema = new Schema(
    {
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
            /*MIGHT NEED HELP WITH THE SALTING PW*/ 
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
        id: false
    }
);

//GET TOTAL COUNT OF APPOINTMENTS ON RETRIEVAL after i build out the appointments model



const User = model("User", UserSchema);
module.exports = User;
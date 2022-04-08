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
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name_first: {
            type: String,
            required: true,
            trim: true
        },
        name_last: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minLength: [6, 'Password must be at least 6 characters long!']
        },
        date_created: {
            type: Date,
            default: Date.now,
        },
        appointments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ],
    },
    // add virtuals
    {
        toJSON: {
            virtuals: true
        }
    }
);

// hash password before saving new user to db
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//TODO: Get total # of appointments

const User = model("User", userSchema);
module.exports = User;
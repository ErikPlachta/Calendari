const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {   
        business_id: {
            type: String,
            required: true
        },
        business_brand_name: {
            type: String,
            required: true
        },
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
        phone_number: {
            type: String,
            required: true,
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
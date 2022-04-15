
const { User, Business, Appointment, Appointment_Type, Appointment_Field } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/authServices');

const resolvers = {
    Query: {
        // find all businesses
        allBusinesses: async () => {
            return Business.find()
                .select('-__v')
                .populate('appointment_types')
                .populate('appointments')
        },
        // find user info by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('appointments');
        },
        // find business by brand name
        businessByBrandName: async (parent, { brand_name }) => {
            return Business.findOne({ brand_name })
                .select('-__v -password')
                .populate({ path: 'users', populate: 'appointments' })
                .populate({ path: 'appointment_types', populate: 'appt_fields'})
                .populate('appointments')
        },
        // find business by _id
        businessById: async (parent, { _id }) => {
            return Business.findById({ _id })
                .select('-__v -password')
                .populate({ path: 'users', populate: 'appointments' })
                .populate({ path: 'appointment_types', populate: 'appt_fields'})
                .populate('appointments')
        }
    },
    Mutation: {
        // add new user
        addUser: async (parent, args) => {
            const user = await User.create(args);

            // add new user to business' list of clients
            await Business.findByIdAndUpdate(
                { _id: args.business_id },
                { $push: { users: user._id } },
                { new: true, runValidators: true }
            );
            // console.log(user)
            return user;
        },
        //-- Login an existing user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
          },
        // add new business
        addBusiness: async (parent, args) => {
            const business = await Business.create(args);
            return business;
        },
        // add new appointment type
        addApptType: async (parent, args) => {
            const apptType = await Appointment_Type.create(args);

            // add new appt type to business' list of appt types
            await Business.findByIdAndUpdate(
                { _id: args.business_id },
                { $push: { appointment_types: apptType._id } },
                { new: true, runValidators: true }
            );
            
            return apptType; 
        },
        // add new appointment type field
        addApptField: async (parent, args) => {
            const apptField = await Appointment_Field.create(args);
            
            await Appointment_Type.findByIdAndUpdate(
                { _id: args.appt_type_id},
                { $addToSet: { appt_fields: apptField._id } },
                { new: true, runValidators: true}
            );
            return apptField;
        },
        // add new appointment
        addAppt: async (parent, args) => {
            const appt = await Appointment.create(args);

            // add new appt to business' list of appts
            await Business.findByIdAndUpdate(
                { _id: args.business_id },
                { $push: { appointments: appt._id } },
                { new: true, runValidators: true }
            );

            // add new appt to user's list of appts
            await User.findByIdAndUpdate(
                { _id: args.user_id },
                { $push: { appointments: appt._id } },
                { new: true, runValidators: true }
            )
            return appt;
        },
        // update business brand or name
        updateBusiness: async (parent, args) => {
            const business = await Business.findByIdAndUpdate(
                { _id: args._id},
                args,
                { new: true, runValidators: true }
            )
            return business;
        },
        // update user email or phone number
        updateUser: async (parent, args) => {
            const user = await User.findByIdAndUpdate(
                { _id: args._id },
                args,
                { new: true, runValidators: true }
            )
            return user;
        },
        // update Appointment details
        updateAppt: async (parent, args) => {
            const appt = await Appointment.findByIdAndUpdate(
                { _id: args._id },
                args,
                { new: true, runValidators: true }
            )
            return appt;
        },
        // delete Appointment Type 
        delApptType: async (parent, args) => {
            await Appointment_Type.findOneAndDelete(
                { _id: args._id}
            )
            return;
        }
    }
};

module.exports = resolvers;
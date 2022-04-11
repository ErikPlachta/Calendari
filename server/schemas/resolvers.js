const { User, Business, Appointment, Appointment_Type } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

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
        business: async (parent, { brand_name }) => {
            return Business.findOne({ brand_name })
                //TODO:: 04/10/22 #EP | Inline Notes of Change Requests
                /* 
                   - add by brand_name or by business_id
                */
                .select('-__v -password')
                .populate({ path: 'users', populate: 'appointments' })
                .populate('appointment_types')
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
            console.log(user)
            return user;
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
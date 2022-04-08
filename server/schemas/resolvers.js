const { User, Business, Appointment, Appointment_Type } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // find all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('appointments');
        },
        // find all businesses
        businesses: async () => {
            return Business.find()
                .select('-__v')
                .populate('appointment_types')
                .populate('appointments')
        },
        // find all appointments
        appointments: async () => {
            return Appointment.find()
                .select('-__v')
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
                .select('-__v -password')
                .populate('appointment_types')
                .populate('appointments')
        }
    },
    Mutation: {
        // add new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        // add new business
        addBusiness: async (parent, args) => {
            const business = await Business.create(args);
            return business;
        },
        // add new appointment type to business
        addApptType: async (parent, args) => {
            const apptType = await Appointment_Type.create(args);
            await Business.findByIdAndUpdate(
                { _id: apptType.business_id },
                { $push: { appointment_types: apptType._id } },
                { new: true, runValidators: true }
            );
            
            return apptType; 
        },
        // add new appointment
        addAppt: async (parent, args) => {
            const appt = await Appointment.create(args);

            await Business.findByIdAndUpdate(
                { _id: appt.business_id },
                { $push: { appointments: appt._id } },
                { new: true, runValidators: true }
            );

            await User.findByIdAndUpdate(
                { _id: appt.user_id },
                { $push: { appointments: appt._id } },
                { new: true, runValidators: true }
            )
            return appt;
        }
    }
};

module.exports = resolvers;
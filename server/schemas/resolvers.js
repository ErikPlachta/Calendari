const { User, Business, Appointment, AppointmentType } = require('../models');
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
        // add new appointment
    }
};

module.exports = resolvers;
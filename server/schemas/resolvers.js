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
    }
};

module.exports = resolvers;
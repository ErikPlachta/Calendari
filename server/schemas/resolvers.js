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
        user: async () => {
            return 'this will yield user by username'
        },
        userAppts: async () => {
            return 'this will yield appts by username'
        },
        businessApptTypes: async () => {
            return 'this will yield appointment types by brand name'
        },
        businessAppts: async () => {
            return 'this will yield appts by brand name'
        }
    }
};

module.exports = resolvers;
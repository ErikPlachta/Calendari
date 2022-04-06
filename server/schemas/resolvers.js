const { User, Business, Appointment, AppointmentType } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async () => {
            return 'this will yield user by username'
        },
        business: async () => {
            return 'this will yield business by brand name'
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
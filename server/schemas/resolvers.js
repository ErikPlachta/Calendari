const { User, Business, Appointment, AppointmentType } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async () => {
            return 'hi'
        }
    }
};

module.exports = resolvers;
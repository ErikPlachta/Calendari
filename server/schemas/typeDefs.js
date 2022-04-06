const { gql } = require('apollo-server-express');

// type defs
const typeDefs = gql`
    type User {
        _id: ID
        name_first: String
        name_last: String
        username: String
        email: String
        date_created: String
        appointments: [Appointment]
    }
    type Business {
        _id: ID
        name: String
        brand_name: String
        appointment_types: [AppointmentType]
        appointments: [Appointment]
        users: [User]
    }
    type AppointmentType {
        _id: ID
        appointment_id: String
        business_id: String
        summary: String
    }
    type Appointment {
        user_id: String
        business_id: String
    }
    type Query {
        user(username: String!): User
        business(brand_name: String!): Business
        userAppts(username: String!): [Appointment]
        businessApptTypes(brand_name: String!): [AppointmentType]
        businessAppts(brand_name: String!): [Appointment]
    }
`;

module.exports = typeDefs;
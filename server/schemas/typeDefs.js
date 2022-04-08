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
        users: [User]
        configuration: String
        appointment_types: [AppointmentType]
        appointments: [Appointment]
    }
    type AppointmentType {
        _id: ID
        business_id: String
        users: [User]
        summary: String
        appointment_duration: String
    }
    type Appointment {
        _id: ID
        user_id: String
        business_id: String
        appointment_name: String
        appointment_duration: String
        appointment_date: String
        appointment_time: String
        appointment_status: String
    }
    type Query {
        users: [User]
        businesses: [Business]
        appointments: [Appointment]
        user(username: String!): User
        business(brand_name: String!): Business
    }
    type Mutation {
        addUser(name_first: String!, name_last: String!, email: String!, username: String!, password: String!): User
        addBusiness(name: String!, brand_name: String!): Business
        addApptType(business_id: ID!, summary: String!): AppointmentType
        addAppt(business_id: ID!, user_id: ID!, appointment_name: String!): Appointment
    }
`;

module.exports = typeDefs;
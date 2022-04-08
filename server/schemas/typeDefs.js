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
        users: [User]
        businesses: [Business]
        appointments: [Appointment]
        user(username: String!): User
        business(brand_name: String!): Business
    }
    type Mutation {
        addUser(name_first: String!, name_last: String!, email: String!, username: String!, password: String!): User
        addBusiness(name: String!, brand_name: String!): Business
        addApptType(business_id: ID!): Business
        addAppt(business_id: ID!): Appointment
    }
`;

module.exports = typeDefs;
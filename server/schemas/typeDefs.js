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
        business: Business
        appointments: [Appointment]
    }
    type Business {
        _id: ID
        name: String
        brand_name: String
        clients: [User]
        configuration: String
        appointment_types: [AppointmentType]
        appointments: [Appointment]
    }
    type AppointmentType {
        _id: ID
        business_id: String
        appt_type_name: String
        summary: String
        appointment_duration: String
    }
    type Appointment {
        user_id: String
        business_id: String
        appointment_name: String
        appointment_duration: String
        appointment_date: String
        appointment_time: String
        appointment_status: String
    }
    type Query {
        allBusinesses: [Business]
        user(username: String!): User
        business(brand_name: String!): Business
    }
    type Mutation {
        addUser(name_first: String!, name_last: String!, email: String!, username: String!, password: String!, phone_number: String!, business_id: ID!): User
        addBusiness(name: String!, brand_name: String!): Business
        addApptType(business_id: ID!, appt_type_name: String!, summary: String!): AppointmentType
        addAppt(business_id: ID!, user_id: ID!, appointment_name: String!): Appointment
    }
`;

module.exports = typeDefs;
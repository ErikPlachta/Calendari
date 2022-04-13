const { gql } = require('apollo-server-express');

// type defs
const typeDefs = gql`
    type User {
        _id: ID
        name_first: String
        name_last: String
        username: String
        email: String
        phone_number: String
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
        appt_type_name: String
        summary: String
        appointment_duration: String
    }
    type Appointment {
        _id: ID
        ## appt_type: [AppointmentType]
        ## client: [User]
        appointment_date: String
        appointment_time: String
        appointment_status: String
    }
    type Query {
        allBusinesses: [Business]
        user(username: String!): User
        business(brand_name: String!): Business
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        addUser(
            name_first: String!, 
            name_last: String!, 
            email: String!, 
            username: String!, 
            password: String!, 
            phone_number: String!, 
            business_id: ID!
        ): User
        login(
            email: String!,
            password: String!
        ): Auth
        addBusiness(
            name: String!, 
            brand_name: String!
        ): Business
        addApptType(
            business_id: ID!, 
            appt_type_name: String!, 
            summary: String!
        ): AppointmentType
        addAppt(
            business_id: ID!, 
            user_id: ID!, 
            appt_type_id: ID!
            appointment_date: String!, 
            appointment_time: String!, appointment_status: String!
        ): Appointment
        updateUser(
            _id: ID!
            email: String,
            phone_number: String
        ): User
        updateAppt(
            _id: ID!
            appointment_date: String
            appointment_time: String
            appointment_status: String
        ): Appointment
        delApptType(_id: ID!): Business     
    }
`;

module.exports = typeDefs;
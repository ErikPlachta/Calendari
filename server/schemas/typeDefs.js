const { gql } = require('apollo-server-express');

// type defs
const typeDefs = gql`
    type User {
        _id: ID
        business_id: ID
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
        configuration: String
        users: [User]
        appointment_types: [AppointmentType]
        appointments: [Appointment]
    }
    type AppointmentField {
        _id: ID
        field_name: String
    }
    type AppointmentType {
        _id: ID
        appt_type_name: String
        subject: String
        summary: String
        appointment_duration: String
        appt_type_notes: String
        appt_fields: [AppointmentField]
    }
    type Appointment {
        _id: ID
        appt_type_name: String
        appt_type_summary: String
        appt_type_notes: String
        appointment_date: String
        appointment_time: String
        appointment_status: String
        timezone: String
        client_full_name: String
        client_email: String
        client_phone: String
        appt_notes: String
    }
    type Query {
        allBusinesses: [Business]
        user(username: String!): User
        business(brand_name: String!): Business
    }
    type Mutation {
        addUser(
            business_id: ID!
            name_first: String!, 
            name_last: String!, 
            email: String!, 
            username: String!, 
            password: String!, 
            phone_number: String!, 
        ): User
        addBusiness(
            name: String!, 
            brand_name: String!
        ): Business
        addApptType(
            business_id: ID!, 
            appt_type_name: String!, 
            summary: String!
        ): AppointmentType
        addApptField(
            appt_type_id: ID!,
            field_name: String!
        ): AppointmentField
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
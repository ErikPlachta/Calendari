import { gql } from '@apollo/client';

// query all businesses
export const QUERY_BUSINESSES = gql`
    query AllBusinesses {
        allBusinesses {
            _id
            name
            brand_name
        }
    }
`;

// query users and respective appointments by business
export const QUERY_BUSINESS_CLIENTS = gql`
    query Business($brandName: String!) {
        business(brand_name: $brandName) {
            _id
            name
            brand_name
            users {
                _id
                name_first
                name_last
                email
                phone_number
                appointments {
                    _id
                    appointment_date
                    appointment_time
                    appointment_status
                }
            }
        }
    }
`;
// query business info and appointments
export const QUERY_BUSINESS = gql`
    query Business($brandName: String!) {
        business(brand_name: $brandName) {
            _id
            name
            brand_name
            appointments {
                _id
                appt_type_name
                appt_type_summary
                appt_type_notes
                client_full_name
                client_email
                client_phone
                appointment_date
                appointment_time
                appointment_status
                timezone
                appt_notes
            }
            appointment_types {
                _id
                appt_type_name
                subject
                summary
                appointment_duration
                appt_type_notes
                appt_fields {
                    field_name
                }
            }
        }
    }
`;
// query ALL business info, including appt types, appts, and users - by brand name
export const QUERY_BUSINESS_THOROUGH = gql`
    query businessByBrandName($brandName: String!) {
        businessByBrandName(brand_name: $brandName) {
            _id
            name
            brand_name
            users {
                _id
                business_id
                name_first
                name_last
                username
                email
                phone_number
                date_created
                appointments {
                    _id
                    appt_type_name
                    appt_type_summary
                    appt_type_notes
                    appointment_date
                    appointment_time
                    appointment_status
                    timezone
                    client_full_name
                    client_email
                    client_phone
                    appt_notes
                }
            }
            appointments {
                _id
                appt_type_name
                appt_type_summary
                appt_type_notes
                client_full_name
                client_email
                client_phone
                appointment_date
                appointment_time
                appointment_status
                timezone
                appt_notes
            }
            appointment_types {
                _id
                appt_type_name
                subject
                summary
                appointment_duration
                appt_type_notes
                appt_fields {
                    field_name
                }
            }
        }
    }  
`;
// query ALL business info, including appt types, appts, and users - by id
export const QUERY_BUSINESS_THOROUGH_BY_ID = gql`
    query BusinessById($id: ID!) {
        businessById(_id: $id) {
        _id
        name
        brand_name
        users {
            _id
            business_id
            name_first
            name_last
            username
            email
            phone_number
            date_created
            appointments {
                _id
                appt_type_name
                appt_type_summary
                appt_type_notes
                appointment_date
                appointment_time
                appointment_status
                timezone
                client_full_name
                client_email
                client_phone
                appt_notes
            }
        }
        appointment_types {
            _id
            appt_type_name
            subject
            summary
            appointment_duration
            appt_type_notes
            appt_fields {
                _id
                field_name
            }
        }
        appointments {
            _id
            appt_type_name
            appt_type_summary
            appt_type_notes
            appointment_date
            appointment_time
            appointment_status
            timezone
            client_full_name
            client_email
            client_phone
            appt_notes
        }
        }
    }
`;
// query single user
export const QUERY_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            _id
            business_id
            name_first
            name_last
            username
            email
            phone_number
            date_created
            appointments {
                _id
                appt_type_name
                appt_type_summary
                appt_type_notes
                appointment_date
                appointment_time
                appointment_status
                timezone
                appt_notes
            }
        }
    }
`;

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


//TODO:: 04/10/22 #EP || Inline notes of change requests
/*
    - Add configuration as it's required 
    - Rename to QUERY_BUSINESS
 */

// query users and respecti-ve appointments by business
export const QUERY_BUSINESS = gql`
    query Business($brandName: String!) {
        business(brand_name: $brandName) {
            _id
            name
            brand_name
            configuration
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
// query just appointments by business
export const QUERY_APPTS = gql`
    query Business($brandName: String!) {
        business(brand_name: $brandName) {
            _id
            name
            brand_name
            appointment_types {
                _id
                appt_type_name
                summary
                appointment_duration
            }
            appointments {
                _id
                appt_type_name
                appt_type_summary
                appointment_date
                appointment_time
                appointment_status
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
                _id: ID
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

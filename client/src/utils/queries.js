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
export const QUERY_USER_APPTS = gql`
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
                appointment_date
                appointment_time
                appointment_status
            }
        }
    }
`;
// query single user
export const QUERY_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            _id
            name_first
            name_last
            username
            email
            phone_number
            date_created
            appointments {
                _id
                appointment_date
                appointment_time
                appointment_status
            }
        }
    }
`;

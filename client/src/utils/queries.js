import { gql } from '@apollo/client';

// query all users
export const QUERY_USERS = gql`
    query Users {
        users {
            _id
            name_first
            name_last
            username
            email
            date_created
            appointments {
                user_id
                business_id
            }
        }
    }
`;

// query all businesses
export const QUERY_BUSINESSES = gql`
    query Businesses {
        businesses {
            _id
            name
            brand_name
            configuration
            users {
                name_first
                name_last
                email
                appointments {
                    appointment_name
                    appointment_status
                }
            }
            appointment_types {
                summary
                appointment_duration
            }
            appointments {
                appointment_name
                appointment_duration
                appointment_date
                appointment_time
                appointment_status
            }
        }
    }
`;

// query all appointments
export const QUERY_APPOINTMENTS = gql`
    query Appointments {
        appointments {
            user_id
            business_id
            appointment_name
            appointment_duration
            appointment_date
            appointment_time
            appointment_status
        }
    }
`;
// query user by username


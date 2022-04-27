
import { gql } from '@apollo/client';

// create new business
export const ADD_BUSINESS = gql`
    mutation AddBusiness($name: String!, $brandName: String!) {
        addBusiness(name: $name, brand_name: $brandName) {
            _id
            name
            brand_name
        }
    }
`;
// create new user
export const ADD_USER = gql`
    mutation AddUser($nameFirst: String!, $nameLast: String!, $email: String!, $username: String!, $password: String!, $phoneNumber: String!, $businessId: ID!, $brand_name: String!) {
        addUser(name_first: $nameFirst, name_last: $nameLast, email: $email, username: $username, password: $password, phone_number: $phoneNumber, business_id: $businessId, brand_name: $brand_name) {
            _id
            business_id
            brand_name
            name_first
            name_last
            username
            email
            date_created
            phone_number
        }
    }
`;
//-- Login existing user
//TODO:: 04/11/22 #EP || Add business business_id/brand_name on return
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        date_created
        business_id
        brand_name
      }
    }
  }
`;
// create new appointment type
export const ADD_APPT_TYPE = gql`
    mutation AddApptType($businessId: ID!, $apptTypeName: String!, $summary: String!) {
            addApptType(business_id: $businessId, appt_type_name: $apptTypeName, summary: $summary) {
                _id
                appt_type_name
                summary
                appointment_duration
        }
    }
`;
// create new appointment
export const ADD_APPT = gql`
    mutation AddAppt($businessId: ID!, $userId: ID!, $appointmentStatus: String!, $appointmentTime: String!, $appointmentDate: String!, $apptTypeId: ID!) {
        addAppt(business_id: $businessId, user_id: $userId, appointment_status: $appointmentStatus, appointment_date: $appointmentDate, appointment_time: $appointmentTime, appt_type_id: $apptTypeId) {
            _id
            appointment_date
            appointment_time
            appointment_status
        }
    }
`;
// update business info
export const UPDATE_BUSINESS = gql`
        mutation UpdateBusiness($id: ID!, $brandName: String, $name: String) {
            updateBusiness(_id: $id, brand_name: $brandName, name: $name) {
                _id
                name
                brand_name
            }
    }
`;
// update user info
export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $nameFirst: String, $nameLast: String) {
        updateUser(_id: $id, name_first: $nameFirst, name_last: $nameLast ) {
            _id
            name_first
            name_last
            username
            email
            phone_number
        }
    }
`;
// update appointment info
export const UPDATE_APPT = gql`
    mutation UpdateAppt($id: ID!, $appointmentStatus: String, $appointmentTime: String, $appointmentDate: String) {
        updateAppt(_id: $id, appointment_status: $appointmentStatus, appointment_time: $appointmentTime, appointment_date: $appointmentDate) {
        _id
        appointment_date
        appointment_time
        appointment_status
        }
    }
`;
// delete appointment type
export const DEL_APPT_TYPE = gql`
    mutation DelApptType($id: ID!) {
        delApptType(_id: $id) {
            _id
        }
    }
`;
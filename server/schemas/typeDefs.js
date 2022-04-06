const { gql } = require('apollo-server-express');

// type defs
const typeDefs = gql`
    type User: {
        user_id: ID
        name_first: String
        name_last: String
        username: String
        email: email
    }
`;

module.exports = typeDefs;
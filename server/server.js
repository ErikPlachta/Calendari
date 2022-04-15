// express server
const express = require('express');
// used in production mode
// const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// const { authMiddleware } = require('./utils/auth')

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001 ;


const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    // context: authMiddleware 
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
console.log("Starting server...")
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//------------------------------------------------------------------------------
//-- If deployment to production, meet Heroku Requirements

if(PORT != 3001) { //- If not in production port, is likely Heroku Part
  console.log(`
        /-- Not running on Port 3001!
        - server.s switching configuration to Production...`
  );
  //-- SETUP TO RUN FOR DEPLOYMENT SPECIFICALLY
  const path = require("path"); // Accessing the path module
  //-- route outside of server
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  //-- point to build file
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', "index.html"));
  });
  console.log(` /-- Production configuration finalized. Read to start server.` );
}

//------------------------------------------------------------------------------
//-- Start database connection

console.log("Starting connection to database...")
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
console.log("SUCCESS: connection to database!")
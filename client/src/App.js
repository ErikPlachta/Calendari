// import logo from './logo.svg';
import './assets/css/styles.css';
import './assets/css/animations.css';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';

import Business from './pages/Business';
import BusinessScheduler from './pages/BusinessScheduler';
import Schedule from './pages/Schedule';

const httpLink = createHttpLink({
  // uri: '/graphql'
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>

      <section>
        <Nav></Nav>

        {/* <Home></Home> */}
        {/* hard-coded business into default load for easy testing */}
        <main>
          <hr />
          <hr />
          <h2>BUSINESS DASHBOARD CONCEPT</h2>
          <Business></Business>
          <hr />
          <hr />
          <h2>BUSINESS SCHEDULER CONCEPT</h2>
          <BusinessScheduler></BusinessScheduler>
          <hr />
          <hr />
          <h2>SCHEDULE CONCEPT</h2>
          <Schedule></Schedule>
        </main>
      </section>
    </ApolloProvider>
  );
}

export default App;

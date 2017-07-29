import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './App';
import Users from './components/Users';
import User from './components/User';
import NewUser from './components/NewUser';
import AboutPage from './components/AboutPage';  


export default (  
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
    <Route path="/users" component={Users} >
      <Route path="/users/new" component={NewUser} />
      <Route path="/users/:id" component={User} />
    </Route>
    <Route path="/about" component={AboutPage} />
  </Route>
);
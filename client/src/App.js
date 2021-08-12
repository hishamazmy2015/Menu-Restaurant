import './App.css';
import React, { Fragment, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import Register from './components/auth/Register';
import login from './components/auth/Login';
import { Landing } from './components/layout/Landing';
import Alert3 from './components/layout/Alert3';
import { loadUser } from './actions/auth';
import {Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import Room from './components/rooms/room';
import PrivateRoute from './components/routing/PrivateRoute';
import { Header } from './components/layout/Header';
import Footer from './components/layout/Footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  
  useEffect(() => store.dispatch(loadUser(), []));

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Header/>

          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert3 />
            <Switch>
              <PrivateRoute exact path='/room' component={Room} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
         <main>
         <Container>
            
           <h1>Welcome !!!</h1>
            </Container>
         </main>
          <Footer/>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

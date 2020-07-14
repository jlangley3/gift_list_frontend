import React, { Fragment } from 'react'
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Navbar from './components/Navbar';
import About from './components/About';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route path="/" component={LoginForm} />
        </Switch>
        {/* <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/profile" render={() =>
            this.state.currentUser ? <Profile
              currentUser={this.state.currentUser} />:
              <Redirect to="/login" />
          } />
          <Route exact path="/login" render={() =>
            this.state.currentUser ?
            <Redirect to="/profile"/> :
            <LoginForm updateUser={this.updateUser}/>
          } />
          <Route component={NotFound} />
        </Switch> */}
      </Fragment>
  );
}

export default App;

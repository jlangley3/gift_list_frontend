import React, { Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

const Navbar = props => {

  return (
        <Fragment>
          <NavLink
            to="/about"
            exact
            className="nav"
            name="about"
              activeStyle={{
                color: 'limegreen'
              }}
          />
          <h3>About</h3>
        <NavLink
          to="/login"
          exact
          className="nav"
          name="Login"
              activeStyle={{
                color: 'limegreen'
              }}
        />
        <h3>Home</h3>
    </Fragment>
  );
};

const Nav = withRouter(Navbar);

export default Nav;

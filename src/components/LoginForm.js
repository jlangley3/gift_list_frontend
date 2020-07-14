import React, { Fragment } from "react";
import { withRouter } from "react-router";
import defaultProfile from '../images/Mario.jpeg';

class LoginForm extends React.Component {


  render() {
    return (
      <Fragment>
        <form action="action_page.php" method="post">
        <div className="imgcontainer">
            <img src={defaultProfile} alt="Avatar" className="avatar"/>
        </div>

        <div className="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <button type="submit">Login</button>
        </div>

        <div className="container" >
            <button type="button" className="cancelbtn">Cancel</button>
            
        </div>
        </form>

      </Fragment>
    );
  }
}

// export default LoginForm;
export default withRouter(LoginForm);
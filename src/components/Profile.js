// import React, { Fragment } from "react";
// import { Card, Image } from "semantic-ui-react";
// import { withRouter } from "react-router-dom";
// import {connect} from "react-redux";
// import { fetchingUser } from '../redux/actions/users';
// import Reminders from "./Reminders.js";
// import Contacts from "./Contacts.js"
// import Gifts from "./Gifts.js"
// import Events from "./Events.js"

// class Profile extends React.Component{

//   render() {
//     let {avatar, username, first_name, last_name} = this.props.user

//     return (
//        <Fragment>
//    <Card>
//       <Image src={avatar} alt="No Picture" />
//       <Card.Content>
//         <Card.Header>{username}</Card.Header>
//         <Card.Description>{first_name}{"   "}{last_name}</Card.Description>
//       </Card.Content>
//     </Card>
//          {this.props.user.events.map(event => { return <Events key={event.id} event={event}/>})}
//          {this.props.user.reminders.map(reminder => { return <Reminders key={reminder.id} reminder={reminder}/>})}
//          {this.props.user.contacts.map(contact => { return <Contacts key={contact.id} contact={contact}/>})}
//          {this.props.user.gifts.map(gift => { return <Gifts key={gift.id} gift={gift}/>})}
//        </Fragment>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchingUser: (token) => dispatch(fetchingUser(token))
   
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));


import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from "react-router-dom";
import { Card } from 'semantic-ui-react';
import NoContacts from '../components/NoContacts';
import { Grid, Button } from 'semantic-ui-react';

import Events from '../components/Events.js'

class Homepage extends React.Component{

render(){
  
    return (
        <div className='wrapper'>
         <Grid>
           <Grid.Row>
             <Grid.Column >
               <h1>Wat Up Hommie, {this.props.user.username} !</h1>
             </Grid.Column>
           </Grid.Row>
   
           <Grid.Row>
             <Grid.Column>
               {this.props.contacts.length === 0 ?
               <NoContacts />
               :
               <Card.Group itemsPerRow={4} stackable>
                 {this.props.user.events.map(event => { return <Events key={event.id} event={event}/>})}
               </Card.Group>
               }
             </Grid.Column>
           </Grid.Row>
           <Button as={Link} to='/new_event'>
           Create Event
          </Button>
          <Button as={Link} to="contacts/new">
           Create Contact
          </Button>         
         </Grid>
        </div>
      )
     }
   }




    

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    user: state.user,
    events: state.events,
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(Homepage)
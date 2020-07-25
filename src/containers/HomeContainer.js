import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Icon } from 'semantic-ui-react';
import NoEvents from '../components/NoEvents';
import NoContacts from '../components/NoContacts';
import NewEventForm from '../components/NewEventForm';
import { Grid, Button, Modal, Image, Header} from 'semantic-ui-react';
import Events from '../components/Events.js'

class Homepage extends React.Component{

  constructor(){
    super();
    console.log(this.props)
    this.state = {
        newEventModal: false
    }
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })


  addEventBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('addEventModal')}
      inverted
      color='green'>Create a Gift List</Button>} 
        open={this.state.addEventModal}
        onClose={() => this.handleClose('addEventModal')}
        closeIcon
      centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
      <Grid columns={2} divided>
           <Grid.Row>
            <Grid.Column>
        <Modal.Description>
          <Header>Add a New Event Gift List</Header>
        </Modal.Description>
        </Grid.Column>
        <Grid.Column>
        <Icon name='add circle' size='massive' color='green' />
        </Grid.Column>
        </Grid.Row>
              </Grid>
     
      <NewEventForm 
      title={"Add Event Form"} 
      handleClose={() => this.handleClose('addEventModal')}/> 
      </Modal.Content>
    </Modal>
    )
  }

  

render(){
  
    return (
        <div className='wrapper'>
         
         <Grid columns={2} divided>
            <Grid.Row>
             <Grid.Column >
               <h1>Hello {this.props.user.username}!</h1> 
             </Grid.Column>
             <Grid.Column >
               {this.addEventBtn()}  
             </Grid.Column>
            </Grid.Row>
             </Grid>

   <Grid>
           <Grid.Row>
             <Grid.Column>
               {this.props.events.length === 0 ?
               <div>
                 <NoEvents />
                 <NoContacts />
               </div>
  
               :
               <Card.Group itemsPerRow={4} stackable>
                 {this.props.events.map(event => { return <Events key={event.id} event={event}/>})}
               </Card.Group>
               }
               {this.props.contacts.length === 0 ?
               <div>
                 <NoContacts />
               </div> : null}
             </Grid.Column>
           </Grid.Row>     
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
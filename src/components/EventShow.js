import React from 'react'
import { Image, Header, Modal, Grid, Button, GridColumn, List, Icon, Label, Card, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import AddEventContacts from './AddEventContacts';
import AddGifts from './AddGifts';
import EditEventForm from './EditEventForm';
import { isEmpty } from 'lodash';
import { updatingEvent, deletingEvent, addingEvent} from '../redux/actions/events';
import GiftContact from './GiftContact';
import ContactsOfEvent from './ContactsOfEvent';
import GiftList from "../images/GiftList.png";
import Edit from "../images/edit.gif";

class ContactShow extends React.PureComponent {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editEventModal: false,
        editingEvent: null,
        newEventModal: false,
        addContactModal: false,
        newGiftModal: false
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  


  giftPrice = () => { 
   var cash =  this.props.currentEvent.gifts.reduce(function(previousValue, currentValue) {
    return { price: previousValue.price + currentValue.price}})
     if (cash.price > this.props.currentEvent.budget){
    return   <Label color='red' horizontal>${cash.price}</Label>
  } else {return <Label color='green' horizontal>${cash.price}</Label>}
}
  filteredNames = () => {
   if(this.props.currentEvent.contacts) {
     const array = this.props.currentEvent.contacts
 
            const result = [];
          const map = new Map();
          for (const item of array) {
              if(!map.has(item.id)){
                  map.set(item.id, true);    // set any value to Map
                  result.push(item);
              }
          }
          return result
   }
       
  }

  addContactBtn = () => {
    return (
      <Modal 
        trigger={<Button inverted color="green" 
        icon="user plus" 
        onClick={() => this.handleOpen('addContactModal')} 
        content="Add Contact" />}
       
      open={this.state.addContactModal}
      onClose={() => this.handleClose('addContactModal')}>
        <Modal.Header>Add a Contact to This List</Modal.Header>
          <Modal.Content >
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={12}>
                  <AddEventContacts event={this.props.event} 
                  title={'Add Contacts to List'}  handleClose={() => this.handleClose('addContactModal')}/>
              </Grid.Column>
              <Grid.Column width={3}>
                <Modal.Description>
                  Pick a Contact from the DropDown to add to this list.
                  <Icon circular inverted size="huge" color='green' name='users' />
            </Modal.Description>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
        
    )
  }


 
  editEventBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('editEventModal')}
          icon='edit' 
          color='green'
          content="Edit Gift List"/>} 
            open={this.state.editEventModal}
            onClose={() => this.handleClose('editEventModal')}
            closeIcon
            centered={false}>
          <Modal.Header>Edit Gift List</Modal.Header>
          <Modal.Content>
          <Grid columns={2} divided>
           <Grid.Row>
              <Grid.Column>
                  <EditEventForm event={this.props.currentEvent} 
                          title={"Edit Event Form"} 
                          handleClose={() => this.handleClose('editEventModal')}/>
              </Grid.Column>
              <Grid.Column>
                  <Modal.Description>
                    <Icon circular inverted size="huge" color='green' name="edit" />
                </Modal.Description>
             </Grid.Column>
            </Grid.Row>
          </Grid>
      </Modal.Content>
    </Modal>
    )
  }

  deleteEventBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteEventModal')}
          content='Delete List'
          color='red'
          icon='trash' 
        />}
        open={this.state.deleteEventModal}
        onClose={() => this.handleClose('deleteEventModal')}
      >
        <Header icon='trash' content='Delete this List?' />
        <Modal.Content>
          <p>You Sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted negative content='No' onClick={() => this.handleClose('deleteEventModal')} />
          <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingEvent(this.props.currentEvent)
            this.handleClose('deleteEventModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

  render(){
      console.log(this.props)
      

    const {title, start_date, end_date, budget, repeating} = this.props.currentEvent
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { title } 
                <Header.Subheader>Date: { moment(start_date).format('ll') } - { moment(end_date).format('ll') }</Header.Subheader>
                <Header.Subheader>Budget: <Label color='green' horizontal>${ budget}</Label></Header.Subheader>
                
                {!isEmpty(this.props.currentEvent.gifts) ? <Header.Subheader>Money Spent on Gifts for this List: {this.giftPrice()}</Header.Subheader> : <p>Money Spent on Gifts for this List: $0</p>}
                    
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column >
          <Image  size='medium' src={GiftList} alt="No Picture" />
          </Grid.Column >
        </Grid.Row>
        <Grid.Row >
          <Button.Group widths='3'>
            { this.editEventBtn() }
            { this.addContactBtn() }
            { this.deleteEventBtn() }
          </Button.Group>
           <Divider />
        </Grid.Row>
           
            <Card.Group>{!isEmpty(this.props.currentEvent.contacts) ? this.filteredNames().map(contact => <ContactsOfEvent
              key={contact.id}
              contact={contact}
              event={this.props.event}/>) : null}</Card.Group>
              
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
      user: state.user,
      contacts: state.contacts,
      currentEvent: state.currentEvent
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingEvent: myEvent => dispatch(deletingEvent(myEvent)),
    addingEvent: myEvent => dispatch(addingEvent(myEvent)),
    updatingEvent: myEvent => dispatch(updatingEvent(myEvent)),
    
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)





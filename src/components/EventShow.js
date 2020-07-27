import React from 'react'
import { Image, Header, Modal, Grid, Button, GridColumn, List, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import AddEventContacts from './AddEventContacts';
import EditEventForm from './EditEventForm';
import { isEmpty } from 'lodash';
import { updatingEvent, deletingEvent, addingEvent} from '../redux/actions/events';
import GiftContact from './GiftContact';
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
        addGiftModal: false,
        newGiftModal: false
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  


  giftPrice = () => { 
   var cash =  this.props.currentEvent.gifts.reduce(function(previousValue, currentValue) {
    return { price: previousValue.price + currentValue.price}})
    return cash.price
}
  



  addContactBtn = () => {
    return (
      <Modal 
        trigger={<Button color="green" onClick={() => this.handleOpen('addContactModal')}>Add Contact</Button>}
      open={this.state.addContactModal}
      onClose={() => this.handleClose('addContactModal')}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content >
      <Grid columns={2} divided>
           <Grid.Row>
            <Grid.Column>
      <AddEventContacts event={this.props.event} title={'Add Contacts to List'}  handleClose={() => this.handleClose('addContactModal')}/>
      </Grid.Column>
            <Grid.Column>
        <Modal.Description>
          <Header>Add Contacts to List</Header>
          <p>
            Pick a Contact from the DropDown to add to this list
          </p>
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
      basic
      color='green'>Edit Gift List</Button>} 
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
            {/* <Grid.Column> */}
            <Icon circular inverted size="huge" color='green' name="edit" />
        {/* </Grid.Column> */}
          {/* <Header>Add Contacts to List</Header>
          <p>
            Insert the name of the Gift.
          </p>
          <p>Pick a Contact from the DropDown.</p> */}
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
                <Header.Subheader>Start Date: { moment(start_date).format('ll') }</Header.Subheader>
                <Header.Subheader>End Date: { moment(end_date).format('ll') }</Header.Subheader>
                <Header.Subheader>Budget: ${ budget}</Header.Subheader>
                <Header.Subheader>
                {!isEmpty(this.props.currentEvent.gifts) ? <p>Money Spent on Gifts for this List: ${this.giftPrice()}</p> : <p>Money Spent on Gifts for this List: $0</p>}
                    </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column >
          <Image  size='medium' src={GiftList} alt="No Picture" />
          </Grid.Column >
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            { this.editEventBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.addContactBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteEventBtn() }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} >
        <List>
    {!isEmpty(this.props.currentEvent.gifts) ? this.props.currentEvent.gifts.map(gift => <GiftContact 
          key={gift.id} 
          gift={gift} 
          event={this.props.event}/>) : <h3>"Please add Contacts to this list"</h3>}
            </List>    
           </Grid.Row>

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





import React, {Component, Fragment} from "react"
import { Image, Header, Modal, Grid, Button, GridColumn, List, Icon, Label, Card } from 'semantic-ui-react'
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
import { deletingGift } from '../redux/actions/';
import GiftForm from './GiftForm';


class Gifts extends Component {

  constructor(props){
    super(props)
    console.log(props)
        this.state = {
          currentContact: props.recipient ? props.recipient: "",
          currentGift: props.gift ? props.gift : "",
          editGiftModal: false,
          deleteGiftModal: false,
          thisEvent: props.event
        }
      }

      handleChange = event => this.setState({
        [event.target.name]: event.target.value
      })
   
      handleOpen = (modal) => this.setState({ [modal]: true })
      handleClose = (modal) => this.setState({ [modal]: false })

    handleSubmitForm = (event) => {
       event.preventDefault();
       let giftAndContact = this.state.currentContact
        this.props.addingGift(this.state, this.props.event)
    }
    render() {
        let { gift } = this.props
        return (
            <Fragment>
            <Card>
          
               <Card.Content>
                 <Card.Header>{gift.name}</Card.Header>
                 {"Price:  $"}{gift.price}
                 {/* <Card.Description>{"Price: "}{gift.price}{"  Rating: "}{gift.rating}</Card.Description> */}
               </Card.Content>
             
             <div className='ui two buttons'>
                <Button size="mini" color="green" onClick={() => this.handleOpen('editGiftModal')}>
              <Icon name='edit' />
              </Button>
               <Button size="mini" color="red" onClick={() => this.handleOpen('deleteGiftModal')}>
              <Icon name='delete' />
              </Button></div>
                <Modal 
              open={this.state.editGiftModal}
              onClose={() => this.handleClose('editGiftModal')}
              centered={false}>
              <Modal.Header as="h1">Edit Gift</Modal.Header>
                <Modal.Content >
                 <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Header>Add Contacts to List</Header>
                      <Modal.Description>
                      <p>Type the name of the Gift.</p>
                      <p>Pick a Contact from the DropDown.</p>
                      </Modal.Description>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon name='gift' size='massive' color='green' />
                      </Grid.Column>
                      </Grid.Row>
                      </Grid>
                    <GiftForm event={this.props.event} 
                              gift={gift} 
                              contact={this.props.contact} 
                              title={'Edit Gift'} 
                              handleClose={() => this.handleClose('editGiftModal')}
                            />
                    
                    </Modal.Content>
           </Modal>
               <Modal
              size='mini'
              open={this.state.deleteGiftModal}
              onClose={() => this.handleClose('deleteGiftModal')}
            >
              <Header icon='trash' content='Delete this List?' />
              <Modal.Content>
                <p>You Sure?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button inverted negative content='No' onClick={() => this.handleClose('deleteGiftModal')} />
                {this.props.contact ?
                <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
                  this.props.deletingGift(gift, this.props.event)
                  this.handleClose('deleteGiftModal')
                }
                }/> 
                :
                <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
                  this.props.deletingGift(gift, this.props.event)
                  this.handleClose('deleteGiftModal')}}/>}
              </Modal.Actions>
            </Modal>
              </Card>
            </Fragment>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingGift: (gift, thisEvent) => dispatch(deletingGift(gift, thisEvent))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gifts);
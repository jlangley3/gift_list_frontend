import React, {Component, Fragment} from 'react'
import { Image, Header, Modal, Grid, Button, Segment, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import ContactForm from './ContactForm';
import { deletingContact, addingContact, updatingContact} from '../redux/actions/contacts';
import { isEmpty } from 'lodash';
import ContactGifts from "./ContactGifts";
import { getStickyHeaderDates } from '@fullcalendar/react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class ContactShow extends React.Component {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editContactModal: false,
        deleteContactModal: false
    }
  }
 
  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })

  giftPrice = () => { 
    var cash =  this.props.contact.gifts.reduce(function(previousValue, currentValue) {
     return { price: previousValue.price + currentValue.price}})
     return cash.price
 }

 
  editContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('editContactModal')}
          content='Edit Friend'
          inverted
          color='green'
        />}
        open={this.state.editContactModal}
        onClose={() => this.handleClose('editContactModal')}
        closeIcon
      >
          <Modal.Content>
        <ContactForm contact={this.props.contact} handleClose={() => this.handleClose('editContactModal')} />
      </Modal.Content>
      </Modal>
    )
  }

  deleteContactBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteContactModal')}
          content='Remove Friend'
          inverted
          color='red'
        />}
        open={this.state.deleteContactModal}
        onClose={() => this.handleClose('deleteContactModal')}
      >
        <Header icon='trash' content='Delete this contact?' />
        <Modal.Content>
          <p>You Sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={() => this.handleClose('deleteContactModal')} />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingContact(this.props.contact)
            this.handleClose('deleteContactModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

  listOfGifts = () => {
 let contactGifts = this.props.contact.gifts.map(gift => {return <ContactGifts key={gift.key} gift={gift}/>})
 return contactGifts
  }

  formatEvents = () => {
    return this.props.contact.gifts.map(gift => {
              const {name, price, contact} = gift

              return {
                name: name, 
                price: price,
                amt: true
              }
          })
  }

 

  render(){
      console.log(this.props)

    const {contact: {name, created_at, kind, avatar, birthday}} = this.props
    return(
      <Fragment>
      <Grid  stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { name } 
                <Header.Subheader>Birthday { moment(birthday).format('ll') }</Header.Subheader>
                <Header.Subheader>
                {!isEmpty(this.props.contact.gifts) ? <p>Total Spent on Gifts for this Contact: ${this.giftPrice()}</p> : <p>0$ Spent on this Contact</p>}
                    </Header.Subheader>
                  </Header.Content>
                <Label color='red' horizontal>
                { this.props.contact.kind ? this.props.contact.kind.toUpperCase() : null}
                 </Label>
                <Header as='h2' floated='right'>
                { this.editContactBtn() }
                { this.deleteContactBtn() }
              </Header>
            </Header>  
          </Grid.Column>
        </Grid.Row>
       </Grid>
       <Grid celled>
          <Grid.Column width={4}>
        <Image floated='right' size='large' src={avatar} />
        </Grid.Column>
        <Grid.Column width={12} stackable columns={3}>
        {!isEmpty(this.props.contact.gifts) ? <h3>Recent Gifts Given: {this.listOfGifts()}</h3> : <p>Money Spent on Gifts for this List: $0</p>}
        </Grid.Column>
       
      
        <Grid.Row>
                <BarChart
                width={800}
                height={600}
                data={this.formatEvents()}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
        </Grid.Row>
      </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    events: state.events, 
    user: state.user 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingContact: (contact) => dispatch(deletingContact(contact)),
    addingContact: (contact) => dispatch(addingContact(contact)),
    updatingCOntact: (contact) => dispatch(updatingContact)
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)
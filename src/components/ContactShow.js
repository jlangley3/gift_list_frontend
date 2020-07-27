import React from 'react'
import { Image, Header, Modal, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import ContactForm from './ContactForm';
import { deletingContact, addingContact, updatingContact} from '../redux/actions/contacts';
import { isEmpty } from 'lodash';
import ContactGifts from "./ContactGifts"
import { getStickyHeaderDates } from '@fullcalendar/react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class ContactShow extends React.PureComponent {

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

  


  // createContactBtn = () => {
  //   return (
  //     <Modal
  //       size='tiny'
  //       trigger={<Button
  //         onClick={() => this.handleOpen('createContactModal')}
  //         content='Create Friend'
  //         basic
  //         color='green'
  //       />}
  //       open={this.state.createContactModal}
  //       onClose={() => this.handleClose('createContactModal')}
  //       closeIcon
  //     >
          
  //       <ContactForm contact={this.props.contact} handleClose={() => this.handleClose('createContactModal')} />
  //     </Modal>
  //   )
  // }
 
  editContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('editContactModal')}
          content='Edit Friend'
          basic
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
          basic
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
  
            //   let startTime = start_date
            //   let endTime = end_date
  
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
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { name } 
                <Header.Subheader>Birthday { moment(birthday).format('ll') }</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Image floated='right' size='large' src={avatar} />
        {!isEmpty(this.props.contact.gifts) ? <p>Money Spent on Gifts for this List: {this.listOfGifts()}</p> : <p>Money Spent on Gifts for this List: $0</p>}
        {this.listOfGifts()}
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Button>{kind}</Button>
          </Grid.Column>
          <Grid.Column>
            <p>
              
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            { this.editContactBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteContactBtn() }
          </Grid.Column>
        </Grid.Row>
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
import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Modal, Image, Header, List, Icon} from 'semantic-ui-react';
import { deletingGift } from '../redux/actions/';
import GiftForm from './GiftForm';
import moment from 'moment';

class GiftContact extends React.Component {

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

    editGiftBtn = () => {
        return (
          <Modal 
              trigger={<Button onClick={() => this.handleOpen('editGiftModal')}
              >Add/Change Gift</Button>}
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
                    gift={this.props.gift} 
                    contact={this.props.gift.contact} 
                    title={'Edit Gift'} 
                    handleClose={() => this.handleClose('editGiftModal')}
                  />
          
          </Modal.Content>
        </Modal>
        )}    
        
        deleteGiftBtn = () => {
          return (
            <Modal
              size='mini'
              trigger={<Button
                onClick={() => this.handleOpen('deleteGiftModal')}
                content='Delete Gift/Contact'
                color='red'
              />}
              open={this.state.deleteGiftModal}
              onClose={() => this.handleClose('deleteGiftModal')}
            >
              <Header icon='trash' content='Delete this List?' />
              <Modal.Content>
                <p>You Sure?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button inverted negative content='No' onClick={() => this.handleClose('deleteGiftModal')} />
                <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
                  this.props.deletingGift(this.state.currentGift, this.state.thisEvent)
                  this.handleClose('deleteGiftModal')
                }
                } />
              </Modal.Actions>
            </Modal>
          )
        }



    render(){
        console.log(this.props)
        let {name, contact} = this.props.gift
        return (
            <List.Item padding="left">
             <Image avatar src={contact.avatar} />
            <Grid columns={3} divided>
             <Grid.Row >
             <Grid.Column>
             <List.Content>
                <List.Header as='h2'>{contact.name}</List.Header>
                <List.Description>
                {`1st Day On Earth: ${ moment(contact.birthday).format('ll')} `}
                </List.Description>
            </List.Content>
             </Grid.Column>
             <Grid.Column>
             <List.Content>
                <List.Header as='h2'>{name}</List.Header>
                <List.Description>
                Gift
                </List.Description>
            </List.Content>
             </Grid.Column>
              <Grid.Column>
               { this.editGiftBtn() }
               {this.deleteGiftBtn()}
             </Grid.Column>
           </Grid.Row>
          </Grid>
          </List.Item>)
    }
}

const mapStateToProps = (state )=> {
    return {
      events: state.events,
      user: state.user,
      loading: state.loading, 
      currentEvent: state.currentEvent
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      // addingGiftContact: (newContactGift, thisEvent) => dispatch(addingGift(newContactGift, thisEvent)),
      deletingGift: (gift, thisEvent) => dispatch(deletingGift(gift, thisEvent))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiftContact)
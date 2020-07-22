import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Modal, Image, Header, List} from 'semantic-ui-react';
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
              deleteGiftModal: false
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
          <Modal.Content image>
          <GiftForm event={this.props.event} 
                    gift={this.props.gift} 
                    contact={this.props.gift.contact} 
                    title={'Edit Gift'} 
                    handleClose={() => this.handleClose('editGiftModal')}
                  />
          <Image wrapped size='medium' src='https://www.creativefabrica.com/wp-content/uploads/2018/10/Happy-Birthday-Gift-Green-and-Black-by-Surya-Darmawan-580x386.jpg' />
          <Modal.Description>
            <Header>Add Contacts to List</Header>
            <p>Type the name of the Gift.</p>
            <p>Pick a Contact from the DropDown.</p>
        </Modal.Description>
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
                  this.props.deletingGift(this.state.currentGift)
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
      deletingGift: (gift) => dispatch(deletingGift(gift))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiftContact)
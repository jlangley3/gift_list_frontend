import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Modal, Image, Header, List, Icon, Card, Segment} from 'semantic-ui-react';
import { deletingGift } from '../redux/actions/';
import GiftForm from './GiftForm';
import moment from 'moment';
import Gifts from './Gifts';

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

    // editGiftBtn = (gift) => {
    //     return (
    //       <Modal 
    //           trigger={<Button size="mini" color="green" onClick={() => this.handleOpen('editGiftModal')}>
    //           <Icon name='edit' />
    //           </Button>}
    //           open={this.state.editGiftModal}
    //           onClose={() => this.handleClose('editGiftModal')}
    //           centered={false}>
    //           <Modal.Header as="h1">Edit Gift</Modal.Header>
    //             <Modal.Content >
    //              <Grid columns={2} divided>
    //               <Grid.Row>
    //                 <Grid.Column>
    //                   <Header>Add Contacts to List</Header>
    //                   <Modal.Description>
    //                   <p>Type the name of the Gift.</p>
    //                   <p>Pick a Contact from the DropDown.</p>
    //                   </Modal.Description>
    //                 </Grid.Column>
    //                 <Grid.Column>
    //                   <Icon name='gift' size='massive' color='green' />
    //                   </Grid.Column>
    //                   </Grid.Row>
    //                   </Grid>
    //                 <GiftForm event={this.props.event} 
    //                           gift={gift} 
    //                           contact={this.props.contact} 
    //                           title={'Edit Gift'} 
    //                           handleClose={() => this.handleClose('editGiftModal')}
    //                         />
                    
    //                 </Modal.Content>
    //        </Modal>
    //     )}    
        
    //     deleteGiftBtn = (gift) => {
    //       return (
    //         <Modal
    //           size='mini'
    //           trigger={<Button size="mini" color="red" onClick={() => this.handleOpen('deleteGiftModal')}>
    //           <Icon name='delete' />
    //           </Button>}
    //           open={this.state.deleteGiftModal}
    //           onClose={() => this.handleClose('deleteGiftModal')}
    //         >
    //           <Header icon='trash' content='Delete this List?' />
    //           <Modal.Content>
    //             <p>You Sure?</p>
    //           </Modal.Content>
    //           <Modal.Actions>
    //             <Button inverted negative content='No' onClick={() => this.handleClose('deleteGiftModal')} />
    //             {this.props.contact ?
    //             <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
    //               this.props.deletingGift(this.filterGifts()[this.filterGifts().length - 1], this.props.event)
    //               this.handleClose('deleteGiftModal')
    //             }
    //             }/> 
    //             :
    //             <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
    //               this.props.deletingGift(gift, this.props.event)
    //               this.handleClose('deleteGiftModal')}}/>}
                
    //           </Modal.Actions>
    //         </Modal>
    //       )
    //     }

        filterGifts = () => {
          const gifts = this.props.currentEvent.gifts.filter(gift => gift.contact_id === this.props.contact.id )
          // && gift.name !== "No Gift Yet"
          return gifts
        }

    render(){
        console.log(this.props)
    
        let {name, gifts, birthday, avatar} = this.props.contact
        return (
          <Card>
            <Card.Content>
              <Image avatar src={avatar} />
              <Card.Header>{name}</Card.Header>            
               {/* {gifts.map(gift => <Card.Description>{gift.name}{"||  Price:  $"}{gift.price}</Card.Description>)} */}
               {this.filterGifts().map(gift => <Gifts key={gift} gift={gift}/>)}
      </Card.Content>
        </Card>)
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
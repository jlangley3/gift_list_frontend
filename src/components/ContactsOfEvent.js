import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Modal, Image, Icon, Card} from 'semantic-ui-react';
import { deletingGift } from '../redux/actions/';
import AddGifts from './AddGifts';
import Gifts from './Gifts';
import { isEmpty } from 'lodash';

class GiftContact extends React.Component {

      constructor(props){
        super(props)
        // console.log(props)
            this.state = {
              currentContact: props.recipient ? props.recipient: "",
              currentGift: props.gift ? props.gift : "",
              editGiftModal: false,
              deleteGiftModal: false,
              addGiftModal: false,
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

    addGiftBtn = () => {
      return (
        <Modal 
          trigger={<Button 
            // color="grey" 
            onClick={() => this.handleOpen('addGiftModal')}
            icon="gift"
            size="mini" 
            content= "Add Gift" />}
            open={this.state.addGiftModal}
            onClose={() => this.handleClose('addGiftModal')}>
              <Modal.Header>Add a Gift to This List</Modal.Header>
                <Modal.Content >
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column>
                        <AddGifts event={this.props.event} contact={this.props.contact}
                        title={'Add Gifts to List'}  handleClose={() => this.handleClose('addGiftModal')}/>
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name='gift' color="red" size='massive' />
                    </Grid.Column>
                </Grid.Row>
              </Grid>
        </Modal.Content>
      </Modal>
          
      )
    }

        filterGifts = () => {
          const gifts = this.props.currentEvent.gifts.filter(gift => gift.contact_id === this.props.contact.id )
          // && gift.name !== "No Gift Yet"
          return gifts
        }

    render(){
        // console.log(this.props)
    
        let {name, gifts, birthday, avatar} = this.props.contact
        return (
          <Fragment>
            {!isEmpty(this.filterGifts()) ? 
          <Card>
            <Card.Content>
              <Image avatar src={avatar} floated="right"/>
              <Card.Header>{name}</Card.Header> 
              <Card.Meta>Gifts:</Card.Meta>           
               {/* {gifts.map(gift => <Card.Description>{gift.name}{"||  Price:  $"}{gift.price}</Card.Description>)} */}
               {this.filterGifts().map(gift => <Gifts key={gift.id} gift={gift}/>)}
            </Card.Content>
            {this.addGiftBtn()}
         </Card>
        :
        null 
        }
         </Fragment>)
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
import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Form } from 'semantic-ui-react';
import {  updatingGift } from '../redux/actions/gifts';

class GiftForm extends React.Component {

      constructor(props){
        super(props)
      
        console.log(props)
            this.state = {
              id: props.gift ? props.gift.id : "",
              name: props.gift ? props.gift.name : "",
              price: props.gift ? props.gift.price : "",
              given: props.gift ? props.gift.given : false,
              rating: props.gift ? props.gift.rating : 0,
              link: props.gift ? props.gift.link : "",
              event_id: props.gift ? props.gift.event_id : "",
              contact_id: props.gift ? props.gift.contact_id : ""
            }
          }

      handleChange = event => this.setState({
        [event.target.name]: event.target.value
      })


     
    handleSubmitForm = (event) => {
      event.preventDefault();
        this.props.updatingGift(this.state);
        this.props.handleClose('editGiftModal')
        // this.props.addingGiftToCurrentEvent(this.state)
    }

    render(){
        return (
            <Grid.Row>
            <Form onSubmit={this.handleSubmitForm}>
            <Form.Input 
              fluid label='Type Name of Gift' 
              name='name'
              placeholder='Gift Name'
              onChange={this.handleChange}
              value={this.state.name} />
              <Form.Input 
              fluid label='Type price of Gift' 
              name='price'
              placeholder='Gift Price'
              onChange={this.handleChange}
              value={this.state.price} />
              <Form.Input 
              fluid label='Link to Gift' 
              name='link'
              placeholder='Link to Gift'
              onChange={this.handleChange}
              value={this.state.link} />
              <Button>Submit</Button>
              </Form>
          </Grid.Row>)
    }
}

const mapStateToProps = (state )=> {
    return {
      events: state.events,
      user: state.user,
      loading: state.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      updatingGift: (newGift) => dispatch(updatingGift(newGift))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiftForm)
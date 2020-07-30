import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Form, Select, Label } from 'semantic-ui-react';
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

      handleChangeRating = (e, { value }) => this.setState({rating: value})
      ratingSelect = () => {
        return ([
          {key: 1, text: 1, value: 1},
          {key: 2, text: 2, value: 2},
          {key: 3, text: 3, value: 3},
          {key: 4, text: 4, value: 4},
          {key: 5, text: 5, value: 5},
          {key: 6, text: 6, value: 6},
          {key: 7, text: 7, value: 7},
          {key: 8, text: 8, value: 8},
          {key: 9, text: 9, value: 9},
          {key: 10, text: 10, value: 10}

        ])
      }
     
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
              type="number"
              placeholder='Gift Price'
              onChange={this.handleChange}
              value={this.state.price} />
              {/* <Form.Input 
              fluid label='Link to Gift' 
              name='link'
              placeholder='Link to Gift'
              onChange={this.handleChange}
              value={this.state.link} /> */}
              <Label>Rate Gift from 1-10 (10 being best Gift Ever)</Label>
              <Select
              label='Type price of Gift' 
                name='rating'
                upward
                fluid label='Change Rating' 
                placeholder="Select a Rating"
                options={this.ratingSelect()}
                onChange={this.handleChangeRating}
                value={this.state.rating}
                selection
              />
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
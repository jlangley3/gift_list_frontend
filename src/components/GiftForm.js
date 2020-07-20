import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid, Dropdown, Form } from 'semantic-ui-react';
import { addingGift } from '../redux/actions/gifts';

class GiftForm extends React.Component {

      constructor(){
          super();
          this.state = {
            currentContact: null,
            currentGift: null
          }
      }

      handleChange = (event, { name, value }) => {
        this.setState({ [name]: value });
      };
    contactDropdown = () => {
        return (
        this.props.user.contacts.map(contact => {return {key: contact.id, text: contact.name, value: contact}}) 
        )
      }
    handleContactChange = (e, { value }) => this.setState({currentContact: value})

     
    handleSubmitForm = (event) => {
       
        this.props.addingGift(this.state, this.props.event)
    }

    render(){
        console.log(this.props)
        return (
        <div>
            EC
            <Grid.Column>
            <Form.Input 
              fluid label='gift' 
              name='currentGift'
              placeholder='Gift'
              onChange={this.handleChange}
              value={this.state.currentGift} />
                <Dropdown
                  name='kind'
                  placeholder="Select and option"
                  options={this.contactDropdown()}
                 onChange={this.handleContactChange }
                 value={this.state.currentContact}
                  selection
                /><p />
              <Button onClick={this.handleSubmitForm}>Submit</Button>

          </Grid.Column>
            </div>)
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
      addingGiftContact: (newContactGift, thisEvent) => dispatch(addingGift(newContactGift, thisEvent))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiftForm)
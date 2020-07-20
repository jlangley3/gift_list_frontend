import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
import { Checkbox, Input, Grid, Sticky, Ref } from 'semantic-ui-react'
import { updateSearchTerm } from '../redux/actions/contacts'


class ContactContainer extends Component {
  

  render() {
    
    return(
      <div>
      <h2>
        Contact Cards
      </h2>
        <Grid stackable>
        <Grid.Row>
        <div className='ui two stackable cards'>
          {this.props.contacts.map(c => <ContactCard key={c.id} contact={c} />)}
          </div>
        </Grid.Row>
      </Grid>
      </div>
    )
    }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
import {  Grid } from 'semantic-ui-react'



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

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
    
//   }
// }


export default connect(mapStateToProps)(ContactContainer)
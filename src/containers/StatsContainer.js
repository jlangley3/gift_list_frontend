import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Label, Header, Grid } from 'semantic-ui-react';
import { addingEvent, updatingEvent, deletingEvent } from '../redux/actions/events';
import { setCurrentEvent } from '../redux/actions';
import moment from 'moment';
import { isEmpty } from 'lodash';


class StatsContainer extends Component {
  


  formatEvents = () => {
    return this.props.gifts.map(gift => {
      const {name, price, contact, rating} = gift

      return {
        name: name, 
        price: price,
        rating: rating,
        amt: true
      }
  })
}

giftPrice = () => { 
  var cash =  this.props.gifts.reduce(function(previousValue, currentValue) {
   return { price: previousValue.price + currentValue.price}})
   return <Label color='green' horizontal>${cash.price}</Label>
}





  render() {
    return (
      <Fragment>
      <Grid  stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing> 
              <Header.Content>
                QUICK STATISTICS
                
                
                {!isEmpty(this.props.gifts) ? <Header.Subheader>Total Spent on Gifts: {this.giftPrice()}</Header.Subheader> : null}
                    
                </Header.Content>
                
              </Header>
             
          </Grid.Column>
        </Grid.Row>
       </Grid>
      <BarChart
      width={900}
      height={600}
      data={this.formatEvents()}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis yAxisId="left" orientation="left" stroke="green"/>
          <YAxis yAxisId="right" orientation="right" stroke="red"/>
          <Tooltip/>
          <Legend />
          <Bar yAxisId="left" dataKey="price" fill="green" />
          <Bar yAxisId="right" dataKey="rating" fill="red" />
          </BarChart>
          </Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user,
      events: state.events,
      reminders: state.reminders,
      loading: state.loading,
      contacts: state.contacts,
      gifts: state.gifts,
      currentEvent: state.currentEvent
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      deletingEvent: (event) => dispatch(deletingEvent(event)),
      updatingEvent: (event) => dispatch(updatingEvent),
      addingEvent: (event) => dispatch(addingEvent),
      setCurrentEvent: (e) => dispatch(setCurrentEvent(e))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);

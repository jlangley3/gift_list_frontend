import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { editCurrentEvent, addingEvent, updatingEvent, deletingEvent } from '../redux/actions/events';
import { setCurrentEvent } from '../redux/actions';





const data = [
  {
    name: 'Page A', uv: 2000, pv: 2400, amt: 2000,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class StatsContainer extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';


  formatEvents = () => {
    return this.props.gifts.map(gift => {
              const {name, price, contact} = gift
  
            //   let startTime = start_date
            //   let endTime = end_date
  
              return {
                name: contact.name, 
                price: price,
                amt: true
              }
          })
  }



  render() {
    return (
      <BarChart
        width={1000}
        height={800}
        data={this.formatEvents()}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
        <Bar dataKey="price" fill="#82ca9d" />
      </BarChart>
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatsContainer));

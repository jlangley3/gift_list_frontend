import React from 'react'
// import { connect } from 'react-redux'
import { Header, Divider, Container } from 'semantic-ui-react'
import moment from 'moment'

const ReminderShow = ({reminder: {interval, msg, period, priority, recurring, start, contact_name}}) => {
  return (
    <React.Fragment>
      <Header as='h4' floated='left'>{moment(start).format('ll')}</Header>
      <Header as='h2' floated='right'> { msg }</Header>
      <Divider clearing />
        <Container>
          <p>{ contact_name }</p>
          { recurring ? 
          <React.Fragment>
            <p>Recurring Event</p> 
            <p>Interval (e.g. every 2 days, every 2 weeks): {interval}</p>
            <p>Period: { period }</p>
          </React.Fragment>
          : <p>Non-Recurring Event</p>}
        </Container>
      
    </React.Fragment>
  )
}

export default ReminderShow
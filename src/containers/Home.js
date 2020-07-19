import React from 'react'
import Logo from '../components/Logo'
import Reminders from '../components/RemindersList'
import ContactGroup from '../containers/ContactGroup'


const Home = () => {
  return (
    <>
      <h1>Welcome to your new Homepage</h1>
      <div className='homepage-container'> {/* this className is misleading. Refactor to use grid and contain the entire page?*/}
        <Logo />
        <Reminders />
      </div>

      <div>
        <ContactGroup />
      </div>

      <div>
        <h1>"Stuff"</h1>
        <StatsContainer />
      </div>
    </>
  )
}


export default Home
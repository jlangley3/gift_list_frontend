import React from 'react'
import UserForm from '../components/Register'

export default class NewUserContainer extends React.Component{

  render(){
    return (
    <div className='wrapper'>
      <h2>Sign Up!</h2>
      <UserForm />
    </div>
  )
  
}
}
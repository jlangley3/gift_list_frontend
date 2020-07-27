import React, {Component} from 'react';
import { Container, List, Header, Divider } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";

class Footer extends Component{

    render(){
       return (
    <footer>
      <Container className='footer'>
      <Divider clearing />
        <List bulleted horizontal link>
          <List.Item as='p'>Copyright 2020 Jesse Langley</List.Item>
          <List.Item as={ Link } to='/profile'>Home</List.Item>
          <List.Item as={ Link } to='/calendar'>Calender</List.Item>
          <List.Item as={ Link } to='/contacts'>Contacts</List.Item>
        </List>
      </Container>
    </footer>
  )   
    }

} 



export default Footer
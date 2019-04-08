import React, { Component } from 'react';
import { Input,Button, Checkbox, Icon, Table , Modal, Form} from 'semantic-ui-react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: true,
        user:this.props.location.state.user
    }
    console.log(this.props)
  }
  render() {
    const { error, isLoaded, items, open, size ,last_name,first_name, email,Phone ,DOB} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!this.state.user) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
         <Link  to={{pathname: '/'}}> <Button  icon='home' labelPosition='left' content="Back"/></Link>
    <Table definition>
    <Table.Header>
      <Table.Row>
        
        <Table.HeaderCell colSpan='2'>Single User Detail</Table.HeaderCell>
       
       
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>First Name</Table.Cell>
        <Table.Cell>{this.state.user.first_name}</Table.Cell>
        
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Last Name</Table.Cell>
        <Table.Cell>{this.state.user.last_name}</Table.Cell>
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Email</Table.Cell>
        <Table.Cell>{this.state.user.email}</Table.Cell>
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Phone No</Table.Cell>
        <Table.Cell>{this.state.user.phone}</Table.Cell>
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Date of Birth</Table.Cell>
        <Table.Cell>{this.state.user.dob}</Table.Cell>
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Active</Table.Cell>
        <Table.Cell><Checkbox slider value={this.state.user.active}
            checked={this.state.user.active === true}/></Table.Cell>
        
      </Table.Row>

    </Table.Body>
  </Table>
  </div>
      );
    
      }
    }
}
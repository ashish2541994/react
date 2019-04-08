import React, { Component } from 'react';
import { Input,Button, Checkbox, Icon, Table , Modal, Form} from 'semantic-ui-react'
import {  Link, BrowserRouter as Router } from 'react-router-dom'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
			isLoaded: false,
			Phone:'',
      items: [],
      selectedUser:'',
			open: false,
			firstName: '',
      lastName: '',
      email: '',
      location: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      locationError: false,
      formError: false,
      errorMessage: 'Please complete all required fields.',
			complete: false,
			name: '', submittedName: '', submittedEmail: '' }
    };
		handleChange = (e, { name, value }) => this.setState({ [name]: value })

		handleSubmit = () => {
			const { first_name, last_name,email,Phone,DOB } = this.state
	
      this.setState({ active:true,first_name: first_name, email: email,last_name: last_name,phone:Phone,dob:DOB})
      var userData=JSON.parse(localStorage.getItem('Users'));
      userData.push({ active:true,first_name: first_name, email: email,last_name: last_name,phone:Phone,dob:DOB});
      localStorage.removeItem('Users');
      localStorage.setItem('Users', JSON.stringify(userData));
      var updatedItems=JSON.parse(localStorage.getItem('Users'))
      this.setState({items:updatedItems,initialItems:updatedItems});
      this.close();
		}
  
  
  componentDidMount() {
    fetch("https://api.myjson.com/bins/pkisp")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
						items: result.users,
						initialItems: result.users
          });
          localStorage.setItem('Users', JSON.stringify(result.users));
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
	handleSearchChange=(e)=> {
	let currentList = [];
        // Variable to hold the filtered list before putting into state
    let newList = [];

        // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      currentList = this.state.items;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter(item => {
                // change current item to lowercase
        const fn = item.first_name.toLowerCase();
        const emailadd=item.email.toLowerCase();
                // change search term to lowercase
        const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
        return fn.includes(filter) ||emailadd.includes(filter);
      });
      console.log(newList);
      this.setState({
        items: newList
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.state.items;
      this.setState({
        items: this.state.initialItems
      });

    }
  }
	show = size => () => {
    if(size != 'large'){
      this.setState({ editItem:size, open: true,first_name:size.first_name,last_name:size.last_name,email:size.email,Phone:size.phone,DOB:size.dob})
    }else{
      this.setState({ size, open: true })
    }
    
  }
  close = () => this.setState({ open: false });
  delete = index => () => {
   console.log(index)
   var array = this.state.items;

   array.splice(index, 1);
   this.setState({items:array,isLoaded:true})
  }

  render() {
    const { error, isLoaded, items, open, size ,last_name,first_name, email,Phone ,DOB} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
				
			<div>
          
			<Input placeholder='Search...' onChange={this.handleSearchChange}  />
			<Table celled compact >
			<Table.Header fullWidth>
			<Table.Row>
						
						<Table.HeaderCell>First Name</Table.HeaderCell>
						<Table.HeaderCell>Last Name</Table.HeaderCell>
						<Table.HeaderCell>E-mail</Table.HeaderCell>
						<Table.HeaderCell>Phone</Table.HeaderCell>
						<Table.HeaderCell>DOB</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
					</Table.Row>
					
			</Table.Header>
		
			<Table.Body>
					
						
					{items.map( (item, index)=> (
					<Table.Row>
						
						<Table.Cell>{item.first_name}</Table.Cell>
						<Table.Cell>{item.last_name}</Table.Cell>
						<Table.Cell>{item.email}</Table.Cell>
						<Table.Cell>{item.phone}</Table.Cell>
						<Table.Cell>{item.dob}</Table.Cell>
						<Table.HeaderCell collapsing>
							<Checkbox slider value={item.active}
            checked={item.active === true}/>
						</Table.HeaderCell>
          <Table.Cell>
      <Link  to={{pathname: '/users',state: {user: item}}}><Button ><Button.Content visible>
      <Icon name='eye' /></Button.Content></Button></Link>

      <Button  onClick={this.show(item)}><Button.Content visible><Icon name='edit' /></Button.Content></Button>
      <Button onClick={this.delete(index)}><Button.Content visible><Icon name='user delete'  /></Button.Content></Button>
      </Table.Cell>
			</Table.Row>
			))}
			</Table.Body>
		
				<Table.Footer fullWidth>
					<Table.Row>
						
						<Table.HeaderCell colSpan='7'>
							<Button floated='left' icon labelPosition='left' primary size='small'  onClick={this.show('large')}>
								<Icon name='user' /> Add User
							</Button>
							
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
			<Modal size={size} open={open} onClose={this.close}>
        <Modal.Header>Add or Update Details</Modal.Header>
          <Modal.Content>
			      <Form onSubmit={this.handleSubmit}  widths='equal'>
              <Form.Group>
              <Form.Input required={true} name='first_name' label='First Name' placeholder="First Names"  value={first_name} onChange={this.handleChange} />
              <Form.Input
						  required={true} 
              placeholder='Last Name'
              name='last_name'
							value={last_name}
							label='Last Name' placeholder="Last Names" 
              onChange={this.handleChange}
              />
            
            </Form.Group>
					  <Form.Group>
            <Form.Input
							placeholder='Email'
							required={true} 
              name='email'
							value={email}
							label='Email' placeholder="abc@abc.com" 
              onChange={this.handleChange}
              />
            
            </Form.Group>
					  <Form.Group>
            <Form.Input placeholder='Phone' required={true} name='Phone' label='Phone' value={Phone} onChange={this.handleChange} />
            <Form.Input placeholder='DOB' required={true} name='DOB' label='DOB' type="date" value={DOB} onChange={this.handleChange} />
           
            </Form.Group>
					
					  <Form.Button positive icon='checkmark' labelPosition='right' content="Submit"/>
          
        </Form>
        
	      </Modal.Content>
	
        </Modal>
        
      </div>
      );
    }
  }
}
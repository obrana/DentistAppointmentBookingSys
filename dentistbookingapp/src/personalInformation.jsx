import React, { Component } from 'react';
import {  Form } from 'react-bootstrap';

class personalInformation extends Component {
    render() {
        return (
          <Form>
            <Form.Group controlId="formTime">
                <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                required="true"
                value={this.props.name}
                onChange={this.props.onNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Control 
                type="text" 
                placeholder="Enter your Email" 
                required="true"
                value={this.props.email}
                onChange={this.props.onEmailChange}
                />
              </Form.Group>
              <Form.Group controlId="formphone">
                <Form.Control 
                type="int" 
                placeholder="Enter your Phone Number" 
                required="true"
                value={this.props.phone}
                onChange={this.props.onphoneChange}
                />
              </Form.Group>
          </Form>
        );
    }
}

export default personalInformation;
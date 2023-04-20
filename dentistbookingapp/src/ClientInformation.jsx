import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class ClientInformation extends Component {
    state = {
        name: '',
        email: '',
        phone: '',

    };

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });

    };
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };
    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value })
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" required="true" value={this.state.name} onChange={this.handleNameChange} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Email" required="true" value={this.state.email} onChange={this.handleEmailChange} />
                </Form.Group>
                <Form.Group controlId="formNumber">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Phone Number" required="true" value={this.state.phone} onChange={this.handlePhoneChange} />
                </Form.Group>
                <button type="submit">Next</button>
            </Form>
        );
    }
}

export default ClientInformation;
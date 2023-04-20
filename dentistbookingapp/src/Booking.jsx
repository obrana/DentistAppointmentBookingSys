import React, { Component } from 'react';
import { Form , Button} from 'react-bootstrap';
import Calendar from 'react-calendar';

class Booking extends Component {
    state = {
        showCalendar: false,
    }


    toggleCalendar = () => {
        this.setState((prevState) => ({
            showCalendar: !prevState.showCalendar,
        }));
    };
 
    
    
    render() {
        return (
            <Form>
            <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <input
              id="date"
              type="text"
              value={this.state.date}
              onClick={this.toggleCalendar}
              InputProps={{ readOnly: true }}
              variant="outlined"
              placeholder="YYYY-MM-DD"
            />
            <i class="fa-regular fa-calendar" onClick={this.toggleCalendar}></i>
            {this.state.showCalendar && <Calendar onChange={this.handleDateChange} />}
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time:</Form.Label>
            <Form.Control type="time" placeholder="HH:MM" value={this.state.time} onChange={this.handleTimeChange} required="true" />
          </Form.Group>
        
          </Form>
        );
    }
}

export default Booking;
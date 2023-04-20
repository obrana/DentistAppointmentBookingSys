import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';
import { Button, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BookingList from './BookingList';



class BookingForm extends React.Component {

  state = {
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    showCalendar: false,
    bookings: []
  };

  componentDidMount() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    this.setState({ bookings });

  }
  handleDateChange = date => {
    // Validate the date
    const today = new Date().setHours(0, 0, 0, 0);
    if (date < today) {
      alert("Please select a future date");
      return;
    }
    this.setState({ date: date.toISOString().substr(0, 10), showCalendar: false });
  };

  handleTimeChange = event => {
    const time = event.target.value;
    // Validate the time
    const date = this.state.date;
    if (!date) {
      alert("Please select a date first");
      return;
    }
    const now = new Date();
    const selectedDate = new Date(`${date}T${time}`);
    if (selectedDate < now) {
      alert("Please select a future time");
      return;
    }
    this.setState({ time });
  };
  handleNameChange = (event) => {
    this.setState({name: event.target.value});

  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value })
  };

  toggleCalendar = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { date, time, name, email, phone } = this.state;
    const booking = { date, time, name, email, phone };
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking submitted successfully');
    this.setState({
      personalInformation: 1,
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',

    });
  };


  render() {
    return (
      <div className="container">
        <div className="booking-form">
         
            <div className="col-md-6">
              <h1>IT Offer Dental Appoinment Booking System</h1>
               <Form onSubmit={this.handleSubmit}>
              <h2>Book an appointment</h2>
              <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" required="true"  value={this.state.name} onChange={this.handleNameChange}/>
              </Form.Group>
              <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Email" required="true" value={this.state.email} onChange={this.handleEmailChange}/>
              </Form.Group>
              <Form.Group controlId="formNumber">
              <Form.Label>Phone Number:</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Phone Number" required="true"value={this.state.phone} onChange={this.handlePhoneChange} />
              </Form.Group>
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
              <Button variant="primary" type="submit">
                Book Appointment
              </Button> 

<BookingList/>
              </Form>
            </div>

          </div>
        </div>
    
    );
  }
}

export default BookingForm;

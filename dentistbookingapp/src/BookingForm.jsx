import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';
import { Button, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';



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
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h1>IT Offer Dental Appoinment Booking System</h1>
              {/* <Form onSubmit={this.handleSubmit}>
                {this.state.step === 1 && (
                  <personalInformation
                    name={this.state.name}
                    email={this.state.email}
                    phone={this.state.phone}
                    onNameChange={this.handleNameChange}
                    onEmailChange={this.handleEmailChange}
                    onPhoneChange={this.handlePhoneChange}
                  />
                )}

                {this.state.step === 2 && (
                  <appointment date={this.state.date}
                    time={this.state.time}
                    onDaateChange={this.handleDateChange}
                    onTimeChange={this.handleTimeChange}
                  />

                )}
                <div className="row">
                  <div className="col text-center">
                    {this.state.step > 1 && (
                      <button type="button" className="btn btn-secondary mr-2" onClick={() => this.setState({ step: this.state.step - 1 })}>
                        Previous
                      </button>
                    )}
                    {this.state.step < 2 ? (
                      <button type="button" className="btn btn-primary" onClick={() => this.setState({ step: this.state.step + 1 })}>
                        Next
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Book Appointment
                      </button>
                    )}
                  </div>
                </div>
              </Form> */}
               <Form onSubmit={this.handleSubmit}>
              <h2>Book an appointment</h2>
              <Form.Group controlId="formTime">
                <Form.Control type="text" placeholder="Enter Your Name" required="true"  value={this.state.name} onChange={this.handleNameChange}/>
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Control type="text" placeholder="Enter Your Email" required="true" value={this.state.email} onChange={this.handleEmailChange}/>
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Control type="number" placeholder="Enter Your Phone Number" required="true"value={this.state.phone} onChange={this.handlePhoneChange} />
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
                />
                <i class="fa-regular fa-calendar" onClick={this.toggleCalendar}></i>
                {this.state.showCalendar && <Calendar onChange={this.handleDateChange} />}
              </Form.Group>

              <Form.Group controlId="formTime">
                <Form.Control type="time" value={this.state.time} onChange={this.handleTimeChange} required="true" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Book Appointment
              </Button> 


              <div className="mt-4">
                <h2>Bookings</h2>
                <ul className="list-group">
                  {JSON.parse(localStorage.getItem('bookings') || '[]').map((booking, index) => (
                    <li className="list-group-item" key={index}>
                       <strong>Name:</strong> {booking.name} <br />
                       <strong>Email:</strong> {booking.email} <br />
                       <strong>Phone Number:</strong> {booking.phone} <br />
                      <strong>Date:</strong> {booking.date} <br />
                      <strong>Time:</strong> {booking.time}
                    </li>
                  ))}
                </ul>
              </div>
              </Form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default BookingForm;

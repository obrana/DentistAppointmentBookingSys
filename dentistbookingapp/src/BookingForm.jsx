import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';
import { Button, Form } from 'react-bootstrap';

class BookingForm extends React.Component {

  state = {
    date: '',
    time: '',
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

  toggleCalendar = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { date, time } = this.state;
    const booking = { date, time };
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking submitted successfully');
    this.setState({ date: '', time: '' });
  };


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1>IT Offer Dental Appoinment Booking System</h1>

            <Form onSubmit={this.handleSubmit} className="mt-5 p-4 border border-2 border-secondary rounded">
              <h2>Book an appointment</h2>
              <div className="form-group">
                <label htmlFor="dateInput">Date:</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="dateInput"
                    placeholder="YYYY-MM-DD"
                    value={this.state.date}
                    onChange={() => { }}
                    onClick={this.toggleCalendar}
                    readOnly
                  />
                  <Button type="button" className="btn btn-outline-secondary" onClick={this.toggleCalendar}>
                    <i className="bi bi-calendar"></i>
                  </Button>
                </div>
                {this.state.showCalendar && <Calendar onChange={this.handleDateChange} />}
              </div>
              <div className="form-group">
                <label htmlFor="timeInput">Time:</label>
                <input
                  type="time"
                  className="form-control"
                  id="timeInput"
                  value={this.state.time}
                  onChange={this.handleTimeChange}
                />
              </div>
              <Button variant="primary" type="submit">
                Book Appointment
              </Button>
              <div className="mt-4">
                <h2>Bookings</h2>
                <ul className="list-group">
                  {JSON.parse(localStorage.getItem('bookings') || '[]').map((booking, index) => (
                    <li className="list-group-item" key={index}>
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
    );
  }
}

export default BookingForm;

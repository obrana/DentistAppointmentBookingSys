import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';

class BookingForm extends React.Component {
  state = {
    date: '',
    time: '',
    showCalendar: false
  };

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
    alert("booking completed");

}
  render() {
    return (
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1>IT Offfer Dental Appoinment Booking System</h1>
            <form className="booking-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="date-input">Date:</label>
                <div className="input-group">
                  <input id="date-input" type="text" value={this.state.date} onClick={this.toggleCalendar} readOnly className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                  </div>
                </div>
                {this.state.showCalendar && <Calendar className="calendar" value={this.state.date} onChange={this.handleDateChange} />}
              </div>
              <div className="form-group">
                <label htmlFor="time-input">Time:</label>
                <input id="time-input" type="time" value={this.state.time} onChange={this.handleTimeChange} className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingForm;

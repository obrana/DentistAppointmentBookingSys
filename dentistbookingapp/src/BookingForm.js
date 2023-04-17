import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Date:
          <input type="text" value={this.state.date} onClick={this.toggleCalendar} readOnly />
          {this.state.showCalendar && <Calendar value={this.state.date} onChange={this.handleDateChange} />}
        </label>
        <br />
        <label>
          Time:
          <input type="time" value={this.state.time} onChange={this.handleTimeChange} />
        </label>
        <br />
        <button type="submit">Book Appointment</button>
      </form>
    );
  }
}

export default BookingForm;

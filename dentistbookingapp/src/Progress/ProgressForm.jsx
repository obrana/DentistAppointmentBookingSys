import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {  ProgressBar } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';


class ProgressForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    showCalendar: false,
    bookings: [],
    currentStep: 0
  };

  handleProgress = () => {
    this.setState((prevState) => ({
      currentStep: prevState.currentStep + 1,
    }));
  }

  componentDidMount() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    this.setState({ bookings });
  }

  handleNameChange = event => {
    this.setState({ firstName: event.target.value });
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, date, time, message } = this.state;
    const booking = { firstName, lastName, email, phone, date, time, message };
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking submitted successfully');
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    });
    this.handleProgress();
  };

  render() {
    const { firstName, lastName, email, phone, date, time, message, showCalendar, currentStep } = this.state;
    const steps = [
      {
        id: 1,
        component: <PersonalInfo handleProgress={this.handleProgress} firstName={firstName} lastName={lastName} email={email} phone={phone} handleNameChange={this.handleNameChange} handleEmailChange={this.handleEmailChange} handlePhoneChange={this.handlePhoneChange} />,
      },
      {
        id: 2,
        component: <BookingDetails handleProgress={this.handleProgress} date={date} time={time} message={message} handleDateChange={this.handleDateChange} handleTimeChange={this.handleTimeChange} />,
      },
      {
        id: 3,
        component: <Confirmation handleProgress={this.handleProgress} firstName={firstName} lastName={lastName} email={email} phone={phone} date={date} time={time} message={message} />,
      }
    ];

    return (
      <div className="booking-form">
        <h2>Book an appointment</h2>
        <ProgressBar currentStep={currentStep} steps={steps} />

        <form>
          {steps[currentStep - 1].component}

          {currentStep === 2 && (
            <button type="button" onClick={() => this.setState({ showCalendar: !showCalendar })}>
              {showCalendar ? 'Hide Calendar' : 'Select a Date'}
            </button>
          )}

          {showCalendar && currentStep === 2 && (
            <Calendar handleDateChange={this.handleDateChange} />
          )}

          <div className="buttons">
            {currentStep > 1 && (
              <button type="button" onClick={this.handlePrevious}>
                Previous
              </button>
            )}

            {currentStep < steps.length && (
              <button type="button" onClick={this.handleNext}>
                Next
              </button>
            )}

            {currentStep === steps.length && (
              <button type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
class PersonalInfo extends Component {
  render() {
    const { firstName, lastName, email, phone, handleNameChange, handleEmailChange, handlePhoneChange } = this.props;
    return (
      <div>
        <h2>Personal Information</h2>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleNameChange('firstName')} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleNameChange('lastName')} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange('email')} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={handlePhoneChange('phone')} />
        </div>
        <button onClick={this.props.handleProgress}>Next</button>
      </div>
    );
  }
}

class BookingDetails extends Component {
  render() {
    const { date, time, message, handleDateChange, handleTimeChange } = this.props;
    return (
      <div>
        <h2>Booking Details</h2>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={this.props.handleMessageChange}></textarea>
        </div>
        <button onClick={this.props.handleProgress}>Next</button>
      </div>
    );
  }
}

class Confirmation extends Component {
  render() {
    const { firstName, lastName, email, phone, date, time, message } = this.props;
    return (
      <div>
        <h2>Confirmation</h2>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Message: {message}</p>
        <button onClick={this.props.handleReset}>Reset</button>
      </div>
    );
  }
}



export default ProgressForm;
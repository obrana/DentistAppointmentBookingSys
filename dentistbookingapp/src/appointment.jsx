import React, { Component } from 'react';
import Calendar from 'react-calendar';

class appointment extends Component {
    state = {
        showCalendar: false,
    }
    handleDateChange = (date) => {
        this.props.onDateChange(date);
    };

    toggleCalendar = () => {
        this.setState((prevState) => ({
            showCalendar: !prevState.showCalendar,
        }));
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="dateInput">Date:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="dateInput"
                            placeholder="YYYY-MM-DD"
                            value={this.props.date}
                            onChange={() => { }}
                            onClick={this.toggleCalendar}
                            readOnly
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={this.toggleCalendar}>
                            <i className="bi bi-calendar"></i>
                        </button>
                    </div>
                    {this.state.showCalendar && <Calendar onChange={this.handleDateChange} />}
                </div>
                <div className="form-group">
                    <label htmlFor="timeInput">Time:</label>
                    <input
                        type="time"
                        className="form-control"
                        id="timeInput"
                        value={this.props.time}
                        onChange={this.props.onTimeChange}
                    />
                </div>
            </div>
        );
    }
}

export default appointment;
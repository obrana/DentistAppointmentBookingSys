import React, { Component } from 'react';


class BookingList extends Component {
    render() {
        return (
         
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
        );
    }
}

export default BookingList;
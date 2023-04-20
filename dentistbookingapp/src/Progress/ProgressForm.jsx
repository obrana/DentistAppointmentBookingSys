import React, { useState } from 'react';
import ClientInformation from '../ClientInformation';
import BookingForm from '../BookingForm';

function ProgressForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleProgress = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    {
      id: 1,
      component: <ClientInformation handleProgress={handleProgress} />,
    },
    {
      id: 2,
      component: <BookingForm handleProgress={handleProgress} />,
    },
    {
      id: 3,
      component: <Confirmation />,
    },
  ];

  const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    return (
      <div className="progress-bar">
        <div className="progress-bar__progress" style={{ width: `${progress}%` }} />
      </div>
    );
  };

  return (
    <div className="progress-form">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      {steps[currentStep].component}
    </div>
  );
}

function PersonalInfo({ handleProgress }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    handleProgress();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Personal Information</h3>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  );
}

function PaymentDetails({ handleProgress }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    handleProgress();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment Details</h3>
      <label htmlFor="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        value={cardNumber}
        onChange={(event) => setCardNumber(event.target.value)}
      />
      <label htmlFor="expiryDate">Expiry Date:</label>
      <input
        type="text"
        id="expiryDate"
        value={expiryDate}
        onChange={(event) => setExpiryDate(event.target.value)}
      />
      <label htmlFor="cvv">CVV:</label>
      <input
        type="text"
        id="cvv"
        value={cvv}
        onChange={(event) => setCvv(event.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  );
}

function Confirmation() {
  return (
    <div>
      <h3>Confirmation</h3>
      <p>Thank you for your order!</p>
    </div>
  );
}

export default ProgressForm;
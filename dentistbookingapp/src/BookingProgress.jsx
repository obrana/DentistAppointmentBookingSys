import React, { Component } from 'react';
import { useState } from 'react';
import ClientInformation from './ClientInformation';
import BookingForm from './BookingForm';



const Progress = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 2;
    
    const handleProgress = () => {
        setCurrentStep(currentStep + 1);
    };
    const steps = [
        {
            id: 0,
            name: "Personal Information",
            component: ClientInformation,
        },
        {
            id: 1,
            name: "Appointment Book",
            component: BookingForm,
        },
    ];

   
    const Progress = steps[currentStep].component;

    return (
        <div className='App'>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <Progress handleProgress={handleProgress} />
        </div>
    );
}

function ProgressBar({ currentStep, totalSteps }) {
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
  
    return (
      <div className="progress-bar">
        <div className="progress-bar__steps">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              className={`progress-bar__step ${
                currentStep >= index ? "active" : ""
              }`}
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div
          className="progress-bar__progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    );
  }

export default Progress;
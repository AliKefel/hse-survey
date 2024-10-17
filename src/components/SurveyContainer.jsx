import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SurveyA from '../components/SurveyA';
import SurveyB from '../components/SurveyB';
import SurveyC from '../components/SurveyC';

function SurveyContainer({ surveyOrder, money, setMoney, participantId }) {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // Load saved index from local storage on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentSurveyIndex');
    if (savedIndex) {
      setCurrentSurveyIndex(Number(savedIndex));
    }
  }, []);

  useEffect(() => {
    // Save current index to local storage whenever it changes
    localStorage.setItem('currentSurveyIndex', currentSurveyIndex);
  }, [currentSurveyIndex]);

  const handleSurveyCompletion = async () => {
    try {
      const currentSurveyId = surveyOrder[currentSurveyIndex]; // Get the current survey ID
      console.log('Sending data to API...');
      console.log('Survey Order:', surveyOrder);
      console.log('Current Survey Index:', currentSurveyIndex);
      console.log('Current Survey ID:', currentSurveyId);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/survey/${currentSurveyId}/survey-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId: participantId,
          surveyId: currentSurveyId,
          buttonClicks: buttonClicks, // ensure this variable is defined
          money: money,
        }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error details:', errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Survey result saved successfully:', data);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    // Move to the next survey or handle completion
    setCurrentSurveyIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Check if we have more surveys
      if (nextIndex < surveyOrder.length) {
        return nextIndex;
      } else {
        // All surveys completed
        console.log('All surveys completed');
        // You can navigate to a completion page or show a message
        navigate('/completion'); // Change to your desired route
        return prevIndex; // Prevent index overflow
      }
    });
  };

  const renderSurvey = () => {
    const surveyId = surveyOrder[currentSurveyIndex];

    switch (surveyId) {
      case 'A':
        return (
          <SurveyA
            money={money}
            setMoney={setMoney}
            buttonClicks={buttonClicks}
            setButtonClicks={setButtonClicks}
            onSubmit={handleSurveyCompletion}
            participantId={participantId} // Pass participant ID to SurveyA
          />
        );
      case 'B':
        return (
          <SurveyB
            money={money}
            setMoney={setMoney}
            buttonClicks={buttonClicks}
            setButtonClicks={setButtonClicks}
            onSubmit={handleSurveyCompletion}
            participantId={participantId} // Pass participant ID to SurveyB
          />
        );
      case 'C':
        return (
          <SurveyC
            money={money}
            setMoney={setMoney}
            buttonClicks={buttonClicks}
            setButtonClicks={setButtonClicks}
            onSubmit={handleSurveyCompletion}
            participantId={participantId} // Pass participant ID to SurveyC
          />
        );
      default:
        return <div>Survey Not Found</div>;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-gray-700">
      <div className="border-2 border-red-600 p-4 bg-white shadow-lg mt-8 rounded-lg w-3/4 h-1/2">
        {renderSurvey()}
      </div>
    </div>
  );
}

export default SurveyContainer;

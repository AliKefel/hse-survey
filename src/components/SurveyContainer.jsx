import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SurveyA from '../components/SurveyA';
import SurveyB from '../components/SurveyB';
import SurveyC from '../components/SurveyC';
import { set } from 'mongoose';

function SurveyContainer({ surveyOrder, money, setMoney, participantId }) {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSurveyCompletion = async () => {
    try {
        console.log('Sending data to API...');

        const response = await fetch('http://localhost:5003/api/survey-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                participantId: participantId,
                surveyId: surveyOrder[currentSurveyIndex],
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
    setCurrentSurveyIndex((prevIndex) => prevIndex + 1);
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SurveyA from '../components/SurveyA';
import SurveyB from '../components/SurveyB';
import SurveyC from '../components/SurveyC';

function SurveyContainer({ surveyOrder, money, setMoney, participantId }) {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false); // Add loading state



  const handleSurveyCompletion = async () => {
    try {
      setLoading(true); // Set loading to true
      const currentSurveyId = surveyOrder[currentSurveyIndex]; // Get the current survey ID

      console.log('Sending data to API...');
      console.log('Survey Order:', surveyOrder);
      console.log('Current Survey Index:', currentSurveyIndex);
      console.log('Current Survey ID:', currentSurveyId);

      const apiUrl = `${import.meta.env.VITE_API_URL}/survey-results`;

      console.log('API URL:', apiUrl); // Log the URL to check its value
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId: participantId,
          surveyId: currentSurveyId,
          buttonClicks: buttonClicks,
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
    setMoney(200); // Reset money to 200
    setButtonClicks(0); // Reset button clicks to 0

    // Move to the next survey or handle completion
    setCurrentSurveyIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Check if we have more surveys
      if (nextIndex < surveyOrder.length) {
        setLoading(false); // End loading before moving to next survey

        return nextIndex;
      } else {
        // All surveys completed
        console.log('All surveys completed');
        setLoading(false); // End loading before moving to next survey

        navigate('/completion'); // Change to your desired route
        return prevIndex; // Prevent index overflow
      }
    });
  };

  const renderSurvey = () => {

    while (loading) {
      return (
        <div className='text-black flex justify-center items-center font-xl font-bold'>Loading...</div> // Show loading spinner/message

      )
      
    }
    // Check if surveyOrder is empty or undefined
    if (!surveyOrder || surveyOrder.length === 0) {
      return <div>Loading...</div>; // Handle the case where the surveyOrder is empty
      console.log('Survey Order empty :', surveyOrder);
    }

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
    <div className="w-screen h-screen flex justify-center " style={{backgroundColor: "#33219c"}}>
      <div className="border-8 border-black  p-4 bg-white shadow-lg mt-8 rounded-lg w-3/4 h-fit">
        {renderSurvey()}
      </div>
    </div>
  );
}

export default SurveyContainer;

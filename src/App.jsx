import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SurveyContainer from './components/SurveyContainer';
import surveyOrderData from './surveyOrder.json';
import axios from 'axios';
import CompletionPage from './components/CompletionPage';




function App() {


    const [participantNumber, setParticipantNumber] = useState('');
    const [surveyOrder, setSurveyOrder] = useState([]);
    const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
    const [money, setMoney] = useState(200); // Initialize money state
    const navigate = useNavigate();


    const handleParticipantSubmit = () => {

        const order = surveyOrderData[participantNumber]?.surveyOrder;
        
        console.log('Order:', order);
        console.log('Participant Number:', participantNumber);

        if (order) {
            setSurveyOrder(order);
            setCurrentSurveyIndex(0); // Set to the first survey index
            // Redirect to the first survey in their order
            const firstSurveyUrl = `/survey/${order[0]}`;
            console.log('Navigating to:', firstSurveyUrl); // Log the URL
            // Redirect to the first survey in their order
            navigate(firstSurveyUrl);
        } else {
            alert('Invalid Participant Number');
        }
    };

    // Function to navigate to the next survey
    const nextSurvey = async () => {
        // Check if there are more surveys to complete
        if (currentSurveyIndex < surveyOrder.length ) {
            // Increment the current survey index
            const nextIndex = currentSurveyIndex + 1;
            setCurrentSurveyIndex(nextIndex); // Update the index state
            // Navigate to the next survey
            setMoney(200); // Reset money to 200
            setButtonClicks(0); // Reset button clicks to 0

            navigate(`/survey/${surveyOrder[nextIndex]}`);

        } else {
            console.log('All surveys completed');
            // Handle completion logic here (e.g., show summary or redirect)
            try {
                
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/survey-results`, {
                    participantNumber,
                    surveyData: { money, surveyOrder },
                });
                console.log('Survey data saved:', response.data);
            } catch (error) {
                console.error('Error saving survey data:', error);
            }
        }
    };


    return (

        <div className="App">

            <Routes>
                <Route path="/" element={
                    <div className="participant-input-page w-screen h-screen flex justify-center mb-20 items-start pt-14 bg-gray-700">
                        <div className="p-4 bg-white rounded-xl w-1/2 border-8 border-black">
                            <h1 className="text-xl font-bold text-black mb-4">Enter Your Participant Number</h1>
                            <input
                                type="text"
                                value={participantNumber}
                                onChange={(e) => setParticipantNumber(e.target.value)}
                                className="border-2 p-2 rounded w-full mb-4"
                                placeholder="Participant Number"
                            />
                            <button onClick={handleParticipantSubmit} className=" w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded" >
                                Submit
                            </button>
                        </div>
                    </div>
                } />

                <Route path="/survey/:surveyId" element={
                    <SurveyContainer
                        surveyOrder={surveyOrder}
                        currentSurveyIndex={currentSurveyIndex}
                        money={money}       // Pass money state to SurveyContainer
                        setMoney={setMoney} // Pass setMoney function to SurveyContainer
                        nextSurvey={nextSurvey} // Pass nextSurvey function for navigation
                        participantId={participantNumber} // Pass participantId (participantNumber)

                    />
                } />

                <Route path="/completion" element={
                    <CompletionPage
                        participantNumber={participantNumber}
                        money={money}
                    />
                } />

            </Routes>
        </div>

    );
}

export default App;
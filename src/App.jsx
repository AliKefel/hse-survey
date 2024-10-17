import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SurveyContainer from './components/SurveyContainer';
import surveyOrderData from './surveyOrder.json';
import axios from 'axios';

function App() {
    const [participantNumber, setParticipantNumber] = useState('');
    const [surveyOrder, setSurveyOrder] = useState([]);
    const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
    const [money, setMoney] = useState(200); // Initialize money state

    // Function to handle participant submission
    const handleParticipantSubmit = () => {
        const order = surveyOrderData[participantNumber]?.surveyOrder;

        console.log('Order:', order);
        console.log('Participant Number:', participantNumber);

        if (order) {
            setSurveyOrder(order);
            setCurrentSurveyIndex(0); // Set to the first survey index
            // Redirect to the first survey in their order
            navigate(`/survey/${order[0]}`);
        } else {
            alert('Invalid Participant Number');
        }
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <div className="participant-input-page w-screen h-screen flex justify-center items-center bg-gray-700">
                        <div className="p-4 bg-white rounded-xl w-1/2">
                            <h1 className="text-xl font-bold text-black mb-4">Enter Your Participant Number</h1>
                            <input
                                type="text"
                                value={participantNumber}
                                onChange={(e) => setParticipantNumber(e.target.value)}
                                className="border-2 p-2 rounded w-full mb-4"
                                placeholder="Participant Number"
                            />
                            <button onClick={handleParticipantSubmit} className="bg-blue-500 text-white p-2 rounded w-full">
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
                        setCurrentSurveyIndex={setCurrentSurveyIndex} // Pass setter to manage index from SurveyContainer
                    />
                } />
            </Routes>
        </div>
    );
}

export default App;
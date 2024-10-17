import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletionPage = ({ participantNumber, money }) => {
    const navigate = useNavigate();

    const handleFinish = () => {
        // Redirect to homepage or any other page after they finish
        navigate('/');
    };

    return (
        <div className="completion-page w-screen h-screen flex flex-col justify-center items-center " style={{backgroundColor: "#33219c"}}>
            <div className="p-4 bg-black rounded-lg shadow-lg w-1/2 text-center">
                <h1 className="text-2xl font-bold mb-4">Survey Complete!</h1>
                <p className="text-lg mb-4">
                    Thank you, Participant {participantNumber}, for completing the surveys.
                </p>
                <button onClick={handleFinish} className=" bg-blue-600  mt-4 w-full hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded">
                    Finish
                </button>
            </div>
        </div>
    );
};

export default CompletionPage;

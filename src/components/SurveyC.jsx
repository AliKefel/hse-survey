import React, { useState } from 'react';

function SurveyC({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Initial content from chatbot...");
  const [option, setOption] = useState(0);

  const chatBotOutput = {
    1: "provides decision recommendation without any rationale",
    2: "provides decision recommendation regarding broader objective",
    3: "provides decision recommendation based on previous results",
    4: "provides decision recommendation and key factors behind the decision",
    5: "provides decision recommendation, key factors behind the decision, and simplified explanation of algorithm design",
    6: "provides decision recommendation, key factors behind the decision, and alternative recommendations",
    7: "provides all previous levels of information and inputs and weight of factors and limitations of machine",
    8: "provides all previous levels of information and data source and error rate",
    9: "provides all previous information and potential risks to the user"
  };

  const costForLevel1 = 10;
  const costForLevel2 = 20;
  const costForLevel3 = 30;

  const handleClick = () => {
    let cost = 0;

    if (clickCount < 3) {
      cost = costForLevel1;
    } else if (clickCount >= 3 && clickCount < 6) {
      cost = costForLevel2;
      setTransparencyLevel(2);
    } else if (clickCount >= 6) {
      cost = costForLevel3;
      setTransparencyLevel(3);
    }

    setMoney(prevMoney => prevMoney - cost);
    setButtonClicks(prevClicks => prevClicks + 1);

    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      updateChatBotContent(newCount);
      return newCount;
    });
  };

  const updateChatBotContent = (newClickCount) => {
    for (let i = 1; i <= 9; i++) {
      if (newClickCount === i) {
        setChatBotContent(chatBotOutput[i]);
      }
    }
  };

  const handleSubmit = () => {
    console.log('Survey C submitted');
    console.log('Button Clicks:', buttonClicks);
    onSubmit();
  };

  const handleOption = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-black">Survey C</h1>
        <p className="text-black font-bold text-lg">Money Left: ${money}</p>
      </div>

      <span className="text-black text-xl items-center flex border-2 border-black rounded-md p-5">
        Scenario: This survey is in the context of a stranger.
      </span>

      <div className='flex flex-row'>
        <span className="text-black font-bold text-xl items-center flex">
          Content from chatbot:
        </span>
        <span className="text-black text-xl items-center flex">{chatBotContent}</span>
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={handleClick}
          className="bg-blue-600 mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Click for more information, cost: $
          {clickCount < 3
            ? costForLevel1
            : clickCount >= 3 && clickCount < 6
              ? costForLevel2
              : costForLevel3}
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => handleOption(1)}
          className="bg-blue-600 mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Option A
        </button>
        <button
          onClick={() => handleOption(2)}
          className="bg-blue-600 mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Option B
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${option === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={option === 0}
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}

export default SurveyC;
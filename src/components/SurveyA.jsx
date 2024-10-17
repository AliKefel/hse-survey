import React, { useState } from 'react';

function SurveyA({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Initial content from chatbot...");
  const [option, setOption] = useState(0);

  const chatBotOutput = {
    1 : "provides decision recommendation without any rationale",
    2 : "provides decision recommendation regarding broader objective",
    3 : "provides decision recommendation based on previous results", 
    4 : "provides decision recommendation and key factors behind the decision",
    5 : "provides decision recommendation, key factors behind the decision, and simplified explanation of algorithm design", 
    6 : "provides decision recommendation, key factors behind the decision, and alternative recommendations",
    7 : "provides all previous levels of information and inputs and weight of factors and limitations of machine", 
    8 : "provides all previous levels of information and data source and error rate", 
    9 : "provides all previous information and potential risks to the user"
  };
  //  costs for each transparency level
  const costForLevel1 = 10;
  const costForLevel2 = 20;
  const costForLevel3 = 30;

  // Handle button click to increase transparency

  const handleClick = () => {
    let cost = 0;

    // Determine the cost based on transparency level
    if (clickCount < 3) {
      cost = costForLevel1; // Level 1 (clicks 1-3)
    }else if (clickCount >= 3 && clickCount < 6) {
      cost = costForLevel2; // Level 2 (clicks 4-6)
      setTransparencyLevel(2);
    }else if (clickCount >= 6) {
      cost = costForLevel3; // Level 3 (clicks 7-9)
      setTransparencyLevel(3);
    } 
    // Update money and click count using functional updates
    setMoney(prevMoney => prevMoney - cost);
    setButtonClicks(prevClicks => prevClicks + 1);

    // Increment click count and then update chatbot content based on new click count
    setClickCount(prevCount => {
      const newCount = prevCount + 1; // Increment count
      updateChatBotContent(newCount); // Update chatbot content with new count
      return newCount; // Return the new count for state update
    });
  };

  // Function to update chatbot content based on clicks and level
  const updateChatBotContent = (newClickCount) => {
    for (let i = 1; i <= 9; i++) {
      if (newClickCount === i) {
        setChatBotContent(chatBotOutput[i]);
      }
    }
  };

  // Handle survey submission
  const handleSubmit = () => {
    console.log('Survey A submitted');
    console.log('Button Clicks:', buttonClicks);
    onSubmit();

    // onSubmit({ buttonClicks, money }); // Uncomment this line when ready to submit
  };
  
  const handleOption = (selectedOption) => {
    setOption(selectedOption); // Set selected option
  };

  return (
    <div className="p-4  rounded-xl w-full  ">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-xl font-bold text-black">Survey A</h1>
        <p className="text-black font-bold text-lg">Money Left: ${ money}</p>
      </div>

      <span className="text-black text-xl items-center flex border-2 border-black rounded-md p-5 ">
        Scenario: This survey is in the context of yourself 
      </span>

      <div className='flex flex-row pt-4'> 
        <span className="text-black font-bold text-xl items-center flex ">
          Content from chatbot: 
        </span>
        <span className="text-black text-xl items-center flex ">{chatBotContent}</span>

      </div>
      <div className="flex justify-center space-x-2 pt-4">
        <button
          onClick={handleClick}
          className="bg-blue-600  mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Click for more information, cost: $
          {clickCount < 3
            ? costForLevel1
            : clickCount >= 3 && clickCount < 6
            ? costForLevel2
            : costForLevel3}
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        <button 
          onClick={() => handleOption(1)} 
          className=" bg-blue-600  mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Option A
        </button>
        <button 
          onClick={() => handleOption(2)} 
          className="bg-blue-600  mt-4 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
        >
          Option B
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className= {`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${option === 0 ? 'opacity-50 cursor-not-allowed' : ''} `}
          disabled={option === 0} // Disable the button until an option is selected
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}

export default SurveyA;





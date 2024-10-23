import React, { useState } from 'react';

function SurveyC({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Chatbot content will appear here...");
  const [option, setOption] = useState(0);
  const [lastAmountLost, setLastAmountLost] = useState(0); 


  const chatBotOutput = {
    1: "When making a bet for a stranger, ADT advises placing a bet on horse A.",
    2: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns.",
    3: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.",
    4: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey.",
    5: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey, with the data from the last 25 races studied by ADT.",
    6: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey, with the data from the last 25 races studied by ADT. If horse A isn't an option, horse B would be a viable option.",
    7: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey, with the data from the last 25 races studied by ADT. If horse A isn't an option, horse B would be a viable option.<br /><br /> ADT prioritizes the jockey's performance rather than the horses', studying data from the past 100 races.",
    8: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey, with the data from the last 25 races studied by ADT. If horse A isn't an option, horse B would be a viable option.<br /><br /> ADT prioritizes the jockey's performance rather than the horses', studying data from the past 100 races, statistical information analyzed is from the National Horse Racing Association with a potential error rate of 6%.",
    9: "When making a bet for a stranger, ADT advises placing a bet on horse A, as it supports the stranger's goal of maximizing returns, considering the horses' recent performance.<br /><br /> This recommendation was based on the recent statistics of the horse and the jockey, with the data from the last 25 races studied by ADT. If horse A isn't an option, horse B would be a viable option.<br /><br /> ADT prioritizes the jockey's performance rather than the horses', studying data from the past 100 races, statistical information analyzed is from the National Horse Racing Association with a potential error rate of 6%. There's still a risk of losing the stranger's money if horse A underperforms."
  };

  const costForLevel1 = 10;
  const costForLevel2 = 20;
  const costForLevel3 = 30;
  let cost = 0;

  const handleDone = () => {
    console.log('You are out of money');
    alert('You are out of money. Please submit the survey.');
  }


  const handleClick = () => {

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
    setLastAmountLost(cost);


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
      You are now betting on a horse decision on behalf of a stranger who has entrusted you with their life savings via an online platform. The stranger is in a hard financial situation, relying on you to make the right decision. A poor choice could cause them to lose everything, but if you select the winning horse, the stranger will be earn the winnings and a real life bonus. <br/><br/> To help you make the best betting decision, you've been given the option to use an Automated Decision Tool (ADT). The system will provide recommendations. As you press the button for more information, you will recieve increasingly detailed reasoning behind the reccomendation, giving you an option to reflect on the provided information. <br/><br/> However, each time you click the button to get more information, a portion of the stranger's savings and potential monetary gain is reduced. Each request for more information, costs the stranger money, reducing the amount the stranger can earn. Pressing the button too many times could leave the stranger with little winnings, even with the right bet.  
      </span>

      <div className='flex flex-row'>
        <span className="text-black font-bold text-xl items-center flex">
          Content from chatbot:
        </span>
        <span className="text-black text-xl text-wrap items-center flex " dangerouslySetInnerHTML={{ __html: chatBotContent }} />
      </div>

      <div> 
        <span className={`text-red-500 ${money < 200 ? '' : 'hidden'} text-lg tracking-tight font-bold flex justify-center mt-3`}> {`You lost $${lastAmountLost}. You now have $${money}`} </span>
      </div>

      <div className="flex justify-center space-x-2">
        <button
           onClick= {buttonClicks >= 9 ? handleDone : handleClick}
           className={`bg-gray-600 mt-4 hover:bg-gray-500 text-white font-bold ${buttonClicks >= 9 ? 'cursor-not-allowed opacity 50' : ''} py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded`}
        >
          Click for more information, cost: $
          {clickCount < 3
            ? costForLevel1
            : clickCount >= 3 && clickCount < 6
              ? costForLevel2
              : costForLevel3}
        </button>
      </div>

      <div className='flex items-center justify-center text-lg tracking-tight mt-3 '>
        <span className='text-xl text-black font-bold '> Pick which horse you want to place the bet on: </span>
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => handleOption(1)}
          className="bg-gray-600 mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
        >
          Horse A
        </button>
        <button
          onClick={() => handleOption(2)}
          className="bg-gray-600 mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
        >
          Horse B
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-600 ${option === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={option === 0}
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}

export default SurveyC;
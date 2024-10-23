import React, { useState } from 'react';

function SurveyB({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Chatbot content will appear here...");
  const [option, setOption] = useState(0);
  const [lastAmountLost, setLastAmountLost] = useState(0); 


  const chatBotOutput = {

    1: "If making a bet for a friend, ADT suggests you place a bet on horse B.",
    2: "If making a bet for a friend, ADT suggests you bet on horse B; this choice fits your friend's overall goal of maximizing betting profits.",
    3: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.",
    4: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics.",
    5: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT.",
    6: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.",
    7: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races.",
    8: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races, sourced from the National Horse Racing Association with an error rate of 6%.",
    9: "If making a bet for a friend, ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races, sourced from the National Horse Racing Association with an error rate of 6%. There is a risk of your friend losing money if the recommended horse doesn't perform well."

  
  };

  const costForLevel1 = 10;``
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
    console.log('Survey B submitted');
    console.log('Button Clicks:', buttonClicks);
    onSubmit();
  };

  const handleOption = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-black">Survey B</h1>
        <p className="text-black font-bold text-lg">Money Left: ${money}</p>
      </div>

      <span className="text-black text-xl items-center flex border-2 border-black rounded-md p-5">
      You are about to place a bet on a horse race with the goal of maximizing your betting returns. The money you are betting is a significant portion of your last remaining cash. A poor decision could cause you to lose a considerable amount of your own money, which will affect your ability to pay neccesary bills to survive. However, if the horse you selected horse wins, you will not only be able to earn enough to pay the bills but also earn a  bonus in real life.<br/><br/>To help you make the best betting decision, you've been given the option to use an Automated Decision Tool (ADT). The system will provide recommendations. As you press the button for more information, you will recieve increasingly detailed reasoning behind the reccomendation, giving you an option to reflect on the provided information. <br/><br/> However, each time you click the button to get more information, a portion of your savings and potential monetary gain is reduced. Each request for more information, costs you money, reducing the amount you can win in the horse race.

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

export default SurveyB;
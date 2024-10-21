import React, { useState } from 'react';

function SurveyB({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Initial content from chatbot...");
  const [option, setOption] = useState(0);

  const chatBotOutput = {

    1: "ADT suggests you place a bet on horse B.",
    2: "ADT suggests you bet on horse B; this choice fits your friend's overall goal of maximizing betting profits.",
    3: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.",
    4: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics.",
    5: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT.",
    6: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.",
    7: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races.",
    8: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races, sourced from the National Horse Racing Association with an error rate of 6%.",
    9: "ADT suggests betting on horse B; this recommendation aligns with your friend's aim to maximize returns, based on the horses' recent results.<br /><br /> Horse B was selected due to favorable trends in performance and jockey statistics, as well as data from the last 25 races analyzed by ADT. Although Horse B is favorable, Horse A is a viable alternative.<br /><br /> ADT gave more weight to the jockey's performance rather than the horses', studying data from the past 100 races, sourced from the National Horse Racing Association with an error rate of 6%. There is a risk of your friend losing money if the recommended horse doesn't perform well."

  
  };

  const costForLevel1 = 10;``
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
      Imagine, your friend entrusts you with placing a bet on a horse during a race.  Your friend is relying on your decision-making skills and wants you to choose the horse that will give them the best chance of growing their betting returns.  You've been given the option to use an Automated Decision Tool (ADT) to assist you in making your decision. ADT will provide recommendations. <br/><br/>If you click the more information, you will be given information at different levels of detail about why ADT is recommending a particular horse with more detail each time. However, each time the button is clicked you lose money. The cost of information increases as the depth of the reasoning increases.      </span>

      <div className='flex flex-row'>
        <span className="text-black font-bold text-xl items-center flex">
          Content from chatbot:
        </span>
        <span className="text-black text-xl text-wrap items-center flex " dangerouslySetInnerHTML={{ __html: chatBotContent }} />
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={handleClick}
          className="bg-gray-600 mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
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
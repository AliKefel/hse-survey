import React, { useState } from 'react';

function SurveyA({ onSubmit, money, setMoney, buttonClicks, setButtonClicks }) {

  const [transparencyLevel, setTransparencyLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [chatBotContent, setChatBotContent] = useState("Chatbot content will appear here...");
  const [option, setOption] = useState(0);

  const chatBotOutput = {
    1 : "ADT reccomends placing a bet on horse A.",
    2 : "ADT reccomends placing a bet on horse A, it aligns with the bigger goal of maximizing your bet returns.",
    3 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.", 
    4 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the horses’ previous results.<br /> <br />Horse A  was chosen based on recent performance trends and the jockeys stats.", 
    5 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.<br /> <br />Horse A was chosen based on recent performance trends and the jockeys stats. ADT's algorithm studied the top 25 previous races.", 
    6 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.<br /> <br />Horse A was chosen based on recent performance trends and the jockeys stats. ADT's algorithm studied the top 25 previous races. However, Horse B is a good alternative.",
    7 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.<br /> <br /> Horse A was chosen based on recent performance trends and the jockeys stats. ADT's algorithm studied the top 25 previous races. However, Horse B is a good alternative.<br /><br /> ADT studied horse and jockey statics, with the horse statistic weighing heavier in the decision making process than the jockey's statistic. ADT only studies the past 100 races of the horse and the jockey. ", 
    8 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.<br /> <br /> Horse A was chosen based on recent performance trends and the jockeys stats. ADT's algorithm studied the top 25 previous races. However, Horse B is a good alternative. <br /><br /> ADT studied horse and jockey statics, with the horse statistic weighing heavier in the decision making process than the jockey's statistic. ADT only studies the past 100 races of the horse and the jockey. Data is backed by National Horse Racing Association. ADT has an error rate of 6% in predictions.", 
    9 : "ADT recommends placing a bet on horse A; it's aligned with your goal of maximizing your returns, based on the team’s previous results.<br /> <br /> Horse A was chosen based on recent performance trends and the jockeys stats. ADT's algorithm studied the top 25 previous races. However, Horse B is a good alternative.<br /><br /> ADT studied horse and jockey statics, with the horse statistic weighing heavier in the decision making process than the jockey's statistic. ADT only studies the past 100 races of the horse and the jockey. Data is backed by National Horse Racing Association. ADT has an error rate of 6% in predictions. Betting on the wrong horse could lead to you losing the money you bet. "
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
      You are about to place a bet on a horse race with the goal of maximizing your betting returns by making the best possible choice.  You've been given the option to use an Automated Decision Tool (ADT) to assist you in making your decision. ADT will provide recommendations. <br/><br/> If you click the more information, you will be given information at different levels of detail about why ADT is recommending a particular horse with more detail each time. However, each time the button is clicked you lose money. The cost of information increases as the depth of the reasoning increases.
      </span>

      <div className='flex flex-row pt-4'> 
        <span className="text-black font-bold text-xl items-center flex ">
          Content from chatbot: 
        </span>
        <span className="text-black text-xl text-wrap items-center flex " dangerouslySetInnerHTML={{ __html: chatBotContent }} />

      </div>
      <div className="flex justify-center space-x-2 pt-4">
        <button
          onClick={handleClick}
          className="bg-gray-600  mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
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
          className=" bg-gray-600  mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
        >
          Horse A
        </button>
        <button 
          onClick={() => handleOption(2)} 
          className="bg-gray-600  mt-4 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
        >
          Horse B
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className= {`bg-black text-white px-4 py-2 rounded hover:bg-gray-600 ${option === 0 ? 'opacity-50 cursor-not-allowed' : ''} `}
          disabled={option === 0} // Disable the button until an option is selected
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}

export default SurveyA;





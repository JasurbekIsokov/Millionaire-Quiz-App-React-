import React, { useEffect, useMemo, useState } from "react";
import "./app.css";

import Trivia from "./components/Trivia";

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Savol 1",
      answers: [
        { text: "Javob a", correct: false },
        { text: "Javob b", correct: false },
        { text: "Javob c", correct: false },
        { text: "Javob d", correct: true },
      ],
    },
    {
      id: 2,
      question: "Savol 2",
      answers: [
        { text: "Javob a", correct: false },
        { text: "Javob b", correct: true },
        { text: "Javob c", correct: false },
        { text: "Javob d", correct: false },
      ],
    },
  ];

  const moneyPyramid = useMemo(() => [
    { id: 1, amount: "$100" },
    { id: 2, amount: "$200" },
    { id: 3, amount: "$300" },
    { id: 4, amount: "$500" },
    { id: 5, amount: "$1000" },
    { id: 6, amount: "$2000" },
    { id: 7, amount: "$4000" },
    { id: 8, amount: "$8000" },
    { id: 9, amount: "$1600" },
    { id: 10, amount: "$3200" },
    { id: 11, amount: "$6400" },
    { id: 12, amount: "$125000" },
    { id: 13, amount: "$250000" },
    { id: 14, amount: "$500000" },
    { id: 15, amount: "$1000000" },
  ]);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned: {earned}</h1>
        ) : (
          <>
            {" "}
            <div className="top">
              <div className="timer">30</div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setStop={setStop}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid
            .map((n) => (
              <li
                key={n.id}
                className={
                  questionNumber === n.id
                    ? "moneyListItem active"
                    : "moneyListItem"
                }
              >
                <span className="moneyListItemNumber">{n.id}</span>
                <span className="moneyListItemAmount">{n.amount}</span>
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </div>
  );
};

export default App;

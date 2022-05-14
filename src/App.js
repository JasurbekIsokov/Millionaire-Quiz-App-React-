import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./app.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

const App = () => {
  const [userName, setUserName] = useState(null); //kirishda usename uchun
  const [questionNumber, setQuestionNumber] = useState(1); // savol raqami
  const [stop, setStop] = useState(false); // javob hato bo'lsa uni to'xtatish uchun
  const [earned, setEarned] = useState("$ 0"); // ega bo;lgan summasi
  const [data, setData] = useState([]);

  // local  baza savollar va javoblar uchun
  // const data = [
  //   {
  //     id: 1,
  //     question: "Savol 1",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     question: "Savol 3",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     question: "Savol 4",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     question: "Savol 5",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     question: "Savol 6",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     question: "Savol 1",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     question: "Savol 1",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 10,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 11,
  //     question: "Savol 1",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 12,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 13,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 14,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  //   {
  //     id: 15,
  //     question: "Savol 2",
  //     answers: [
  //       { text: "Javob a", correct: false },
  //       { text: "Javob b", correct: false },
  //       { text: "Javob c", correct: false },
  //       { text: "Javob d", correct: true },
  //     ],
  //   },
  // ];

  // savollar uchun tikilgan pullar piramidasi
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
    { id: "", amount: "Victory" },
  ]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3004/dataJson");
      setData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      {/* tizimga kirishda username kiritish */}
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">
                You earned: {earned}
              </h1> /* to'plangan pul */
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    {/* vaqt tugasa to'xtatish uchun setStopni timerga berib yubormiz  va
                     nechinchi savoldaligini bilish uchun questionNumber ni ham berinb yuboramiz*/}
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  {/* javobning to'g'riligini va hatoliginn tekshradi 
                  va ularga ms ovozni qo'yadi. Savolni belgilanganligini biladi */}
                  <Trivia
                    data={data} // local baza
                    setStop={setStop} // javob xato bo'lsa xato
                    questionNumber={questionNumber} // savol raqami
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {/* pullar piramidasini ekranga render qilish */}
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
                // map aylanganda 1 dan boshlab 15 gacha boradi biz uni 15 dan
                // 1 gacha chiqarish uchun reverse() qilib teskariga chiqaramiz
                .reverse()}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} /> // tizimga kirishda username so;raladi
      )}
    </div>
  );
};

export default App;

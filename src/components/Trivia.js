import React, { useEffect, useState } from "react";
import useSound from "use-sound"; // sound(musiqani ovozini chiqaradi )
import play from "../assets/play.wav";
import correct from "../assets/correct.wav";
import wrong from "../assets/play.wav";

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answeer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handkeClick = (a) => {
    setSelectedAnswer(a); // bosilgan javobni belgilaydi
    setClassName("answer active"); // active clasi uni ko'k rangga bo'yaydi
    delay(3000, () =>
      // 3 sekunddan so'ng javob xato yoki to'g'riliginni chiqaradi
      // a bosilgan javob degani . Agar bu javobning correcti true bo'lsa
      // "answer correct" claslarini (javob to'g'ri degani) yozadi
      // aks holda "answer wrong" classlarni (javoob xato degani) yozadi
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      // Agar javob to'g'ri bo'lsa keyingi javobga o'tadi
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          //   setSelectedAnswer(null) javob belgilanmasdan oldingi holat
          setSelectedAnswer(null);
        });
      } else {
        // Javob xato degani . 1 sekunddan so'ng ekranga avvalgi
        // savollardan to'plangzn summa chiqariladi
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers ">
        {/* Savollarni mapd aaylanib so'ng ularni ekranga chiqaradi */}
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handkeClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

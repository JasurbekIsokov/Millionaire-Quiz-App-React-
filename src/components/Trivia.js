import React, { useEffect, useState } from "react";

export default function Trivia({
  data,
  setTimeOut,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers ">
        {question?.answers.map((n) => (
          <div className="answer wrong">{n.text}</div>
        ))}
      </div>
    </div>
  );
}

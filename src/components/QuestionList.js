import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  console.log(questions);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, []);

  const questionList = questions.map((question) => {
    return <QuestionItem 
      key= {question.id}
      question = {question}
      onHandleDelete={handleDelete}
      onHandleAnswerChange= {handleAnswerChange}
    />
  })

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then(r => r.json())
    .then(updatedQuestion => {
      const updatedQuestions = questions.map(question => {
        if (question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;

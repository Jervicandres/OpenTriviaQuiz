import React from "react"
import {decode} from 'html-entities';

export default function Quiz(props){

  const selectedChoice = { backgroundColor: "#D6DBF5" }
  const correctAnswer = {backgroundColor: "#94D7A2", border: "1px solid white"}
  const wrongAnswer = {backgroundColor: "#F8BCBC", opacity: 0.5}

    const questions = props.quizData.map((data) => {
      const choices = data.choices.map((ans, index) => {
          if(props.showAnswer){
            return(
              <button
                key={index}
                className="choices--button"
                style={
                  (data.answer === ans) ? correctAnswer : (data.userAnswer === ans) ? wrongAnswer : {backgroundColor: "white", opacity: 0.5}}
              >
                {ans}
              </button>
              )
            }
            return(
              <button 
              key={index}
              className="choices--button" 
              style={
                data.userAnswer === ans ? selectedChoice : {backgroundColor: "white"}
              }
              onClick={() => props.selectAnswer(ans, data.id)}>{ans}</button>)
            })

        return(
            <div key={data.id}>
            <h3 className="question">{decode(data.question)}</h3>
            <div className="choices--group">
              {choices}
            </div>
            <hr></hr>
            </div>
        )
    })
    

    return (
      <div className="quiz--container">
        {questions}
        <div className="quiz--footer">
          {props.showAnswer && <h4>You score {props.quizScore}/5 correct answers.</h4>}
          <button className="quiz--button" onClick={props.showAnswer ? props.startQuiz : props.checkAnswer}>{props.showAnswer ? `Play Again` : "Check Answer"}</button>
        </div>
      </div>
    )
}
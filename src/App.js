import React from "react"
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"
import "./style.css"

export default function App(){
    const [quiz, setQuiz] = React.useState()
    const [showAnswer, setShowAnswer] = React.useState(false)
    const [score, setScore] = React.useState(0)

    async function startQuiz(){
        const quizData  = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => {
            return data.results
        })
        
        setQuiz(quizData.map(data => {
            return {
                id: nanoid(),
                question: data.question,
                answer: data.correct_answer,
                choices: [...data.incorrect_answers, data.correct_answer].sort(() => Math.random() - 0.5),
                userAnswer: ""
            }
        }))

        setShowAnswer(false)
        setScore(0)
    }
    
    function selectAnswer(answer, id) {
        setQuiz(quiz.map(quizData => {
            if(quizData.id === id){
                return {
                    ...quizData,
                    userAnswer: answer
                }
            }
            else
                return quizData
        }))
    }

    function checkAnswer(){
        var score = quiz.filter((quizData) => {
            return quizData.answer === quizData.userAnswer
        }).length
        setShowAnswer(true)
        setScore(score)
        
        }



    return (
        <div className="container">
        {quiz ? 
            <Quiz 
            quizData={quiz} 
            selectAnswer={selectAnswer} 
            checkAnswer={checkAnswer} 
            startQuiz={startQuiz} 
            quizScore={score}
            showAnswer={showAnswer}/> :
        <Home start={startQuiz} />}
        
        </div>
    )
}
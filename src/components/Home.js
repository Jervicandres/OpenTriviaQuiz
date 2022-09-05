import React from "react"

export default function Home(props){
    return (
        <>
            <h2 className="game--title">Quizzical</h2>
            <span className="game--description">Quiz Trivia</span>
            <button className="start--button" onClick={props.start}>Start Quiz</button>      
        </>
    )
}
import { useEffect, useState } from 'react'
import './Question.css'

function Question(props) {


    // Create answer option elements.
    const answerOptionEls = props.answers.map(answer => {
        
        let className = ''

        // Correct answer
        if (props.checkAnswers && answer.isCorrect && !answer.isSelected) {
            className = 'option-btn correct-answer no-hover'
        } 
        // Guess is correct
        else if (props.checkAnswers && answer.isCorrect && answer.isSelected) {
            className = 'option-btn correct-guess no-hover'
        } 
        // Wrong guess
        else if (props.checkAnswers && !answer.isCorrect && answer.isSelected) {
            className = 'option-btn incorrect-guess no-hover'
        } 
        // Not guess and not correct
        else if (props.checkAnswers && !answer.isCorrect && !answer.isSelected) {
            className = 'option-btn not-selected no-hover'
        } 


        // Select an option styling
        else if (answer.isSelected) {
            className = 'option-btn is-selected'
        } else {
            className = 'option-btn'
        }

        return (
            <button 
                key={answer.id}
                className={className}
                onClick={() => props.handleSelectAnswer(props.id, answer.id)}
                disabled={props.checkAnswers}
            >{answer.option}</button>
        )
    })

    return (
        <div className='question-container'>
            <div className='question'> 
                <h2>{props.question}</h2>
            </div>
            <div className='answers-container'>
                {answerOptionEls}
            </div>
            <div className='under-line'></div>
        </div>
    )
}

export default Question
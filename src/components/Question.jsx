import { useEffect, useState } from 'react'
import './Question.css'

function Question(props) {

    const answerOptionEls = props.answers.map(answer => {
        let className = ''
        // correct answer
        if (props.checkAnswers && answer.isCorrect && !answer.isSelected) {
            className = 'option-btn correct-answer no-hover'
        } 
        // guess is correct
        else if (props.checkAnswers && answer.isCorrect && answer.isSelected) {
            className = 'option-btn correct-guess no-hover'
        } 
        // wrong guess
        else if (props.checkAnswers && !answer.isCorrect && answer.isSelected) {
            className = 'option-btn incorrect-guess no-hover'
        } 
        // not guess and not correct
        else if (props.checkAnswers && !answer.isCorrect && !answer.isSelected) {
            className = 'option-btn not-selected no-hover'
        } 
        // selected styling
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
                disabled={props.checkAnswers}>
                {answer.option}
            </button>
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
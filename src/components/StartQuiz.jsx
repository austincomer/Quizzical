import './StartQuiz.css'

function StartQuiz(props) {
    return (
        <div className='start-quiz'>
            <h1>Quizzical</h1>
            <h3>Let's put your knowledge to the test!</h3>
            <button 
                className='start-quiz-btn'
                onClick={props.handleStartGame}>
                Start Quiz
            </button>
        </div>
    )
}

export default StartQuiz
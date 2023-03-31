import './PlayAgain.css'

function PlayAgain(props) {

    function scrollToTop() {
        console.log('work')
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
    }

    return (
        <div className='play-again-container'>
            <button 
                className='play-again-btn' 
                onClick={() => {
                    scrollToTop ()
                    props.restartQuiz()
                }}>
                Play Again!
            </button>
        </div>
    )
}

export default PlayAgain
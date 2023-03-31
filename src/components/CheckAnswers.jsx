import './CheckAnswers.css'

function CheckAnswers(props) {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
    }

    return (
        <div className='check-answers-container'>
            <button 
                className='check-answers-btn' 
                onClick={() => {
                    scrollToTop()
                    props.handleCheckAnswers()
                    }}>
            Check Answers
            </button>
        </div>
    )
}

export default CheckAnswers
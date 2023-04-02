import './Results.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

function Results(props) {
    return (
        <div className='results-container'>
            <div className='results-card'>
                <h2>
                    You scored {props.score}/5 correct answers
                    <span className='result-icon'><FontAwesomeIcon icon={faArrowDown} /></span>
                </h2>
            </div>
        </div>
    )
}

export default Results
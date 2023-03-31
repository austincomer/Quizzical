import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import CheckAnswers from "./CheckAnswers";
import Results from "./Results";
import PlayAgain from "./PlayAgain";
import Loading from "./Loading";
import './Quiz.css'
import Question from "./Question"
import he from 'he'



function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [restart, setRestart] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    console.log(quizData)

    // Fetch API Trivia Data
    function fetchQuizData() {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
            .then(res => res.json())
            .then(data => {
                // Mapping over the data array, creating an array of custom objects for each item that we are saving to state
                setQuizData(data.results.map(quiz => {
                    // Stores all the answers and the correct answer
                    const sortedAnswers = [...quiz.incorrect_answers, quiz.correct_answer].sort()
                    const correctAnswer = quiz.correct_answer
                    
                    // Creates an answers object so that we can save more values with it to help us down the road
                    const answerObject = sortedAnswers.map(answer => {
                        return {
                            option: he.decode(answer),
                            id: uuidv4(),
                            isCorrect: answer === correctAnswer ? true : false,
                            isSelected: false,
                            score: 0
                        }
                    })
                    // Takes the data from the API and creates our new object with the specific info we want
                    return {
                        question: he.decode(quiz.question),
                        answers: answerObject,
                        id: uuidv4()
                    }
                }))
                setTimeout(() => {
                    setIsLoading(false)
                }, 700)
            })
    }

    // Call fetch once on first page render
    useEffect(() => {
        fetchQuizData()
        console.log('effect ran')
    }, [restart])

    // Hanlde the answer select by flipping isSelect to true and useing that to change styles. 
    function handleSelectAnswer(questionId, optionId) {-
        setQuizData(prevQuizData => {
            return prevQuizData.map(question => {
                if (questionId === question.id) {
                    return {
                        ...question,
                        answers: question.answers.map(option => {
                            if (optionId === option.id) {
                                return {
                                    ...option,
                                    isSelected: !option.isSelected,
                                }
                            } else {
                                return {
                                    ...option,
                                    isSelected: false,
                                }
                            }
                        })
                    }
                } else {
                    return {...question}
                }
            })
        })
    }

    function handleCheckAnswers() {
        setCheckAnswers(true)
        quizData.map(question => {
            question.answers.map(option => {
                if (option.isCorrect && option.isSelected) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        })
    }

    // Restart Quiz
    function restartQuiz() {
        console.log('Restart')
        setScore(0)
        setCheckAnswers(false) 
        setRestart(prevState => prevState + 1)
        setIsLoading(true)
    }

    // Create each question element
    const quiz = quizData.map(question => {
        return (
            <Question 
                key={question.id}
                id={question.id}
                question={question.question}
                answers={question.answers}
                handleSelectAnswer={handleSelectAnswer}
                checkAnswers={checkAnswers}
            />
        )
    })

    return (
        <>
            {isLoading && <Loading />}
            
            {!isLoading && checkAnswers && <Results score={score}/>}

            {!isLoading && 
            <div className='quiz-container'>
                {quiz}
            </div>
            }

            {isLoading ? <></> : checkAnswers ? 
                    <PlayAgain restartQuiz={restartQuiz}/> : 
                    <CheckAnswers handleCheckAnswers={handleCheckAnswers}/> 
            }
        </>
    )
}

export default Quiz
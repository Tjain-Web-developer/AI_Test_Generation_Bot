import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleDownloadPdf } from "../utils/exportToPdf.js";

const File = () => {
    const { state } = useLocation();
    const printRef = useRef();

    const [questions, setQuestions] = useState(state?.questions);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [validationResults, setValidationResults] = useState([]);

    const handleAnswerSelection = (question, selectedChoice) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question]: selectedChoice,
        }));
    };

    const handleValidation = () => {
        const results = questions.map((questionObj) => ({
            question: questionObj.question,
            selectedAnswer: selectedAnswers[questionObj.question] || "",
            correctAnswer: questionObj.answer,
            isCorrect:
                selectedAnswers[questionObj.question] === questionObj.answer,
        }));

        setValidationResults(results);
    };

    return (
        <div className="quiz-container">
            <div ref={printRef}>
                <h1 className="heading">Quiz Questions</h1>
                {questions.map((questionObj, index) => (
                    <div key={index} className="question-container">
                        <h3>{questionObj.question}</h3>
                        <ul>
                            {questionObj.choices.map((choice, choiceIndex) => (
                                <li key={choiceIndex}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={choice}
                                            checked={
                                                selectedAnswers[
                                                    questionObj.question
                                                ] === choice
                                            }
                                            onChange={() =>
                                                handleAnswerSelection(
                                                    questionObj.question,
                                                    choice
                                                )
                                            }
                                        />
                                        {choice}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button
                className="buttonStyle saveAsPdfBtn"
                type="button"
                onClick={() => handleDownloadPdf(printRef)}
            >
                Save as PDF
            </button>
            <div>
                <button className="validate-button" onClick={handleValidation}>
                    Validate Answers
                </button>
            </div>
            <div>
                {validationResults.length > 0 && (
                    <h2 className="heading">Validation Results:</h2>
                )}
                <ul className="results">
                    {validationResults.map((result, index) => (
                        <li
                            key={index}
                            className={
                                result.isCorrect ? "correct" : "incorrect"
                            }
                        >
                            <strong>{result.question}:</strong>
                            <br /> Selected: {result.selectedAnswer}{" "}
                            {result.isCorrect ? "✔️" : "❌"}
                            <br /> Correct: {result.correctAnswer},{" "}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default File;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  id: number;
  question: string;
  description: string;
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e: string | null;
    answer_f: string | null;
  };
  multiple_correct_answers: string;
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
    answer_e_correct: string;
    answer_f_correct: string;
  };
  explanation: string;
  category: string;
  difficulty: string;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  // Fetch quiz questions from the API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get<Question[]>(
          "https://quizapi.io/api/v1/questions?apiKey=tGHwyiVvrEfmpwAaOfl6ND8pJ5ws2vgbo9XbtTJy&limit=20"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }
    fetchQuestions();
  }, []);

  // Get current question
  const currentQuestion = questions[currentIndex];

  // Handle answer submission
  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }

    // Check if the selected answer is correct
    const correctKey = Object.keys(currentQuestion.correct_answers).find(
      (key) =>
        currentQuestion.correct_answers[
          key as keyof typeof currentQuestion.correct_answers
        ] === "true"
    );
    const correctAnswer = correctKey?.replace("_correct", "");

    if (selectedAnswer === correctAnswer) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("Incorrect!");
    }

    // Wait a bit before moving to the next question
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
  };

  if (questions.length === 0) return <p>Loading...</p>;

  if (currentIndex >= questions.length)
    return (
      <div>
        <h1>Quiz Complete!</h1>
        <p>
          Your score: {score}/{questions.length}
        </p>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quiz: {currentQuestion.question}</h1>
      {currentQuestion.description && <p>{currentQuestion.description}</p>}
      <ul>
        {Object.entries(currentQuestion.answers).map(([key, answer]) => {
          if (!answer) return null; // Skip null answers
          return (
            <li key={key}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={() => setSelectedAnswer(key)}
                />
                {answer}
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Submit
      </button>
      {feedback && <p>{feedback}</p>}
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Quiz;

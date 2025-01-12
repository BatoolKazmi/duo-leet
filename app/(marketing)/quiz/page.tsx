"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_QUIZ_API_KEY;
        if (!apiUrl) {
          throw new Error(
            "API URL is not defined in the environment variables."
          );
        }

        const response = await axios.get<Question[]>(apiUrl);
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
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Progression Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-green-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      {/* Questions and answers */}
      <h1 className="text-3xl font-semibold text-center mb-6">
        {currentQuestion.question}
      </h1>
      <ul className="grid grid-cols-2 gap-4">
        {Object.entries(currentQuestion.answers).map(([key, answer]) => {
          if (!answer) return null; // Skip null answers
          return (
            <li key={key} className="flex justify-center">
              <label
                htmlFor={key}
                className={`block w-full p-4 text-center text-lg font-medium border rounded-lg cursor-pointer ${
                  selectedAnswer === key
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  id={key}
                  name="answer"
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={() => setSelectedAnswer(key)}
                  className="hidden"
                />
                {answer}
              </label>
            </li>
          );
        })}
      </ul>

      <Button
        size="lg"
        variant="secondary"
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className={`mt-6 py-2 px-4 w-full text-white font-semibold rounded-lg ${
          selectedAnswer
            ? "bg-green-500 hover:bg-green-600 border-green-800"
            : "bg-gray-600 border-gray-800 cursor-not-allowed"
        }`}
      >
        Get Started
      </Button>

      {feedback && (
        <p className="mt-4 text-center text-xl font-semibold">{feedback}</p>
      )}

      <div className="mt-4 text-center">
        <p>
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;

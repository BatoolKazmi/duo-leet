"use client"; // Ensure client-side rendering

import { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Change to next/navigation
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import React from "react";

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
  const [answered, setAnswered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const searchParams = useSearchParams(); // Access the query parameters

  const subject = searchParams.get("subject"); // Get 'subject' from query
  const difficulty = searchParams.get("difficulty"); // Get 'difficulty' from query

  useEffect(() => {
    if (!subject || !difficulty) return; // Ensure both parameters are available

    async function fetchQuestions() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Your API key
        if (!apiKey) {
          throw new Error(
            "API Key is not defined in the environment variables."
          );
        }

        // Construct the API URL dynamically based on selected subject and difficulty
        const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${subject}&difficulty=${difficulty}&limit=5`;

        console.log(apiUrl);
        const response = await axios.get<Question[]>(apiUrl);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchQuestions();
  }, [subject, difficulty]); // Re-fetch when subject or difficulty changes

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }

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

    setAnswered(true);

    setLoading(true);
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setAnswered(false);
      setCurrentIndex((prev) => prev + 1);
      setLoading(false);
    }, 2000);
  };

  const handleBackToHome = () => {
    router.push("/"); // Navigate to home page
  };

  if (questions.length === 0) return <p>Loading...</p>;

  if (currentIndex >= questions.length)
    return (
      <div>
        <h1>Quiz Complete!</h1>
        <p>
          Your score: {score}/{questions.length}
        </p>
        {/* Progress bar here showing the correct answers percentage */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-6 mb-6">
          <div
            className="h-full bg-yellow-500"
            style={{
              width: `${(score / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <Button size="lg" variant="secondary" onClick={handleBackToHome}>
          Go to Home
        </Button>
      </div>
    );

  return (
    <div>
      <Button size="lg" variant="danger" onClick={handleBackToHome}>
        Go to Home
      </Button>
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-yellow-500"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <h1 className="font-feather text-3xl font-semibold text-center mb-6">
          {currentQuestion.question}
        </h1>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(currentQuestion.answers).map(([key, answer]) => {
            if (!answer) return null;
            const isCorrect = selectedAnswer === key && feedback === "Correct!";
            const isIncorrect =
              selectedAnswer === key && feedback === "Incorrect!";
            const isSubmitted = answered && !isCorrect && !isIncorrect;
            const isSelected = selectedAnswer === key && !answered;

            return (
              <li key={key} className="flex justify-center">
                <label
                  htmlFor={key}
                  className={`font-feather block w-full p-4 text-center text-lg font-medium border rounded-lg cursor-pointer ${
                    isCorrect
                      ? "bg-green-500 text-white border-green-600"
                      : isIncorrect
                      ? "bg-red-500 text-white border-red-600"
                      : isSelected
                      ? "bg-gray-300 text-gray-700 border-gray-500"
                      : isSubmitted
                      ? "bg-gray-400 text-white border-gray-600"
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
                    disabled={answered}
                  />
                  {answer}
                </label>
              </li>
            );
          })}
        </ul>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!selectedAnswer || loading}
          className={`mt-6 py-2 px-4 w-full text-white font-semibold rounded-lg ${
            selectedAnswer && !loading
              ? "bg-yellow-500 hover:bg-yellow-600 border-yellow-800"
              : "bg-gray-600 hover:bg-gray-800 border-gray-800 cursor-not-allowed"
          }`}
        >
          Submit Answer
        </Button>

        {feedback && (
          <p className="font-feather mt-4 text-center text-xl font-semibold">
            {feedback}
          </p>
        )}

        <div className="font-feather mt-4 text-center">
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

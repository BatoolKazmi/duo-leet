"use client"; // Ensure that the parent page is also client-side

import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import Dropdown from "@/components/ui/dropdown"; // Ensure correct path

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option); // Handle selection and update state
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty); // Handle difficulty selection
  };

  const options = [
    "linux",
    "bash",
    "sql",
    "docker",
    "devops",
    "react",
    "nodejs",
  ];

  const isQuizButtonDisabled = !selectedOption || !selectedDifficulty;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-feather mb-4 flex flex-col items-center justify-center">
        Choose your Category:
      </h1>
      <Dropdown options={options} onSelect={handleSelect} />
      <p className="font-feather p-1">Selected Option: {selectedOption}</p>

      {/* Difficulty level buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => handleDifficultySelect("easy")}
          className={`w-10 h-10 rounded-full ${
            selectedDifficulty === "Easy" ? "bg-green-500" : "bg-green-300"
          }`}
        ></button>
        <button
          onClick={() => handleDifficultySelect("medium")}
          className={`w-10 h-10 rounded-full ${
            selectedDifficulty === "Medium" ? "bg-yellow-500" : "bg-yellow-300"
          }`}
        ></button>
        <button
          onClick={() => handleDifficultySelect("hard")}
          className={`w-10 h-10 rounded-full ${
            selectedDifficulty === "Hard" ? "bg-red-500" : "bg-red-300"
          }`}
        ></button>
      </div>

      <p className="font-feather p-1 mt-4">
        Selected Difficulty: {selectedDifficulty}
      </p>

      {/* Go to Quiz Button */}
      <div className="flex justify-center mt-6">
        <Link
          href={{
            pathname: "/quiz",
            query: {
              subject: selectedOption,
              difficulty: selectedDifficulty,
            },
          }}
          passHref
        >
          <button
            className={`px-6 py-2 rounded-lg ${
              isQuizButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 text-white hover:bg-yellow-800"
            }`}
            disabled={isQuizButtonDisabled}
          >
            Go to Quiz
          </button>
        </Link>
      </div>

      {/* Optionally, you can display a message if the user hasn't selected both */}
      {isQuizButtonDisabled && (
        <p className="text-red-500 text-center mt-4">
          Please select both a subject and difficulty.
        </p>
      )}
    </div>
  );
};

export default Home;

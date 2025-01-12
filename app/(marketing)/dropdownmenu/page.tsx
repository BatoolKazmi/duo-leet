"use client"; // Ensure that the parent page is also client-side

import React, { useState } from "react";
import Dropdown from "@/components/ui/dropdown"; // Ensure correct path

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option); // Handle selection and update state
  };

  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8"
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-feather mb-4 flex flex-col items-center justify-center">Choose your Category: </h1>
      <Dropdown options={options} onSelect={handleSelect} />
      <p className = "font-feather p-1">Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Home;

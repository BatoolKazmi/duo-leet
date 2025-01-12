"use client"; // Ensure this component runs client-side

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Import the Button component

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);  // Update selected option
    setIsOpen(false); // Close the dropdown after selection
    onSelect(option); // Callback to parent with selected option
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <Button
        size="lg"
        variant="secondary"
        className="font-feather w-full flex justify-between items-center bg-yellow-500 text-white hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 focus:ring-offset-gray-10 border-yellow-700"
        onClick={toggleDropdown} // Toggle dropdown
      >
        <span className="font-feather text-lg border-yellow-700">{selectedOption || "Select an option"}</span> {/* Display selected option or placeholder */}
        <svg
          className={`ml-2 h-5 w-5 transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)} // Handle selection
                className="block font-feather w-full text-left px-4 py-2 text-sm bg-yellow-500 text-white hover:bg-white hover:text-black" // Hover effect for dropdown options
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

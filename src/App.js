import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberSelector = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [inputValues, setInputValues] = useState(Array.from({ length: 1 }, () => ""));

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
    setSelectedNumber(newNumber);
    setInputValues(Array.from({ length: newNumber }, () => ""));
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <div>
      <label>Sélectionnez un nombre :</label>
      <select value={selectedNumber} onChange={handleNumberChange}>
        {[...Array(10)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <label>
      <input type="checkbox"></input>
      Recherche croisée</label>
      <div>
        {[...Array(selectedNumber)].map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Zone de texte ${index + 1}`}
            value={inputValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberSelector;




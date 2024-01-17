import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberSelector = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);

  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h1>Mille et un cocktail</h1>
      <label>Sélectionnez le nombre d'ingrédients que vous avez sous la main :</label>
      <select value={selectedNumber} onChange={handleNumberChange}>
        {[...Array(10)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      <p></p>
    </div>
  );
};

export default NumberSelector;



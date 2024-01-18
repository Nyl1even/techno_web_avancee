import React, { useState } from 'react';

const NumberSelector = ({ onCrossSearchChange,selectedNumber, onNumberChange, onInputChange, crossSearch, ingredients }) => {
  const [inputValues, setInputValues] = useState(Array.from({ length: selectedNumber }, () => ""));

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
    onNumberChange(newNumber);
    setInputValues(Array.from({ length: newNumber }, () => ""));
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // Filtrer les ingrédients en fonction de la saisie
    const filterIngredients = ingredients.filter(
      (ingredient) =>
        ingredient.strIngredient1.toLowerCase().includes(value.toLowerCase())
    );

    // Mettre à jour filteredIngredients dans le composant parent
    onInputChange(index, value, filterIngredients);
  };

  const handleCrossSearchChange = () => {
    onCrossSearchChange(!crossSearch);
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
        <input type="checkbox" checked={crossSearch} onChange={handleCrossSearchChange} />
        Recherche croisée
      </label>
      {[...Array(selectedNumber)].map((_, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Zone de texte ${index + 1}`}
            value={inputValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {ingredients && ingredients.length > 0 && (
            <select value={inputValues[index]} onChange={(e) => handleInputChange(index, e.target.value)}>
              {ingredients.map((ingredient) => (
                <option key={ingredient.strIngredient1} value={ingredient.strIngredient1}>
                  {ingredient.strIngredient1}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default NumberSelector;

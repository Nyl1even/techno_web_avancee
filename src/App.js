import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CocktailSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValues, setInputValues] = useState(Array.from({ length: 1 }, () => ""));
  const [cocktails, setCocktails] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedOption, setSelectedOption] = useState('ingrédient');
  const [selectedNumber, setSelectedNumber] = useState(1); // Add this line

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        setIngredients(response.data.drinks);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    const handleRadioButtonChange = (e) => {
      setSelectedOption(e.target.value);
    };

    const filterIngredients = ingredients.filter(
      (ingredient) =>
        ingredient.strIngredient1.toLowerCase().includes(value.toLowerCase())
    );

    // Mettre à jour filteredIngredients dans le composant parent
    onInputChange(value, filterIngredients);

    const searchCocktails = async () => {
      let url = '';
      if (selectedOption === 'ingrédient') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      } else if (selectedOption === 'glass') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
      }
      // Rest of your fetch logic
    };

    fetchIngredients();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);


    const filterIngredients = ingredients.filter(
      (ingredient) =>
        ingredient.strIngredient1.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredIngredients(filterIngredients);
  };

  const searchCocktails = async () => {
    try {
      const ingredientsList = inputValues.filter(Boolean).join(',');
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsList}`);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error('Error searching cocktails:', error);
    }
  };

  // const handleNumberChange = (e) => {
  //   const newNumber = parseInt(e.target.value, 10);
  //   setSelectedNumber(newNumber);
  //   setInputValues(Array.from({ length: newNumber }, () => ""));
  // };

  return (
    <div class='mainDiv'>
      <h1 class="frontTitle">Cocktail Search</h1>
      <div className="numberSelectorDiv">
        <label>Choisir entre un verre ou un ingrédient :</label>
        <div>
          <label>
            <input
              type="radio"
              value="verre"
              checked={selectedOption === "verre"}
              onChange={handleOptionChange}
            />
            Verre
          </label>
          <label>
            <input
              type="radio"
              value="ingrédient"
              checked={selectedOption === "ingrédient"}
              onChange={handleOptionChange}
            />
            Ingrédient
          </label>
        </div>
        {[...Array(selectedNumber)].map((_, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Zone de texte ${index + 1}`}
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            {selectedOption === "ingrédient" && ingredients && ingredients.length > 0 && (
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
      <button onClick={searchCocktails} class="button">Search Cocktails</button>
      <div>
        <h2>Matching Cocktails:</h2>
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CocktailSearch;

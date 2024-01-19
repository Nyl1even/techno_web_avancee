import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberSelector from './NumberSelector';

const CocktailSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValues, setInputValues] = useState(Array.from({ length: 1 }, () => ""));
  const [crossSearch, setCrossSearch] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]); // Modification ici

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        setIngredients(response.data.drinks);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
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

    setFilteredIngredients(filterIngredients);
  };

  const handleCrossSearchChange = () => {
    setCrossSearch(!crossSearch);
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

  return (
    <div class='mainDiv'>
      <h1 class="frontTitle">Cocktail Search</h1>
      <NumberSelector
        selectedNumber={inputValues.length}
        onNumberChange={handleNumberChange}
        onInputChange={handleInputChange}
        crossSearch={crossSearch}
        onCrossSearchChange={handleCrossSearchChange}
        ingredients={filteredIngredients}
      />
      <button onClick={searchCocktails} class="button" >Search Cocktails</button>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CocktailSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // Effect to fetch all available ingredients from the API
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

  const handleIngredientChange = (e) => {
    const { value } = e.target;
    const updatedIngredients = selectedIngredients.includes(value)
      ? selectedIngredients.filter((ingredient) => ingredient !== value)
      : [...selectedIngredients, value];
    setSelectedIngredients(updatedIngredients);
  };

  const searchCocktails = async () => {
    try {
      const ingredientsList = selectedIngredients.join(',');
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsList}`);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error('Error searching cocktails:', error);
    }
  };

  return (
    <div>
      <h1>Cocktail Search</h1>
      <div>
        <label>Choose your ingredients:</label>
        <select multiple onChange={handleIngredientChange}>
          {ingredients.map((ingredient) => (
            <option key={ingredient.strIngredient1} value={ingredient.strIngredient1}>
              {ingredient.strIngredient1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={searchCocktails}>Search Cocktails</button>
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


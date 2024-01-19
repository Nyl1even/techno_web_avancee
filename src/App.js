import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CocktailSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [inputValues, setInputValues] = useState(Array.from({ length: 1 }, () => ""));
  const [cocktails, setCocktails] = useState([]);
  const [selectedOption, setSelectedOption] = useState('ingrédient');
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        setIngredients(response.data.drinks);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    const fetchGlasses = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
        setGlasses(response.data.drinks);
      } catch (error) {
        console.error('Error fetching glasses:', error);
      }
    }

    fetchIngredients();
    fetchGlasses();
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
      let url = '';
      if (selectedOption === 'ingrédient') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsList}`;
      } else if (selectedOption === 'glass') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${ingredientsList}`;
      }
      const response = await axios.get(url);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error('Error searching cocktails:', error);
    }
  };


  return (
    <div className='mainDiv'>
      <h1 className="frontTitle">Cocktail Search</h1>
      <div className="numberSelectorDiv">
        <label id="intruct">Choisir entre un verre ou un ingrédient pour chercher un cocktail:</label>
        <div>
          <label>
            <input
              type="radio"
              value="glass"
              checked={selectedOption === "glass"}
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
        {inputValues.map((value, index) => (
          <div key={index}>
            <input
              id="input"
              type="text"
              placeholder={selectedOption}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              list={`autocomplete-${index}`}
            />
            {selectedOption === "ingrédient" && ingredients && ingredients.length > 0 && (
              <datalist id={`autocomplete-${index}`}>
                {filteredIngredients.map((ingredient) => (
                  <option key={ingredient.strIngredient1} value={ingredient.strIngredient1} />
                ))}
              </datalist>
            )}
            {selectedOption === "glass" && glasses && glasses.length > 0 && (
              <datalist id={`autocomplete-${index}`}>
                {glasses.map((glass) => (
                  <option key={glass.strGlass} value={glass.strGlass} />
                ))}
              </datalist>
            )}
          </div>
        ))}
      </div>
      <button onClick={searchCocktails} className="button">Search Cocktails</button>
      <div>
        <h2 id="match">Matching Cocktails:</h2>
        <ul id="matchList">
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CocktailSearch;

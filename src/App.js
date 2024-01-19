import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberSelector from './NumberSelector';

const CocktailSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValues, setInputValues] = useState(Array.from({ length: 1 }, () => ""));
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

    const [selectedOption, setSelectedOption] = useState('ingrédient');

    const handleRadioButtonChange = (e) => {
        setFetchOption(e.target.value);
    };

    const searchCocktails = async () => {
        let url = '';
        if (fetchOption === 'option1') {
            url = 'https://api.example.com/option1';
        } else if (fetchOption === 'option2') {
            url = 'https://api.example.com/option2';
        }
        // Rest of your fetch logic
    };
    fetchIngredients();
  }, []);

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

  const searchCocktails = async () => {
    try {
      const ingredientsList = inputValues.filter(Boolean).join(',');
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsList}`);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error('Error searching cocktails:', error);
    }
  };

  const NumberSelector = ({  selectedNumber, onNumberChange, onInputChange, ingredients }) => {
    const [inputValues, setInputValues] = useState(Array.from({ length: selectedNumber }, () => ""));
    const [selectedOption, setSelectedOption] = useState(""); // Nouvel état pour la sélection entre verre et ingrédient
  
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
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
  }
  return (
    <div class='mainDiv'>
      <h1 class="frontTitle">Cocktail Search</h1>
      <NumberSelector
        onInputChange={handleInputChange}
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

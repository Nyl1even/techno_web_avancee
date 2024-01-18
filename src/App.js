// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberSelector from './NumberSelector';
import { fetchIngredients } from './api';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [crossSearch, setCrossSearch] = useState(false);

  useEffect(() => {
    // Utilisation de la fonction pour récupérer la liste des ingrédients
    fetchIngredients()
      .then((ingredientsList) => {
        setIngredients(ingredientsList);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des ingrédients:', error.message);
      });
  }, []);

  const handleCrossSearchChange = (e) => {
    setCrossSearch(e.target.checked);
  };

  return (
    <div>
      <h1>Mon application React</h1>
      <NumberSelector
        ingredients={ingredients}
        crossSearch={crossSearch}
        setCrossSearch={setCrossSearch}
      />
      {/* Le reste de votre application ici */}
    </div>
  );
};

export default App;

// Fonction pour récupérer la liste des noms d'ingrédients
const fetchIngredients = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des ingrédients');
      }
  
      const data = await response.json();
      const ingredients = data.drinks.map((drink) => drink.strIngredient1);
  
      return ingredients;
    } catch (error) {
      console.error('Erreur:', error.message);
      return [];
    }
  };
  
  // Utilisation de la fonction pour récupérer la liste des ingrédients
  fetchIngredients()
    .then((ingredients) => {
      console.log('Liste des ingrédients:', ingredients);
  
      // Maintenant, vous pouvez utiliser cette liste dans votre application React
      // pour permettre à l'utilisateur de choisir des ingrédients.
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des ingrédients:', error.message);
    });
  
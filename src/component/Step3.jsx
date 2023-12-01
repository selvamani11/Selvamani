import React, { useState, useEffect } from 'react';

const Step3 = ({ prevStep, nextStep, selectedRestaurant, selectMeals, setSelectMeals, dishesData }) => {
  const [availableDishes, setAvailableDishes] = useState([]);

  useEffect(() => {
    const restaurantDishes = dishesData.dishes.filter((dish) => dish.restaurant === selectedRestaurant);
    const filteredDishes = restaurantDishes.filter(
      (dish) => !selectMeals.some((selectedMeal) => selectedMeal.dish.id === dish.id)
    );

    setAvailableDishes(filteredDishes);
  }, [selectedRestaurant, selectMeals, dishesData]);

  const handleAddDish = () => {
    const selectedDishId = parseInt(document.getElementById('dish').value);
    const selectedDish = dishesData.dishes.find((dish) => dish.id === selectedDishId);
    const numServings = parseInt(document.getElementById('numServings').value);

    const dishAlreadySelected = selectMeals.some((meal) => meal.dish.id === selectedDishId);

    if (selectedDish && numServings && numServings >= 1 && !dishAlreadySelected) {
      setSelectMeals([...selectMeals, { dish: selectedDish, servings: numServings }]);
    } else if (dishAlreadySelected) {
      alert('You can\'t select the same dish twice. Please choose a different dish.');
    } else {
      alert('Please select a valid dish and enter a number of servings greater than 0.');
    }
  };

  const dishOptions = availableDishes.map((dish) => (
    <option key={dish.id} value={dish.id}>
      {dish.name}
    </option>
  ));

  return (
    <>
      <label htmlFor="dish">Please Select a Dish:</label>
      <select id="dish" required>
        {dishOptions}
      </select>
      <br />
      <label htmlFor="numServings">Please enter no. of Servings:</label>
      <input type="number" id="numServings" min="1" defaultValue="1" required />
      <br />
      <button style={{justifyContent: 'left'}} onClick={handleAddDish}>Add Dish</button>
      <button style={{justifyContent: 'center'}} onClick={prevStep}>Previous</button>
      <button style={{justifyContent: 'right'}} onClick={nextStep}>Next</button>
    </>
  );
};

export default Step3;

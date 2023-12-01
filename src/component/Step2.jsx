import React, { useState, useEffect } from 'react';

const Step2 = ({ prevStep, nextStep, setRestaurant, selectedMealCategory, dishesData }) => {
  const [uniqueRestaurants, setUniqueRestaurants] = useState([]);

  useEffect(() => {
    const restaurants = dishesData.dishes
      .filter((dish) => dish.availableMeals.includes(selectedMealCategory))
      .map((dish) => dish.restaurant);

    setUniqueRestaurants([...new Set(restaurants)]);
  }, [selectedMealCategory, dishesData]);

  const handleNext = () => {
    const selectedRestaurant = document.getElementById('restaurant').value;

    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant);
      nextStep();
    } else {
      alert('Please select a restaurant.');
    }
  };

  const restaurantOptions = uniqueRestaurants.map((restaurant) => (
    <option key={restaurant} value={restaurant}>
      {restaurant}
    </option>
  ));

  return (
    <>
      <label htmlFor="restaurant">Please Select a Restaurant:</label>
      <select id="restaurant" required>
        <option value="">Select a restaurant</option>
        {restaurantOptions}
      </select>
      <br />
      <button style={{justifyContent: 'left'}} onClick={prevStep}>Previous</button>
      <button style={{justifyContent: 'right'}} onClick={handleNext}>Next</button>
    </>
  );
};

export default Step2;

import React from 'react';

const Step4 = ({ selectMeals, numPeople, prevStep, submitForm }) => {
  const totalDishes = selectMeals.reduce((total, meal) => total + meal.servings, 0);

  return (
    <div className="step4-content">
      <h1>Review</h1>
      <p>Meal: {selectMeals.length > 0 ? selectMeals[0].dish.availableMeals[0] : 'Not selected'}</p>
      <p>No. of People: {numPeople}</p>
      <p>Restaurant: {selectMeals.length > 0 ? selectMeals[0].dish.restaurant : 'Not selected'}</p>
      <p>Dishes:</p>
        {selectMeals.length > 0 ? (
          selectMeals.map((meal) => (
            <li key={meal.dish.id}>
              {meal.dish.name} - {meal.servings} serving(s)
            </li>
          ))
        ) : (
          <p>No dishes selected</p>
        )}
        <>
          <button onClick={prevStep}>Previous</button>
          <button id="submit" onClick={submitForm}>
            Submit
          </button>
        </>
      
    </div>
  );
};

export default Step4;

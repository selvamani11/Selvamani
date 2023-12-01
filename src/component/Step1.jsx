import React from 'react';

const Step1 = ({ nextStep, setMealCategory, setNumPeople }) => {
  const handleNext = () => {
    const mealCategory = document.getElementById('mealCategory').value;
    const numPeople = parseInt(document.getElementById('numPeople').value);

    if (mealCategory && numPeople && numPeople >= 1 && numPeople <= 10) {
      setMealCategory(mealCategory);
      setNumPeople(numPeople);
      nextStep();
    } else {
      alert('Please select a valid meal category and enter a number of people between 1 and 10.');
    }
  };

  return (
    <>
      <label htmlFor="mealCategory">Please Select a meal:</label>
      <select id="mealCategory" required>
      <option value="">None</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <br />
      <label htmlFor="numPeople">Please Enter Number of people :</label>
      <input type="number" id="numPeople" min="1" max="10" required />
      <br />
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default Step1;

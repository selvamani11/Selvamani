import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const MealManager = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mealCategory, setMealCategory] = useState('');
  const [numPeople, setNumPeople] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectMeals, setSelectMeals] = useState([]);
  const [dishesData, setDishesData] = useState({
    "dishes": [
      {
        "id": 1,
        "name": "Chicken Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 2,
        "name": "Ham Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 3,
        "name": "Cheese Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 4,
        "name": "Fries",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 5,
        "name": "Egg Muffin",
        "restaurant": "Mc Donalds",
        "availableMeals": ["breakfast"]
    },
    {
        "id": 6,
        "name": "Burrito",
        "restaurant": "Taco Bell",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 7,
        "name": "Tacos",
        "restaurant": "Taco Bell",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 8,
        "name": "Quesadilla",
        "restaurant": "Taco Bell",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 9,
        "name": "Steak",
        "restaurant": "BBQ Hut",
        "availableMeals": ["dinner"]
    },
    {
        "id": 10,
        "name": "Yakitori",
        "restaurant": "BBQ Hut",
        "availableMeals": ["dinner"]
    },
    {
        "id": 11,
        "name": "Nankotsu",
        "restaurant": "BBQ Hut",
        "availableMeals": ["dinner"]
    },
    {
        "id": 12,
        "name": "Piman",
        "restaurant": "BBQ Hut",
        "availableMeals": ["dinner"]
    },
    {
        "id": 13,
        "name": "Vegan Bento",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch"]
    },
    {
        "id": 14,
        "name": "Coleslaw Sandwich",
        "restaurant": "Vege Deli",
        "availableMeals": ["breakfast"]
    },
    {
        "id": 15,
        "name": "Grilled Sandwich",
        "restaurant": "Vege Deli",
        "availableMeals": ["breakfast"]
    },
    {
        "id": 16,
        "name": "Veg. Salad",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 17,
        "name": "Fruit Salad",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 18,
        "name": "Corn Soup",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 19,
        "name": "Tomato Soup",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 20,
        "name": "Minestrone Soup",
        "restaurant": "Vege Deli",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 21,
        "name": "Pepperoni Pizza",
        "restaurant": "Pizzeria",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 22,
        "name": "Pepperoni Pizza",
        "restaurant": "Pizzeria",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 23,
        "name": "Hawaiian Pizza",
        "restaurant": "Pizzeria",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 24,
        "name": "Seafood Pizza",
        "restaurant": "Pizzeria",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 25,
        "name": "Deep Dish Pizza",
        "restaurant": "Pizzeria",
        "availableMeals": ["dinner"]
    },
    {
        "id": 26,
        "name": "Chow Mein",
        "restaurant": "Panda Express",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 27,
        "name": "Mapo Tofu",
        "restaurant": "Panda Express",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 28,
        "name": "Kung Pao",
        "restaurant": "Panda Express",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 29,
        "name": "Wontons",
        "restaurant": "Panda Express",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 30,
        "name": "Garlic Bread",
        "restaurant": "Olive Garden",
        "availableMeals": ["breakfast", "lunch", "dinner"]
    },
    {
        "id": 31,
        "name": "Ravioli",
        "restaurant": "Olive Garden",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 32,
        "name": "Rigatoni Spaghetti",
        "restaurant": "Olive Garden",
        "availableMeals": ["lunch", "dinner"]
    },
    {
        "id": 33,
        "name": "Fettucine Pasta",
        "restaurant": "Olive Garden",
        "availableMeals": ["lunch", "dinner"]
    }
    ]
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitForm = () => {
    alert('Enjoy your meals!!');
  };

  return (
    <div className="form-container">
      {currentStep === 1 && (
        <Step1 nextStep={nextStep} setMealCategory={setMealCategory} setNumPeople={setNumPeople} />
      )}

      {currentStep === 2 && (
        <Step2
          prevStep={prevStep}
          nextStep={nextStep}
          setRestaurant={setSelectedRestaurant}
          selectedMealCategory={mealCategory}
          dishesData={dishesData}
        />
      )}

      {currentStep === 3 && (
        <Step3
          prevStep={prevStep}
          nextStep={nextStep}
          selectedRestaurant={selectedRestaurant}
          selectMeals={selectMeals}
          setSelectMeals={setSelectMeals}
          dishesData={dishesData}
        />
      )}

      {currentStep === 4 && (
        <Step4 selectMeals={selectMeals} numPeople={numPeople} prevStep={prevStep} submitForm={submitForm} />
      )}
    </div>
  );
};

export default MealManager;

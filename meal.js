let currentStep = 1;
let selectMeals = [];
let numPeople = 0;

const dishesData = {
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
};

async function fetchDishesData() {
    try {
        // asynchronous fetch the JSON data
        const response = await fetch('your_data_endpoint'); // actual API endpoint
        const data = await response.json();
        dishesData = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function initializeForm() {
    fetchDishesData().then(() => {
        // Store data for later use
        window.dishes = dishesData.dishes;

        // Display
        document.getElementById("step1").style.display = "block";
    });
}

function nextStep() {
    if (validateStep()) {
        document.getElementById(`step${currentStep}`).style.display = "none";
        currentStep++;
        document.getElementById(`step${currentStep}`).style.display = "block";
        generateStepContent();
    }
}

function prevStep() {
    document.getElementById(`step${currentStep}`).style.display = "none";
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = "block";
    generateStepContent();
}

function validateStep() {
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        //case 3:
          //  return validateStep3();
        default:
            return true;
    }
}

function validateStep1() {
    const mealCategory = document.getElementById("mealCategory").value;
    numPeople = parseInt(document.getElementById("numPeople").value);

    if (mealCategory && numPeople && numPeople >= 1 && numPeople <= 10) {
        clearErrors();
        return true;
    } else {
        displayError("Please select a valid meal category and enter a number of people between 1 and 10.");
        return false;
    }
}

function validateStep2() {
    const selectedRestaurant = document.getElementById("restaurant").value;

    if (selectedRestaurant) {
        clearErrors();
        return true;
    } else {
        displayError("Please select a restaurant.");
        return false;
    }
}

function validateStep3() {
    const selectedDish = document.getElementById("dish").value;
    const numServings = document.getElementById("numServings").value;

    if (selectedDish && numServings && numServings >= 1) {
        clearErrors();

        const dishAlreadySelected = selectMeals.some(meal => meal.dish.id === parseInt(selectedDish));
        if (dishAlreadySelected) {
            displayError("You can't select the same dish twice. Please choose a different dish.");
            return false;
        }

        return true;
    } else {
         displayError("Please select a valid dish and enter a number of servings greater than 0.");
        return false;
    }
}

function displayError(message) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "error";
    errorMessage.textContent = message;
    document.getElementById(`step${currentStep}`).appendChild(errorMessage);
}

function clearErrors() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(element => element.remove());
}

function generateStepContent() {
    switch (currentStep) {
        case 2:
            generateStep2Content();
            break;
        case 3:
            generateStep3Content();
            break;
        case 4:
            generateStep4Content();
            break;
        default:
            break;
    }
}

function generateStep2Content() {
    const uniqueRestaurants = [...new Set(window.dishes.map(dish => dish.restaurant))];
    const restaurantOptions = uniqueRestaurants.map(restaurant => `<option value="${restaurant}">${restaurant}</option>`).join('');

    document.getElementById("step2").innerHTML = `
              <label for="restaurant">Please Select a Restaurant:</label>
              <select id="restaurant" required>
                  <option value="" disabled selected>Select a restaurant</option>
                  ${restaurantOptions}
              </select>
              <br>
              <button onclick="prevStep()">Previous</button>
              <button onclick="nextStep()">Next</button>
          `;
}

function generateStep3Content() {
    const selectedRestaurant = document.getElementById("restaurant").value;
    const restaurantDishes = window.dishes.filter(dish => dish.restaurant === selectedRestaurant);

    // already selected dishes
    const availableDishes = restaurantDishes.filter(dish => !selectMeals.some(selectedMeal => selectedMeal.dish.id === dish.id));

    const dishOptions = availableDishes.map(dish => `<option value="${dish.id}">${dish.name}</option>`).join('');

    document.getElementById("step3").innerHTML = `
              <label for="dish">Please Select a Dish:</label>
              <select id="dish" required>
                  ${dishOptions}
              </select>
              <br>
              <label for="numServings">Please enter no. of Servings:</label>
              <input type="number" id="numServings" min="1" value="1" required>
              <br>
              <button id="add" onclick="addDish()">Add Dish</button>
              <button onclick="prevStep()">Previous</button>
              <button onclick="nextStep()">Next</button>
          `;
}

function generateStep4Content() {
    const reviewContent = `
              <p
              <h1>Review</h1>
              <p>Meal : ${selectMeals.length > 0 ? selectMeals[0].dish.availableMeals[0] : "Not selected"}</p>
              <p>No.of People: ${numPeople}</p>
              <p>Restaurant: ${selectMeals.length > 0 ? selectMeals[0].dish.restaurant : "Not selected"}</p>
              <p>Dishes:</p>
              <ul>
                  ${selectMeals.length > 0 ? selectMeals.map(meal => `<li>${meal.dish.name} - ${meal.servings} serving(s)</li>`).join('') : "No dishes selected"}
              </ul>
              <br>
              <button onclick="prevStep()">Previous</button>
              <button id="submit" onclick="submitForm()">Submit</button>
          `;

    document.getElementById("step4").innerHTML = reviewContent;
}

function addDish() {
    const selectedDish = document.getElementById("dish");
    const numServings = document.getElementById("numServings");

    const dishId = parseInt(selectedDish.value);
    const selectedDishObject = window.dishes.find(dish => dish.id === dishId);

    const selectedMeal = {
        dish: selectedDishObject,
        servings: parseInt(numServings.value)
    };

    // selected dish to the array
    selectMeals.push(selectedMeal);

    // Reset dish and servings inputs
    selectedDish.value = "";
    numServings.value = 1;

    const message = document.createElement("p");
    message.textContent = `${selectedMeal.servings} serving(s) of ${selectedMeal.dish.name} added!`;
    document.getElementById(`step${currentStep}`).appendChild(message);
    
    generateStep3Content();
}

// Submit form
function submitForm() {
    alert("Form submitted successfully!");
}

// Initialize the form
initializeForm();
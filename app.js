// AI Smart Meal & Grocery Budget Planner - Working Version
console.log('Working.js loaded successfully');

// Global variables
let currentTab = 'setup';
let userProfile = {
    name: '',
    age: '',
    gender: '',
    weeklyBudget: 100,
    dietaryRestrictions: '',
    preferredCuisine: '',
    foodAllergies: '',
    dislikedFoods: ''
};

let mealPreferences = {};
let weeklyPlan = {};
let groceryList = [];

// Meal Database
const mealDatabase = {
    filipino: [
        { name: 'Chicken Adobo', calories: 450, ingredients: ['chicken', 'soy sauce', 'vinegar', 'garlic', 'bay leaves'], cost: 8.50 },
        { name: 'Sinigang na Baboy', calories: 380, ingredients: ['pork', 'tamarind', 'radish', 'water spinach', 'tomato'], cost: 7.20 },
        { name: 'Kare-Kare', calories: 520, ingredients: ['oxtail', 'peanut butter', 'eggplant', 'string beans', 'bok choy'], cost: 12.30 },
        { name: 'Lechon Kawali', calories: 680, ingredients: ['pork belly', 'garlic', 'bay leaves', 'peppercorns'], cost: 9.80 },
        { name: 'Pancit Canton', calories: 420, ingredients: ['egg noodles', 'chicken', 'vegetables', 'soy sauce'], cost: 6.40 },
        { name: 'Beef Caldereta', calories: 580, ingredients: ['beef', 'tomato sauce', 'potatoes', 'carrots', 'bell peppers'], cost: 11.50 },
        { name: 'Bangus Sisig', calories: 350, ingredients: ['milkfish', 'onion', 'chili', 'calamansi', 'egg'], cost: 8.90 },
        { name: 'Laing', calories: 280, ingredients: ['taro leaves', 'coconut milk', 'chili', 'shrimp paste'], cost: 5.60 },
        { name: 'Bicol Express', calories: 420, ingredients: ['pork', 'coconut milk', 'chili', 'shrimp paste'], cost: 7.80 },
        { name: 'Tinola', calories: 320, ingredients: ['chicken', 'papaya', 'ginger', 'chili leaves'], cost: 6.20 }
    ],
    asian: [
        { name: 'Pad Thai', calories: 480, ingredients: ['rice noodles', 'shrimp', 'bean sprouts', 'tofu', 'peanuts'], cost: 9.20 },
        { name: 'Beef Bulgogi', calories: 520, ingredients: ['beef', 'soy sauce', 'sesame oil', 'garlic', 'pear'], cost: 13.40 },
        { name: 'Chicken Teriyaki', calories: 450, ingredients: ['chicken', 'teriyaki sauce', 'rice', 'vegetables'], cost: 8.70 },
        { name: 'Tom Yum Soup', calories: 280, ingredients: ['shrimp', 'lemongrass', 'galangal', 'lime', 'chili'], cost: 10.30 },
        { name: 'Ramen', calories: 580, ingredients: ['ramen noodles', 'pork', 'egg', 'green onions', 'nori'], cost: 11.80 }
    ],
    american: [
        { name: 'Grilled Steak', calories: 650, ingredients: ['beef steak', 'potatoes', 'asparagus', 'butter'], cost: 15.60 },
        { name: 'BBQ Ribs', calories: 720, ingredients: ['pork ribs', 'bbq sauce', 'coleslaw', 'corn'], cost: 14.20 },
        { name: 'Chicken Wings', calories: 520, ingredients: ['chicken wings', 'hot sauce', 'celery', 'ranch'], cost: 9.80 },
        { name: 'Burger & Fries', calories: 680, ingredients: ['ground beef', 'buns', 'lettuce', 'tomato', 'potatoes'], cost: 8.90 },
        { name: 'Mac & Cheese', calories: 480, ingredients: ['pasta', 'cheese', 'milk', 'butter'], cost: 6.40 }
    ]
};

// Utility Functions
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notificationIcon');
    const messageEl = document.getElementById('notificationMessage');

    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle text-emerald-400',
        warning: 'fas fa-exclamation-triangle text-yellow-400',
        error: 'fas fa-times-circle text-red-400',
        info: 'fas fa-info-circle text-blue-400'
    };

    icon.className = icons[type] || icons.info;
    messageEl.textContent = message;

    // Show notification
    notification.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Tab Management
function showTab(tabName) {
    console.log('Showing tab:', tabName);
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active');
    });

    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    
    // Add active class to selected tab button
    const activeBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('tab-active');
    }

    currentTab = tabName;

    // Load tab-specific content
    switch(tabName) {
        case 'setup':
            loadProfileForm();
            break;
        case 'meals':
            loadMealsGrid();
            break;
        case 'planner':
            loadWeeklyPlanner();
            break;
        case 'grocery':
            loadGroceryList();
            break;
        case 'budget':
            loadBudgetAnalytics();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Profile Management
function loadProfileForm() {
    console.log('Loading profile form');
    document.getElementById('userFullName').value = userProfile.name || '';
    document.getElementById('userAge').value = userProfile.age || '';
    document.getElementById('userGender').value = userProfile.gender || '';
    document.getElementById('weeklyBudget').value = userProfile.weeklyBudget || 100;
    document.getElementById('dietaryRestrictions').value = userProfile.dietaryRestrictions || '';
    document.getElementById('preferredCuisine').value = userProfile.preferredCuisine || '';
    document.getElementById('foodAllergies').value = userProfile.foodAllergies || '';
    document.getElementById('dislikedFoods').value = userProfile.dislikedFoods || '';
}

function saveProfileData() {
    console.log('Saving profile data');
    
    userProfile = {
        name: document.getElementById('userFullName').value,
        age: document.getElementById('userAge').value,
        gender: document.getElementById('userGender').value,
        weeklyBudget: parseFloat(document.getElementById('weeklyBudget').value) || 100,
        dietaryRestrictions: document.getElementById('dietaryRestrictions').value,
        preferredCuisine: document.getElementById('preferredCuisine').value,
        foodAllergies: document.getElementById('foodAllergies').value,
        dislikedFoods: document.getElementById('dislikedFoods').value
    };

    // Save to localStorage
    localStorage.setItem('mealPlannerProfile', JSON.stringify(userProfile));
    
    updateUserDisplay();
    showNotification('Profile saved successfully!', 'success');
}

function clearProfileData() {
    if (confirm('Are you sure you want to clear your profile data?')) {
        userProfile = {
            name: '',
            age: '',
            gender: '',
            weeklyBudget: 100,
            dietaryRestrictions: '',
            preferredCuisine: '',
            foodAllergies: '',
            dislikedFoods: ''
        };
        
        localStorage.removeItem('mealPlannerProfile');
        loadProfileForm();
        updateUserDisplay();
        showNotification('Profile cleared!', 'info');
    }
}

function updateUserDisplay() {
    const userName = userProfile.name || 'Guest';
    document.getElementById('userName').textContent = userName;
    document.getElementById('weeklyBudgetDisplay').textContent = `$${userProfile.weeklyBudget.toFixed(2)}`;
}

// Meals Management
function loadMealsGrid() {
    console.log('Loading meals grid');
    const mealsGrid = document.getElementById('mealsGrid');
    const cuisine = userProfile.preferredCuisine || 'filipino';
    const meals = mealDatabase[cuisine] || mealDatabase.filipino;

    mealsGrid.innerHTML = '';

    meals.forEach((meal, index) => {
        const preference = mealPreferences[meal.name] || { frequency: 0, period: 'week', portion: 1 };
        
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card rounded-lg p-4';
        mealCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-lg">${meal.name}</h3>
                <span class="text-sm text-gray-400">${meal.calories} cal</span>
            </div>
            
            <div class="mb-4">
                <div class="text-sm text-gray-300 mb-2">Main ingredients:</div>
                <div class="text-xs text-gray-400">${meal.ingredients.slice(0, 3).join(', ')}${meal.ingredients.length > 3 ? '...' : ''}</div>
            </div>
            
            <div class="mb-4">
                <div class="text-sm text-gray-300 mb-2">Estimated cost: <span class="text-emerald-400 font-semibold">$${meal.cost.toFixed(2)}</span></div>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center space-x-2">
                    <label class="text-sm text-gray-300">Frequency:</label>
                    <input type="number" min="0" max="30" value="${preference.frequency}" 
                           class="frequency-control px-2 py-1 rounded text-sm w-16 text-center"
                           onchange="updateMealPreference('${meal.name}', 'frequency', this.value)">
                    <select class="frequency-control px-2 py-1 rounded text-sm" onchange="updateMealPreference('${meal.name}', 'period', this.value)">
                        <option value="week" ${preference.period === 'week' ? 'selected' : ''}>per week</option>
                        <option value="month" ${preference.period === 'month' ? 'selected' : ''}>per month</option>
                    </select>
                </div>
                
                <div class="flex items-center space-x-2">
                    <label class="text-sm text-gray-300">Portion:</label>
                    <select class="frequency-control px-2 py-1 rounded text-sm flex-1" onchange="updateMealPreference('${meal.name}', 'portion', this.value)">
                        <option value="1" ${preference.portion === 1 ? 'selected' : ''}>1 person</option>
                        <option value="2" ${preference.portion === 2 ? 'selected' : ''}>2 persons</option>
                        <option value="4" ${preference.portion === 4 ? 'selected' : ''}>Family (4)</option>
                    </select>
                </div>
            </div>
        `;
        
        mealsGrid.appendChild(mealCard);
    });
}

function updateMealPreference(mealName, field, value) {
    console.log('Updating meal preference:', mealName, field, value);
    
    if (!mealPreferences[mealName]) {
        mealPreferences[mealName] = { frequency: 0, period: 'week', portion: 1 };
    }

    if (field === 'frequency') {
        mealPreferences[mealName].frequency = parseInt(value) || 0;
    } else if (field === 'period') {
        mealPreferences[mealName].period = value;
    } else if (field === 'portion') {
        mealPreferences[mealName].portion = parseInt(value) || 1;
    }

    // Save to localStorage
    localStorage.setItem('mealPlannerPreferences', JSON.stringify(mealPreferences));
}

function setAllFrequencies(period, frequency) {
    console.log('Setting all frequencies:', period, frequency);
    
    document.querySelectorAll('.frequency-control').forEach(input => {
        if (input.type === 'number') {
            input.value = frequency;
            const mealName = input.getAttribute('onchange').match(/'([^']+)'/)[1];
            updateMealPreference(mealName, 'frequency', frequency);
        } else if (input.tagName === 'SELECT') {
            input.value = period;
            const mealName = input.getAttribute('onchange').match(/'([^']+)'/)[1];
            updateMealPreference(mealName, 'period', period);
        }
    });
}

function generatePlanFromMeals() {
    console.log('Generating plan from meals');
    const selectedMeals = Object.keys(mealPreferences).filter(meal => 
        mealPreferences[meal].frequency > 0
    );

    if (selectedMeals.length === 0) {
        showNotification('Please select at least one meal first!', 'warning');
        return;
    }

    // Generate weekly plan based on preferences
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const cuisine = userProfile.preferredCuisine || 'filipino';
    const meals = mealDatabase[cuisine] || mealDatabase.filipino;
    
    weeklyPlan = {};
    let mealIndex = 0;

    days.forEach(day => {
        weeklyPlan[day] = [];
        
        // Add 2-3 meals per day based on preferences
        for (let i = 0; i < 2; i++) {
            if (selectedMeals[mealIndex]) {
                const mealName = selectedMeals[mealIndex];
                const mealData = meals.find(m => m.name === mealName);
                if (mealData) {
                    weeklyPlan[day].push({
                        ...mealData,
                        portion: mealPreferences[mealName].portion
                    });
                }
                mealIndex = (mealIndex + 1) % selectedMeals.length;
            }
        }
    });

    // Save to localStorage
    localStorage.setItem('mealPlannerWeeklyPlan', JSON.stringify(weeklyPlan));
    
    showNotification('Meal plan generated successfully!', 'success');
    showTab('planner');
}

function clearMealSelections() {
    if (confirm('Are you sure you want to clear all meal selections?')) {
        mealPreferences = {};
        localStorage.removeItem('mealPlannerPreferences');
        loadMealsGrid();
        showNotification('Meal selections cleared!', 'info');
    }
}

// Weekly Planner
function loadWeeklyPlanner() {
    console.log('Loading weekly planner');
    const calendar = document.getElementById('weeklyCalendar');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    calendar.innerHTML = '';

    days.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'glass rounded-lg p-4';
        
        const meals = weeklyPlan[day] || [];
        const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
        const totalCost = meals.reduce((sum, meal) => sum + (meal.cost * meal.portion), 0);

        dayColumn.innerHTML = `
            <h3 class="font-semibold mb-3 text-center">${day}</h3>
            <div class="space-y-2 mb-4">
                ${meals.map(meal => `
                    <div class="bg-emerald-600/20 rounded p-2 text-sm">
                        <div class="font-medium">${meal.name}</div>
                        <div class="text-xs text-gray-400">${meal.calories} cal × ${meal.portion}</div>
                    </div>
                `).join('')}
                ${meals.length === 0 ? '<div class="text-center text-gray-500 text-sm">No meals planned</div>' : ''}
            </div>
            <div class="text-xs text-gray-400 border-t border-gray-600 pt-2">
                <div>Total: ${totalCalories} cal</div>
                <div>Cost: $${totalCost.toFixed(2)}</div>
            </div>
        `;

        calendar.appendChild(dayColumn);
    });

    updatePlanSummary();
}

function updatePlanSummary() {
    let totalMeals = 0;
    let totalCalories = 0;
    let totalCost = 0;

    Object.values(weeklyPlan).forEach(dayMeals => {
        totalMeals += dayMeals.length;
        dayMeals.forEach(meal => {
            totalCalories += meal.calories;
            totalCost += meal.cost * meal.portion;
        });
    });

    document.getElementById('totalMeals').textContent = totalMeals;
    document.getElementById('totalCalories').textContent = totalCalories;
    document.getElementById('estimatedCost').textContent = `$${totalCost.toFixed(2)}`;
}

function generateWeeklyPlan() {
    console.log('Generating weekly plan');
    // Generate a balanced weekly plan
    const cuisine = userProfile.preferredCuisine || 'filipino';
    const meals = mealDatabase[cuisine] || mealDatabase.filipino;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    weeklyPlan = {};
    let mealIndex = 0;

    days.forEach(day => {
        weeklyPlan[day] = [];
        
        // Add 2 meals per day, varying the selection
        for (let i = 0; i < 2; i++) {
            const meal = meals[mealIndex % meals.length];
            weeklyPlan[day].push({
                ...meal,
                portion: 2 // Default to 2 persons
            });
            mealIndex++;
        }
    });

    localStorage.setItem('mealPlannerWeeklyPlan', JSON.stringify(weeklyPlan));
    loadWeeklyPlanner();
    showNotification('Weekly plan generated!', 'success');
}

function clearWeeklyPlan() {
    if (confirm('Are you sure you want to clear the weekly plan?')) {
        weeklyPlan = {};
        localStorage.removeItem('mealPlannerWeeklyPlan');
        loadWeeklyPlanner();
        showNotification('Weekly plan cleared!', 'info');
    }
}

function optimizeWeeklyPlan() {
    // Simple optimization based on budget
    const budget = userProfile.weeklyBudget;
    let currentCost = 0;

    Object.values(weeklyPlan).forEach(dayMeals => {
        dayMeals.forEach(meal => {
            currentCost += meal.cost * meal.portion;
        });
    });

    if (currentCost > budget) {
        // Replace expensive meals with cheaper alternatives
        const cuisine = userProfile.preferredCuisine || 'filipino';
        const meals = mealDatabase[cuisine] || mealDatabase.filipino;
        const cheapMeals = meals.filter(meal => meal.cost < 8.00);

        Object.keys(weeklyPlan).forEach(day => {
            weeklyPlan[day] = weeklyPlan[day].map(meal => {
                if (meal.cost > 10.00 && cheapMeals.length > 0) {
                    return {
                        ...cheapMeals[Math.floor(Math.random() * cheapMeals.length)],
                        portion: meal.portion
                    };
                }
                return meal;
            });
        });

        localStorage.setItem('mealPlannerWeeklyPlan', JSON.stringify(weeklyPlan));
        loadWeeklyPlanner();
        showNotification('Plan optimized for budget!', 'success');
    } else {
        showNotification('Plan is already within budget!', 'info');
    }
}

// Grocery List Management
function generateGroceryList() {
    console.log('Generating grocery list');
    const ingredients = new Map();
    const cuisine = userProfile.preferredCuisine || 'filipino';
    const meals = mealDatabase[cuisine] || mealDatabase.filipino;

    // Collect all ingredients from weekly plan
    Object.values(weeklyPlan).forEach(dayMeals => {
        dayMeals.forEach(meal => {
            const mealData = meals.find(m => m.name === meal.name);
            if (mealData) {
                mealData.ingredients.forEach(ingredient => {
                    const current = ingredients.get(ingredient) || 0;
                    ingredients.set(ingredient, current + (1 * meal.portion));
                });
            }
        });
    });

    // Convert to grocery list with estimated prices
    groceryList = Array.from(ingredients.entries()).map(([ingredient, quantity]) => ({
        name: ingredient,
        quantity: Math.ceil(quantity),
        unit: getIngredientUnit(ingredient),
        estimatedPrice: getIngredientPrice(ingredient) * Math.ceil(quantity),
        purchased: false
    }));

    localStorage.setItem('mealPlannerGroceryList', JSON.stringify(groceryList));
    loadGroceryList();
    showNotification('Grocery list generated!', 'success');
}

function getIngredientUnit(ingredient) {
    const units = {
        'chicken': 'lbs',
        'pork': 'lbs',
        'beef': 'lbs',
        'rice': 'cups',
        'soy sauce': 'bottles',
        'vinegar': 'bottles',
        'garlic': 'heads',
        'onion': 'pieces',
        'tomato': 'pieces',
        'potatoes': 'lbs',
        'carrots': 'lbs',
        'coconut milk': 'cans',
        'chili': 'pieces',
        'ginger': 'pieces'
    };
    return units[ingredient] || 'units';
}

function getIngredientPrice(ingredient) {
    const prices = {
        'chicken': 3.50,
        'pork': 4.20,
        'beef': 6.80,
        'rice': 0.80,
        'soy sauce': 2.50,
        'vinegar': 1.80,
        'garlic': 0.60,
        'onion': 1.20,
        'tomato': 2.00,
        'potatoes': 1.50,
        'carrots': 1.80,
        'coconut milk': 2.20,
        'chili': 0.40,
        'ginger': 1.00
    };
    return prices[ingredient] || 2.00;
}

function loadGroceryList() {
    console.log('Loading grocery list');
    const container = document.getElementById('groceryListContainer');
    container.innerHTML = '';

    if (groceryList.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No grocery items. Generate a list first!</div>';
        return;
    }

    let totalCost = 0;
    let purchasedCount = 0;

    groceryList.forEach((item, index) => {
        totalCost += item.estimatedPrice;
        if (item.purchased) purchasedCount++;

        const itemElement = document.createElement('div');
        itemElement.className = `grocery-item rounded-lg p-4 flex items-center justify-between ${item.purchased ? 'opacity-60' : ''}`;
        itemElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <input type="checkbox" ${item.purchased ? 'checked' : ''} 
                       class="w-5 h-5 text-emerald-600 rounded" onchange="toggleGroceryItem(${index})">
                <div>
                    <div class="font-medium">${item.name}</div>
                    <div class="text-sm text-gray-400">${item.quantity} ${item.unit}</div>
                </div>
            </div>
            <div class="text-right">
                <div class="font-semibold text-emerald-400">$${item.estimatedPrice.toFixed(2)}</div>
                <button onclick="removeGroceryItem(${index})" class="text-red-400 hover:text-red-300 text-sm">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(itemElement);
    });

    // Update budget display
    const budget = userProfile.weeklyBudget;
    document.getElementById('groceryBudgetUsage').textContent = `$${totalCost.toFixed(2)} / $${budget.toFixed(2)}`;
    
    const budgetPercentage = Math.min((totalCost / budget) * 100, 100);
    document.getElementById('budgetBar').style.width = `${budgetPercentage}%`;

    generateGrocerySuggestions();
    generateSubstitutionSuggestions();
}

function toggleGroceryItem(index) {
    groceryList[index].purchased = !groceryList[index].purchased;
    localStorage.setItem('mealPlannerGroceryList', JSON.stringify(groceryList));
    loadGroceryList();
}

function removeGroceryItem(index) {
    groceryList.splice(index, 1);
    localStorage.setItem('mealPlannerGroceryList', JSON.stringify(groceryList));
    loadGroceryList();
    showNotification('Item removed from grocery list', 'info');
}

function markAllPurchased() {
    groceryList.forEach(item => item.purchased = true);
    localStorage.setItem('mealPlannerGroceryList', JSON.stringify(groceryList));
    loadGroceryList();
    showNotification('All items marked as purchased!', 'success');
}

function clearGroceryList() {
    if (confirm('Are you sure you want to clear the grocery list?')) {
        groceryList = [];
        localStorage.removeItem('mealPlannerGroceryList');
        loadGroceryList();
        showNotification('Grocery list cleared!', 'info');
    }
}

function exportGroceryList() {
    if (groceryList.length === 0) {
        showNotification('No items to export!', 'warning');
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + 
        "Item,Quantity,Unit,Estimated Price,Purchased\n" +
        groceryList.map(item => 
            `${item.name},${item.quantity},${item.unit},$${item.estimatedPrice.toFixed(2)},${item.purchased ? 'Yes' : 'No'}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "grocery_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Grocery list exported!', 'success');
}

function printGroceryList() {
    const printWindow = window.open('', '_blank');
    const totalCost = groceryList.reduce((sum, item) => sum + item.estimatedPrice, 0);
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Grocery List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .item { margin: 10px 0; padding: 5px; border-bottom: 1px solid #eee; }
                    .total { font-weight: bold; margin-top: 20px; text-align: right; }
                    .checkbox { margin-right: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Grocery List</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                ${groceryList.map(item => `
                    <div class="item">
                        <input type="checkbox" class="checkbox" ${item.purchased ? 'checked' : ''}>
                        ${item.quantity} ${item.unit} ${item.name} - $${item.estimatedPrice.toFixed(2)}
                    </div>
                `).join('')}
                <div class="total">Total: $${totalCost.toFixed(2)}</div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

function generateGrocerySuggestions() {
    const container = document.getElementById('grocerySuggestions');
    const suggestions = [
        'Buy in bulk to save money',
        'Check for weekly sales',
        'Use store brands when possible',
        'Plan meals around seasonal ingredients'
    ];

    container.innerHTML = suggestions.map(suggestion => `
        <div class="text-sm p-3 bg-emerald-600/20 rounded-lg">
            <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>${suggestion}
        </div>
    `).join('');
}

function generateSubstitutionSuggestions() {
    const container = document.getElementById('substitutionSuggestions');
    const expensiveItems = groceryList.filter(item => item.estimatedPrice > 8.00);

    if (expensiveItems.length === 0) {
        container.innerHTML = '<div class="text-sm text-gray-400">No expensive items to substitute</div>';
        return;
    }

    container.innerHTML = expensiveItems.slice(0, 3).map(item => `
        <div class="text-sm p-3 bg-blue-600/20 rounded-lg">
            <div class="font-medium mb-1">${item.name}</div>
            <div class="text-gray-400">Consider: ${getCheaperAlternative(item.name)}</div>
            <div class="text-emerald-400">Save ~$${(item.estimatedPrice * 0.3).toFixed(2)}</div>
        </div>
    `).join('');
}

function getCheaperAlternative(ingredient) {
    const alternatives = {
        'beef': 'chicken or pork',
        'shrimp': 'fish or tofu',
        'steak': 'ground beef',
        'salmon': 'tilapia',
        'avocado': 'cucumber or zucchini'
    };
    return alternatives[ingredient] || 'seasonal vegetables';
}

// Budget Analytics
function loadBudgetAnalytics() {
    const currentWeekSpending = calculateCurrentWeekSpending();
    const remaining = userProfile.weeklyBudget - currentWeekSpending;

    document.getElementById('currentWeekSpending').textContent = `$${currentWeekSpending.toFixed(2)}`;
    document.getElementById('remainingBudget').textContent = `$${Math.max(0, remaining).toFixed(2)}`;

    generateSpendingChart();
    generateBudgetOptimization();
}

function calculateCurrentWeekSpending() {
    return Object.values(weeklyPlan).reduce((total, dayMeals) => {
        return total + dayMeals.reduce((dayTotal, meal) => {
            return dayTotal + (meal.cost * meal.portion);
        }, 0);
    }, 0);
}

function generateSpendingChart() {
    if (typeof Plotly === 'undefined') {
        console.log('Plotly not loaded, skipping chart');
        return;
    }
    
    const currentSpending = calculateCurrentWeekSpending();
    const remaining = Math.max(0, userProfile.weeklyBudget - currentSpending);
    
    const data = [{
        values: [currentSpending, remaining],
        labels: ['Spent', 'Remaining'],
        type: 'pie',
        marker: {
            colors: ['#10b981', '#6b7280']
        }
    }];

    const layout = {
        title: 'Budget Usage',
        showlegend: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' }
    };

    Plotly.newPlot('spendingChart', data, layout, {responsive: true});
}

function generateBudgetOptimization() {
    const container = document.getElementById('budgetOptimization');
    const currentSpending = calculateCurrentWeekSpending();
    const budget = userProfile.weeklyBudget;

    if (currentSpending > budget) {
        container.innerHTML = `
            <div class="p-4 bg-red-600/20 rounded-lg">
                <div class="font-semibold mb-2">⚠️ Budget Exceeded!</div>
                <div class="text-sm text-gray-300 mb-3">You're spending $${(currentSpending - budget).toFixed(2)} over budget.</div>
                <div class="text-sm">
                    <div class="mb-1">💡 Suggestions:</div>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Replace expensive meats with chicken or vegetables</li>
                        <li>Reduce portion sizes for costly meals</li>
                        <li>Choose more budget-friendly recipes</li>
                        <li>Buy ingredients in bulk when possible</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="p-4 bg-green-600/20 rounded-lg">
                <div class="font-semibold mb-2">✅ Within Budget!</div>
                <div class="text-sm text-gray-300">You have $${(budget - currentSpending).toFixed(2)} remaining this week.</div>
            </div>
        `;
    }
}

// Analytics
function loadAnalytics() {
    if (typeof Plotly === 'undefined') {
        console.log('Plotly not loaded, skipping charts');
        return;
    }
    
    generateCalorieChart();
    generateMealFrequencyChart();
}

function generateCalorieChart() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const calories = days.map(day => {
        const dayMeals = weeklyPlan[day] || [];
        return dayMeals.reduce((sum, meal) => sum + meal.calories, 0);
    });

    const data = [{
        x: days,
        y: calories,
        type: 'bar',
        marker: {
            color: '#10b981'
        }
    }];

    const layout = {
        title: 'Daily Calorie Intake',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Calories' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' }
    };

    Plotly.newPlot('calorieChart', data, layout, {responsive: true});
}

function generateMealFrequencyChart() {
    const frequency = {};
    Object.values(weeklyPlan).forEach(dayMeals => {
        dayMeals.forEach(meal => {
            frequency[meal.name] = (frequency[meal.name] || 0) + 1;
        });
    });

    const meals = Object.keys(frequency);
    const counts = Object.values(frequency);

    const data = [{
        labels: meals,
        values: counts,
        type: 'pie',
        marker: {
            colors: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22', '#fbbf24', '#f59e0b', '#d97706', '#b45309']
        }
    }];

    const layout = {
        title: 'Most Cooked Meals',
        showlegend: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' }
    };

    Plotly.newPlot('mealFrequencyChart', data, layout, {responsive: true});
}

// Reset Data
function resetAllData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
        localStorage.clear();
        location.reload();
    }
}

// Load data from localStorage on page load
function loadStoredData() {
    console.log('Loading stored data');
    
    // Load profile
    const storedProfile = localStorage.getItem('mealPlannerProfile');
    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
    }
    
    // Load meal preferences
    const storedPreferences = localStorage.getItem('mealPlannerPreferences');
    if (storedPreferences) {
        mealPreferences = JSON.parse(storedPreferences);
    }
    
    // Load weekly plan
    const storedPlan = localStorage.getItem('mealPlannerWeeklyPlan');
    if (storedPlan) {
        weeklyPlan = JSON.parse(storedPlan);
    }
    
    // Load grocery list
    const storedGrocery = localStorage.getItem('mealPlannerGroceryList');
    if (storedGrocery) {
        groceryList = JSON.parse(storedGrocery);
    }
    
    updateUserDisplay();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing App');
    
    try {
        loadStoredData();
        showTab('setup');
        
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Error initializing app: ' + error.message, 'error');
    }
});
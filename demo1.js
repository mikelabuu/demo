// Smart Meal Budget Planner - Complete Version with User Management
class SmartMealPlanner {
    constructor() {
        this.currentStep = 1;
        this.userProfile = {
            name: '',
            age: '',
            gender: '',
            budgetPeriod: 'monthly',
            monthlyBudget: 3000,
            householdSize: 2,
            dietaryRestrictions: [],
            cuisinePreferences: ['filipino'],
            mealsPerMonth: 30
        };
        this.selectedMeals = new Map();
        this.mealDatabase = {
            filipino: [
                { 
                    name: 'Chicken Adobo', 
                    calories: 450, 
                    protein: 35, 
                    carbs: 8, 
                    fat: 28,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Chicken thighs', quantity: 1, unit: 'kg', cost: 180 },
                        { name: 'Soy sauce', quantity: 0.5, unit: 'cup', cost: 25 },
                        { name: 'Vinegar', quantity: 0.25, unit: 'cup', cost: 15 },
                        { name: 'Garlic', quantity: 6, unit: 'cloves', cost: 20 },
                        { name: 'Bay leaves', quantity: 3, unit: 'pieces', cost: 5 },
                        { name: 'Black pepper', quantity: 1, unit: 'tsp', cost: 3 }
                    ],
                    cost: 248,
                    category: 'filipino',
                    cookingTime: 45,
                    difficulty: 'easy',
                    tags: ['high-protein']
                },
                { 
                    name: 'Sinigang na Baboy', 
                    calories: 380, 
                    protein: 28, 
                    carbs: 12, 
                    fat: 22,
                    servingSize: 400, // grams per serving
                    ingredients: [
                        { name: 'Pork ribs', quantity: 0.8, unit: 'kg', cost: 220 },
                        { name: 'Tamarind mix', quantity: 1, unit: 'pack', cost: 15 },
                        { name: 'Radish', quantity: 1, unit: 'piece', cost: 25 },
                        { name: 'Water spinach', quantity: 1, unit: 'bunch', cost: 20 },
                        { name: 'Tomato', quantity: 2, unit: 'pieces', cost: 15 },
                        { name: 'Onion', quantity: 1, unit: 'piece', cost: 12 }
                    ],
                    cost: 307,
                    category: 'filipino',
                    cookingTime: 60,
                    difficulty: 'medium',
                    tags: []
                },
                { 
                    name: 'Fried Fish (Bangus)', 
                    calories: 320, 
                    protein: 32, 
                    carbs: 0, 
                    fat: 18,
                    servingSize: 250, // grams per serving
                    ingredients: [
                        { name: 'Milkfish (Bangus)', quantity: 1, unit: 'whole', cost: 150 },
                        { name: 'Cooking oil', quantity: 1, unit: 'cup', cost: 30 },
                        { name: 'Salt', quantity: 1, unit: 'tsp', cost: 2 },
                        { name: 'Pepper', quantity: 0.5, unit: 'tsp', cost: 3 },
                        { name: 'Calamansi', quantity: 3, unit: 'pieces', cost: 15 }
                    ],
                    cost: 200,
                    category: 'filipino',
                    cookingTime: 25,
                    difficulty: 'easy',
                    tags: ['high-protein', 'low-carb']
                },
                { 
                    name: 'Beef Caldereta', 
                    calories: 580, 
                    protein: 42, 
                    carbs: 15, 
                    fat: 35,
                    servingSize: 350, // grams per serving
                    ingredients: [
                        { name: 'Beef chuck', quantity: 1, unit: 'kg', cost: 350 },
                        { name: 'Tomato sauce', quantity: 1, unit: 'can', cost: 45 },
                        { name: 'Potatoes', quantity: 3, unit: 'pieces', cost: 30 },
                        { name: 'Carrots', quantity: 2, unit: 'pieces', cost: 25 },
                        { name: 'Bell peppers', quantity: 2, unit: 'pieces', cost: 40 },
                        { name: 'Liver spread', quantity: 1, unit: 'can', cost: 35 }
                    ],
                    cost: 525,
                    category: 'filipino',
                    cookingTime: 90,
                    difficulty: 'hard',
                    tags: ['high-protein']
                },
                { 
                    name: 'Pancit Canton', 
                    calories: 420, 
                    protein: 18, 
                    carbs: 58, 
                    fat: 12,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Canton noodles', quantity: 0.5, unit: 'kg', cost: 60 },
                        { name: 'Chicken breast', quantity: 0.3, unit: 'kg', cost: 90 },
                        { name: 'Cabbage', quantity: 0.5, unit: 'head', cost: 25 },
                        { name: 'Carrots', quantity: 2, unit: 'pieces', cost: 20 },
                        { name: 'Bell peppers', quantity: 1, unit: 'piece', cost: 25 },
                        { name: 'Soy sauce', quantity: 0.25, unit: 'cup', cost: 15 }
                    ],
                    cost: 235,
                    category: 'filipino',
                    cookingTime: 30,
                    difficulty: 'easy',
                    tags: []
                },
                { 
                    name: 'Vegetable Kare-Kare', 
                    calories: 320, 
                    protein: 12, 
                    carbs: 25, 
                    fat: 18,
                    servingSize: 350, // grams per serving
                    ingredients: [
                        { name: 'Eggplant', quantity: 2, unit: 'pieces', cost: 35 },
                        { name: 'String beans', quantity: 0.3, unit: 'kg', cost: 40 },
                        { name: 'Peanut butter', quantity: 0.5, unit: 'cup', cost: 60 },
                        { name: 'Bok choy', quantity: 1, unit: 'bunch', cost: 25 },
                        { name: 'Rice', quantity: 1, unit: 'cup', cost: 20 }
                    ],
                    cost: 180,
                    category: 'filipino',
                    cookingTime: 40,
                    difficulty: 'medium',
                    tags: ['vegetarian', 'heart-healthy']
                },
                { 
                    name: 'Pinakbet', 
                    calories: 280, 
                    protein: 15, 
                    carbs: 20, 
                    fat: 15,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Eggplant', quantity: 2, unit: 'pieces', cost: 35 },
                        { name: 'Bitter gourd', quantity: 1, unit: 'piece', cost: 25 },
                        { name: 'String beans', quantity: 0.2, unit: 'kg', cost: 30 },
                        { name: 'Squash', quantity: 0.5, unit: 'kg', cost: 40 },
                        { name: 'Pork belly', quantity: 0.3, unit: 'kg', cost: 100 },
                        { name: 'Tomato', quantity: 3, unit: 'pieces', cost: 20 }
                    ],
                    cost: 250,
                    category: 'filipino',
                    cookingTime: 40,
                    difficulty: 'medium',
                    tags: ['vegetarian-option']
                },
                { 
                    name: 'Lumpia Shanghai', 
                    calories: 350, 
                    protein: 20, 
                    carbs: 25, 
                    fat: 20,
                    servingSize: 200, // grams per serving
                    ingredients: [
                        { name: 'Ground pork', quantity: 0.5, unit: 'kg', cost: 150 },
                        { name: 'Carrots', quantity: 1, unit: 'piece', cost: 15 },
                        { name: 'Onion', quantity: 1, unit: 'piece', cost: 12 },
                        { name: 'Lumpia wrappers', quantity: 20, unit: 'pieces', cost: 50 },
                        { name: 'Cooking oil', quantity: 0.5, unit: 'cup', cost: 20 }
                    ],
                    cost: 247,
                    category: 'filipino',
                    cookingTime: 30,
                    difficulty: 'easy',
                    tags: []
                }
            ],
            asian: [
                { 
                    name: 'Chicken Teriyaki', 
                    calories: 450, 
                    protein: 38, 
                    carbs: 25, 
                    fat: 20,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Chicken thighs', quantity: 1, unit: 'kg', cost: 180 },
                        { name: 'Teriyaki sauce', quantity: 0.5, unit: 'cup', cost: 45 },
                        { name: 'Rice', quantity: 2, unit: 'cups', cost: 30 },
                        { name: 'Broccoli', quantity: 1, unit: 'head', cost: 35 },
                        { name: 'Sesame oil', quantity: 2, unit: 'tbsp', cost: 25 }
                    ],
                    cost: 315,
                    category: 'asian',
                    cookingTime: 35,
                    difficulty: 'easy',
                    tags: ['high-protein']
                },
                { 
                    name: 'Vegetable Stir Fry', 
                    calories: 280, 
                    protein: 8, 
                    carbs: 35, 
                    fat: 12,
                    servingSize: 250, // grams per serving
                    ingredients: [
                        { name: 'Mixed vegetables', quantity: 0.5, unit: 'kg', cost: 120 },
                        { name: 'Tofu', quantity: 0.3, unit: 'kg', cost: 80 },
                        { name: 'Soy sauce', quantity: 0.25, unit: 'cup', cost: 20 },
                        { name: 'Sesame oil', quantity: 1, unit: 'tbsp', cost: 25 },
                        { name: 'Garlic', quantity: 3, unit: 'cloves', cost: 15 }
                    ],
                    cost: 260,
                    category: 'asian',
                    cookingTime: 20,
                    difficulty: 'easy',
                    tags: ['vegetarian', 'heart-healthy']
                },
                { 
                    name: 'Sushi Rolls', 
                    calories: 300, 
                    protein: 15, 
                    carbs: 40, 
                    fat: 10,
                    servingSize: 200, // grams per serving
                    ingredients: [
                        { name: 'Sushi rice', quantity: 1, unit: 'cup', cost: 40 },
                        { name: 'Nori sheets', quantity: 5, unit: 'pieces', cost: 50 },
                        { name: 'Avocado', quantity: 1, unit: 'piece', cost: 30 },
                        { name: 'Cucumber', quantity: 1, unit: 'piece', cost: 20 },
                        { name: 'Fish (tuna)', quantity: 0.2, unit: 'kg', cost: 100 }
                    ],
                    cost: 240,
                    category: 'asian',
                    cookingTime: 45,
                    difficulty: 'medium',
                    tags: ['low-fat']
                },
                { 
                    name: 'Dim Sum Dumplings', 
                    calories: 250, 
                    protein: 12, 
                    carbs: 30, 
                    fat: 8,
                    servingSize: 150, // grams per serving
                    ingredients: [
                        { name: 'Dumpling wrappers', quantity: 20, unit: 'pieces', cost: 40 },
                        { name: 'Ground chicken', quantity: 0.3, unit: 'kg', cost: 90 },
                        { name: 'Cabbage', quantity: 0.2, unit: 'head', cost: 15 },
                        { name: 'Ginger', quantity: 1, unit: 'tbsp', cost: 10 },
                        { name: 'Soy sauce', quantity: 0.1, unit: 'cup', cost: 10 }
                    ],
                    cost: 165,
                    category: 'asian',
                    cookingTime: 30,
                    difficulty: 'medium',
                    tags: []
                }
            ],
            western: [  // Renamed from 'american' to match UI, but kept data
                { 
                    name: 'Grilled Chicken Salad', 
                    calories: 380, 
                    protein: 35, 
                    carbs: 15, 
                    fat: 18,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Chicken breast', quantity: 0.5, unit: 'kg', cost: 150 },
                        { name: 'Mixed greens', quantity: 1, unit: 'bag', cost: 80 },
                        { name: 'Cherry tomatoes', quantity: 1, unit: 'pack', cost: 60 },
                        { name: 'Cucumber', quantity: 1, unit: 'piece', cost: 25 },
                        { name: 'Olive oil', quantity: 0.25, unit: 'cup', cost: 40 },
                        { name: 'Lemon', quantity: 1, unit: 'piece', cost: 15 }
                    ],
                    cost: 370,
                    category: 'western',
                    cookingTime: 25,
                    difficulty: 'easy',
                    tags: ['high-protein', 'low-carb', 'heart-healthy']
                },
                { 
                    name: 'Pasta Primavera', 
                    calories: 420, 
                    protein: 15, 
                    carbs: 65, 
                    fat: 12,
                    servingSize: 350, // grams per serving
                    ingredients: [
                        { name: 'Pasta', quantity: 0.5, unit: 'kg', cost: 45 },
                        { name: 'Zucchini', quantity: 2, unit: 'pieces', cost: 40 },
                        { name: 'Cherry tomatoes', quantity: 1, unit: 'pack', cost: 60 },
                        { name: 'Bell peppers', quantity: 2, unit: 'pieces', cost: 50 },
                        { name: 'Parmesan cheese', quantity: 0.1, unit: 'kg', cost: 80 },
                        { name: 'Olive oil', quantity: 0.25, unit: 'cup', cost: 40 }
                    ],
                    cost: 315,
                    category: 'western',
                    cookingTime: 25,
                    difficulty: 'easy',
                    tags: ['vegetarian']
                },
                { 
                    name: 'Cheeseburger', 
                    calories: 550, 
                    protein: 30, 
                    carbs: 40, 
                    fat: 30,
                    servingSize: 250, // grams per serving
                    ingredients: [
                        { name: 'Ground beef', quantity: 0.3, unit: 'kg', cost: 120 },
                        { name: 'Burger buns', quantity: 4, unit: 'pieces', cost: 40 },
                        { name: 'Cheese slices', quantity: 4, unit: 'pieces', cost: 50 },
                        { name: 'Lettuce', quantity: 1, unit: 'head', cost: 30 },
                        { name: 'Tomato', quantity: 2, unit: 'pieces', cost: 20 }
                    ],
                    cost: 260,
                    category: 'western',
                    cookingTime: 20,
                    difficulty: 'easy',
                    tags: ['high-protein']
                },
                { 
                    name: 'Margherita Pizza', 
                    calories: 400, 
                    protein: 18, 
                    carbs: 50, 
                    fat: 15,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Pizza dough', quantity: 1, unit: 'pack', cost: 60 },
                        { name: 'Tomato sauce', quantity: 0.5, unit: 'cup', cost: 20 },
                        { name: 'Mozzarella cheese', quantity: 0.2, unit: 'kg', cost: 80 },
                        { name: 'Basil leaves', quantity: 1, unit: 'bunch', cost: 25 },
                        { name: 'Olive oil', quantity: 2, unit: 'tbsp', cost: 15 }
                    ],
                    cost: 200,
                    category: 'western',
                    cookingTime: 25,
                    difficulty: 'medium',
                    tags: ['vegetarian']
                }
            ],
            mediterranean: [
                { 
                    name: 'Greek Salad', 
                    calories: 300, 
                    protein: 10, 
                    carbs: 15, 
                    fat: 25,
                    servingSize: 250, // grams per serving
                    ingredients: [
                        { name: 'Cucumber', quantity: 2, unit: 'pieces', cost: 40 },
                        { name: 'Tomato', quantity: 3, unit: 'pieces', cost: 30 },
                        { name: 'Feta cheese', quantity: 0.1, unit: 'kg', cost: 60 },
                        { name: 'Olives', quantity: 0.1, unit: 'kg', cost: 50 },
                        { name: 'Olive oil', quantity: 0.25, unit: 'cup', cost: 40 }
                    ],
                    cost: 220,
                    category: 'mediterranean',
                    cookingTime: 15,
                    difficulty: 'easy',
                    tags: ['vegetarian', 'heart-healthy']
                },
                { 
                    name: 'Falafel Wrap', 
                    calories: 400, 
                    protein: 15, 
                    carbs: 50, 
                    fat: 20,
                    servingSize: 300, // grams per serving
                    ingredients: [
                        { name: 'Chickpeas', quantity: 0.5, unit: 'can', cost: 40 },
                        { name: 'Pita bread', quantity: 4, unit: 'pieces', cost: 50 },
                        { name: 'Tahini sauce', quantity: 0.25, unit: 'cup', cost: 30 },
                        { name: 'Lettuce', quantity: 1, unit: 'head', cost: 30 },
                        { name: 'Onion', quantity: 1, unit: 'piece', cost: 12 }
                    ],
                    cost: 162,
                    category: 'mediterranean',
                    cookingTime: 30,
                    difficulty: 'medium',
                    tags: ['vegetarian', 'high-protein']
                }
            ]
        };
        
        this.userStats = {
            totalPlans: 0,
            totalSavings: 0,
            totalMealsPlanned: 0,
            historicalData: []
        };

        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.loadBudgetSetup();
        this.updateBudgetDisplay();
        this.updateUserStats();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('smartMealUser');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            this.userProfile = { ...this.userProfile, ...userData.profile };
            this.userStats = { ...this.userStats, ...userData.stats };
        }
    }

    saveUserData() {
        const userData = {
            profile: this.userProfile,
            stats: this.userStats,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('smartMealUser', JSON.stringify(userData));
    }

    setupEventListeners() {
        // Budget input change
        document.getElementById('monthly-budget')?.addEventListener('input', (e) => {
            this.userProfile.monthlyBudget = parseFloat(e.target.value) || 0;
            this.updateBudgetDisplay();
        });

        // Household size change
        document.getElementById('household-size')?.addEventListener('change', (e) => {
            this.userProfile.householdSize = parseInt(e.target.value);
        });

        // Meals per month slider
        document.getElementById('meals-per-month')?.addEventListener('input', (e) => {
            this.userProfile.mealsPerMonth = parseInt(e.target.value);
            document.getElementById('meals-count').textContent = `${e.target.value} meals`;
        });

        // Dietary restrictions
        document.querySelectorAll('.dietary-restriction').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.userProfile.dietaryRestrictions.push(e.target.value);
                } else {
                    this.userProfile.dietaryRestrictions = this.userProfile.dietaryRestrictions.filter(pref => pref !== e.target.value);
                }
            });
        });

        // Cuisine preferences
        document.querySelectorAll('.cuisine-pref').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.userProfile.cuisinePreferences.push(e.target.value);
                } else {
                    this.userProfile.cuisinePreferences = this.userProfile.cuisinePreferences.filter(pref => pref !== e.target.value);
                }
            });
        });
    }

    loadBudgetSetup() {
        // Load user profile data into form
        document.getElementById('user-name').value = this.userProfile.name || '';
        document.getElementById('user-age').value = this.userProfile.age || '';
        document.getElementById('user-gender').value = this.userProfile.gender || '';
        document.getElementById('budget-period').value = this.userProfile.budgetPeriod || 'monthly';
        document.getElementById('monthly-budget').value = this.userProfile.monthlyBudget || 3000;
        document.getElementById('household-size').value = this.userProfile.householdSize || 2;
        document.getElementById('meals-per-month').value = this.userProfile.mealsPerMonth || 30;
        document.getElementById('meals-count').textContent = `${this.userProfile.mealsPerMonth || 30} meals`;

        // Check dietary restrictions
        this.userProfile.dietaryRestrictions.forEach(restriction => {
            const checkbox = document.querySelector(`.dietary-restriction[value="${restriction}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Check cuisine preferences
        this.userProfile.cuisinePreferences.forEach(cuisine => {
            const checkbox = document.querySelector(`.cuisine-pref[value="${cuisine}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    nextStep(step) {
        // Validate current step
        if (this.currentStep === 1 && !this.validateProfileSetup()) {
            return;
        }
        
        if (this.currentStep === 2 && this.selectedMeals.size === 0) {
            this.showNotification('Please select at least one meal', 'warning');
            return;
        }

        // Hide current step
        document.getElementById(`step-${this.currentStep}`).classList.add('hidden');
        
        // Show next step
        this.currentStep = step;
        document.getElementById(`step-${step}`).classList.remove('hidden');
        
        // Update step indicators
        this.updateStepIndicators();
        
        // Load step content
        if (step === 2) {
            this.loadMealSelection();
        } else if (step === 3) {
            this.loadAIAnalysis();
        } else if (step === 4) {
            this.loadShoppingList();
        } else if (step === 5) {
            this.loadAnalytics();
        }
    }

    prevStep(step) {
        // Hide current step
        document.getElementById(`step-${this.currentStep}`).classList.add('hidden');
        
        // Show previous step
        this.currentStep = step;
        document.getElementById(`step-${step}`).classList.remove('hidden');
        
        // Update step indicators
        this.updateStepIndicators();
    }

    updateStepIndicators() {
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
                indicator.innerHTML = '<i class="fas fa-check"></i>';
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
                indicator.textContent = stepNumber;
            } else {
                indicator.textContent = stepNumber;
            }
        });
    }

    validateProfileSetup() {
        const name = document.getElementById('user-name').value.trim();
        if (!name) {
            this.showNotification('Please enter your name', 'error');
            return false;
        }

        // Save profile data
        this.userProfile.name = name;
        this.userProfile.age = document.getElementById('user-age').value;
        this.userProfile.gender = document.getElementById('user-gender').value;
        this.userProfile.budgetPeriod = document.getElementById('budget-period').value;
        
        // Update navigation
        document.getElementById('nav-username').textContent = name;
        
        // Save to localStorage
        this.saveUserData();
        
        return true;
    }

    loadMealSelection() {
        const mealGrid = document.getElementById('meal-grid');
        if (!mealGrid) return;

        mealGrid.innerHTML = '';
        
        // Filter meals based on user preferences
        const filteredMeals = this.getFilteredMeals();

        filteredMeals.forEach((meal, index) => {
            const mealCard = this.createMealCard(meal, index);
            mealGrid.appendChild(mealCard);
        });

        this.updateBudgetProgress();
    }

    getFilteredMeals() {
        const allMeals = [];
        Object.values(this.mealDatabase).forEach(categoryMeals => {
            allMeals.push(...categoryMeals);
        });

        // Filter by cuisine preferences
        let filteredMeals = allMeals.filter(meal => 
            this.userProfile.cuisinePreferences.includes(meal.category)
        );

        // Filter by dietary restrictions
        if (this.userProfile.dietaryRestrictions.includes('vegetarian')) {
            filteredMeals = filteredMeals.filter(meal => 
                meal.tags.includes('vegetarian') || 
                !meal.ingredients.some(ing => 
                    ['chicken', 'beef', 'pork', 'fish', 'bacon'].some(meat => 
                        ing.name.toLowerCase().includes(meat)
                    )
                )
            );
        }

        if (this.userProfile.dietaryRestrictions.includes('no-pork')) {
            filteredMeals = filteredMeals.filter(meal => 
                !meal.ingredients.some(ing => 
                    ing.name.toLowerCase().includes('pork')
                )
            );
        }

        if (this.userProfile.dietaryRestrictions.includes('low-carb')) {
            filteredMeals = filteredMeals.filter(meal => 
                meal.tags.includes('low-carb') || meal.carbs < 20
            );
        }

        if (this.userProfile.dietaryRestrictions.includes('high-protein')) {
            filteredMeals = filteredMeals.filter(meal => 
                meal.tags.includes('high-protein') || meal.protein > 25
            );
        }

        return filteredMeals;
    }

    createMealCard(meal, index) {
        const card = document.createElement('div');
        card.className = 'meal-card bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300';
        card.dataset.mealId = index;
        card.dataset.category = meal.category;

        const isSelected = this.selectedMeals.has(index);
        if (isSelected) {
            card.classList.add('selected', 'border-emerald-500');
        }

        // Calculate portion sizes
        const baseCost = meal.cost;
        const householdSize = parseInt(this.userProfile.householdSize);
        const adjustedCost = baseCost * householdSize;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${meal.name}</h3>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span><i class="fas fa-clock mr-1"></i>${meal.cookingTime}min</span>
                        <span><i class="fas fa-signal mr-1"></i>${meal.difficulty}</span>
                        ${meal.tags.map(tag => `<span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-xl font-bold text-emerald-600">₱${adjustedCost}</div>
                    <div class="text-sm text-gray-500">for ${householdSize} person${householdSize > 1 ? 's' : ''}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="text-center p-2 bg-gray-50 rounded-lg">
                    <div class="text-sm font-semibold text-gray-900">${meal.calories}</div>
                    <div class="text-xs text-gray-500">calories</div>
                </div>
                <div class="text-center p-2 bg-gray-50 rounded-lg">
                    <div class="text-sm font-semibold text-gray-900">${meal.protein}g</div>
                    <div class="text-xs text-gray-500">protein</div>
                </div>
                <div class="text-center p-2 bg-gray-50 rounded-lg">
                    <div class="text-sm font-semibold text-gray-900">${meal.carbs}g</div>
                    <div class="text-xs text-gray-500">carbs</div>
                </div>
            </div>

            <div class="mb-4">
                <div class="text-sm text-gray-600 mb-2">Serving Size: ${meal.servingSize}g</div>
            </div>

            <div class="mb-4">
                <div class="text-sm text-gray-600 mb-2">Ingredients:</div>
                <div class="flex flex-wrap gap-1">
                    ${meal.ingredients.slice(0, 4).map(ing => 
                        `<span class="ingredient-tag px-2 py-1 rounded-full text-xs">${ing.name}</span>`
                    ).join('')}
                    ${meal.ingredients.length > 4 ? '<span class="text-xs text-gray-500">+more</span>' : ''}
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <button onclick="planner.updateMealFrequency(${index}, -1)" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center font-semibold" id="frequency-${index}">${this.selectedMeals.get(index) || 0}</span>
                    <button onclick="planner.updateMealFrequency(${index}, 1)" class="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white transition-colors">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <div class="text-sm text-gray-500">
                    times/month
                </div>
            </div>
        `;

        // Add click handler for card selection
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.toggleMealSelection(index);
            }
        });

        return card;
    }

    toggleMealSelection(mealId) {
        if (this.selectedMeals.has(mealId)) {
            this.selectedMeals.delete(mealId);
        } else {
            this.selectedMeals.set(mealId, 1);
        }
        
        this.loadMealSelection();
        this.updateBudgetProgress();
    }

    updateMealFrequency(mealId, change) {
        const currentFreq = this.selectedMeals.get(mealId) || 0;
        const newFreq = Math.max(0, currentFreq + change);
        
        if (newFreq === 0) {
            this.selectedMeals.delete(mealId);
        } else {
            this.selectedMeals.set(mealId, newFreq);
        }
        
        this.loadMealSelection();
        this.updateBudgetProgress();
    }

    updateBudgetProgress() {
        const totalCost = this.calculateTotalCost();
        const percentage = Math.min((totalCost / this.userProfile.monthlyBudget) * 100, 100);
        
        document.getElementById('budget-bar').style.width = `${percentage}%`;
        document.getElementById('budget-percentage').textContent = `${Math.round(percentage)}%`;
        document.getElementById('current-spending').textContent = `₱${totalCost.toLocaleString()}`;
        
        const remaining = Math.max(0, this.userProfile.monthlyBudget - totalCost);
        document.getElementById('remaining-budget').textContent = `₱${remaining.toLocaleString()} remaining`;
        
        // Update continue button
        const continueBtn = document.getElementById('continue-btn-2');
        if (continueBtn) {
            continueBtn.disabled = this.selectedMeals.size === 0;
        }

        // Update navigation budget
        document.getElementById('nav-budget').textContent = `₱${this.userProfile.monthlyBudget.toLocaleString()}`;
    }

    calculateTotalCost() {
        let total = 0;
        const filteredMeals = this.getFilteredMeals();
        const householdSize = parseInt(this.userProfile.householdSize);

        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                total += (meal.cost * householdSize) * frequency;
            }
        });

        return total;
    }

    filterMeals(category) {
        // Update filter buttons
        document.querySelectorAll('.meal-filter').forEach(btn => {
            btn.classList.remove('active', 'bg-emerald-500', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        event.target.classList.add('active', 'bg-emerald-500', 'text-white');
        event.target.classList.remove('bg-gray-200', 'text-gray-700');

        // Filter meal cards
        document.querySelectorAll('.meal-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    loadAIAnalysis() {
        this.createCostChart();
        this.createNutritionChart();
        this.generateOptimizations();
        this.generateRecommendations();
    }

    createCostChart() {
        const filteredMeals = this.getFilteredMeals();
        const costData = [];
        const labels = [];
        const householdSize = parseInt(this.userProfile.householdSize);
        
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                labels.push(meal.name);
                costData.push((meal.cost * householdSize) * frequency);
            }
        });

        const data = [{
            values: costData,
            labels: labels,
            type: 'pie',
            hole: 0.4,
            marker: {
                colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#ecfdf5']
            },
            textinfo: 'label+percent',
            textposition: 'outside'
        }];

        const layout = {
            showlegend: false,
            margin: { t: 0, b: 0, l: 0, r: 0 },
            font: { size: 12 }
        };

        Plotly.newPlot('cost-chart', data, layout, {responsive: true});
    }

    createNutritionChart() {
        const filteredMeals = this.getFilteredMeals();
        let totalProtein = 0, totalCarbs = 0, totalFat = 0;
        const householdSize = parseInt(this.userProfile.householdSize);

        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                totalProtein += meal.protein * frequency * householdSize;
                totalCarbs += meal.carbs * frequency * householdSize;
                totalFat += meal.fat * frequency * householdSize;
            }
        });

        const data = [{
            values: [totalProtein, totalCarbs, totalFat],
            labels: ['Protein', 'Carbs', 'Fat'],
            type: 'pie',
            hole: 0.4,
            marker: {
                colors: ['#10b981', '#3b82f6', '#ef4444']
            },
            textinfo: 'label+percent',
            textposition: 'outside'
        }];

        const layout = {
            showlegend: false,
            margin: { t: 0, b: 0, l: 0, r: 0 },
            font: { size: 12 }
        };

        Plotly.newPlot('nutrition-chart', data, layout, {responsive: true});
    }

    generateOptimizations() {
        const container = document.getElementById('ai-optimizations');
        if (!container) return;

        const filteredMeals = this.getFilteredMeals();
        const totalCost = this.calculateTotalCost();
        const budgetDiff = this.userProfile.monthlyBudget - totalCost;

        let optimizations = [];

        if (budgetDiff > 0) {
            optimizations.push({
                type: 'success',
                title: 'Budget Surplus',
                message: `You have ₱${budgetDiff} remaining. Consider adding more nutrient-dense meals or upgrading ingredients.`,
                icon: 'fas fa-check-circle'
            });
        } else if (budgetDiff < 0) {
            optimizations.push({
                type: 'warning',
                title: 'Over Budget',
                message: `You're ₱${Math.abs(budgetDiff)} over budget. Try reducing portions or replacing expensive meals.`,
                icon: 'fas fa-exclamation-triangle'
            });
        }

        // Time optimization
        let totalTime = 0;
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                totalTime += filteredMeals[mealId].cookingTime * frequency;
            }
        });

        if (totalTime > 20 * 60) { // More than 20 hours/month
            optimizations.push({
                type: 'info',
                title: 'Time Optimization',
                message: 'Your plan requires significant cooking time. Consider batch cooking or quicker recipes to save time.',
                icon: 'fas fa-clock'
            });
        }

        // Render optimizations
        container.innerHTML = optimizations.map(opt => `
            <div class="flex items-start p-4 rounded-xl border-l-4 ${this.getRecommendationStyle(opt.type)}">
                <div class="flex-shrink-0 mr-4">
                    <i class="${opt.icon} text-xl ${this.getRecommendationIconColor(opt.type)}"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-1">${opt.title}</h4>
                    <p class="text-gray-600 text-sm">${opt.message}</p>
                </div>
            </div>
        `).join('');
    }

    generateRecommendations() {
        const container = document.getElementById('ai-recommendations');
        if (!container) return;

        const filteredMeals = this.getFilteredMeals();
        const totalCost = this.calculateTotalCost();
        const budgetDiff = this.userProfile.monthlyBudget - totalCost;

        let recommendations = [];

        // Nutritional balance recommendations
        let totalProtein = 0, totalCarbs = 0, totalFat = 0;
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                const householdSize = parseInt(this.userProfile.householdSize);
                totalProtein += meal.protein * frequency * householdSize;
                totalCarbs += meal.carbs * frequency * householdSize;
                totalFat += meal.fat * frequency * householdSize;
            }
        });

        const totalGrams = totalProtein + totalCarbs + totalFat;
        const proteinPercent = (totalProtein / totalGrams) * 100;
        const carbsPercent = (totalCarbs / totalGrams) * 100;
        const fatPercent = (totalFat / totalGrams) * 100;

        if (proteinPercent < 20) {
            recommendations.push({
                type: 'info',
                title: 'Increase Protein Intake',
                message: 'Consider adding more protein-rich meals like grilled chicken, fish, or beef dishes for better nutritional balance.',
                icon: 'fas fa-dumbbell'
            });
        }

        if (carbsPercent > 50) {
            recommendations.push({
                type: 'info',
                title: 'Carbohydrate Balance',
                message: 'Your meal plan is high in carbohydrates. Consider adding more protein and vegetable-based dishes.',
                icon: 'fas fa-balance-scale'
            });
        }

        // Cost-saving suggestions
        const expensiveMeals = [];
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId] && filteredMeals[mealId].cost > 400) {
                expensiveMeals.push({
                    name: filteredMeals[mealId].name,
                    cost: filteredMeals[mealId].cost * frequency * parseInt(this.userProfile.householdSize)
                });
            }
        });

        if (expensiveMeals.length > 0 && budgetDiff < this.userProfile.monthlyBudget * 0.1) {
            recommendations.push({
                type: 'tip',
                title: 'Cost Optimization Opportunity',
                message: `Consider replacing ${expensiveMeals[0].name} with a more budget-friendly alternative to save ₱${expensiveMeals[0].cost - 200} per month.`,
                icon: 'fas fa-lightbulb'
            });
        }

        // Render recommendations
        container.innerHTML = recommendations.map(rec => `
            <div class="flex items-start p-4 rounded-xl border-l-4 ${this.getRecommendationStyle(rec.type)}">
                <div class="flex-shrink-0 mr-4">
                    <i class="${rec.icon} text-xl ${this.getRecommendationIconColor(rec.type)}"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-1">${rec.title}</h4>
                    <p class="text-gray-600 text-sm">${rec.message}</p>
                </div>
            </div>
        `).join('');
    }

    getRecommendationStyle(type) {
        const styles = {
            success: 'bg-emerald-50 border-emerald-500',
            warning: 'bg-yellow-50 border-yellow-500',
            info: 'bg-blue-50 border-blue-500',
            tip: 'bg-purple-50 border-purple-500'
        };
        return styles[type] || styles.info;
    }

    getRecommendationIconColor(type) {
        const colors = {
            success: 'text-emerald-500',
            warning: 'text-yellow-500',
            info: 'text-blue-500',
            tip: 'text-purple-500'
        };
        return colors[type] || colors.info;
    }

    loadShoppingList() {
        const shoppingList = this.generateShoppingList();
        
        // Update summary cards
        document.getElementById('total-cost').textContent = `₱${shoppingList.totalCost.toLocaleString()}`;
        document.getElementById('total-savings').textContent = `₱${Math.max(0, this.userProfile.monthlyBudget - shoppingList.totalCost).toLocaleString()} savings`;
        document.getElementById('total-items').textContent = shoppingList.totalItems;
        document.getElementById('total-meals').textContent = Array.from(this.selectedMeals.values()).reduce((sum, freq) => sum + freq, 0);

        // Calculate total cooking time
        const filteredMeals = this.getFilteredMeals();
        let totalCookTime = 0;
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                totalCookTime += filteredMeals[mealId].cookingTime * frequency;
            }
        });
        document.getElementById('total-cook-time').textContent = totalCookTime;

        // Render shopping list by category
        const container = document.getElementById('shopping-list');
        container.innerHTML = '';

        Object.keys(shoppingList.categories).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'bg-white rounded-2xl p-6 border border-gray-200';
            
            const items = shoppingList.categories[category];
            
            categoryDiv.innerHTML = `
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="${this.getCategoryIcon(category)} mr-3 text-emerald-500"></i>
                    ${category}
                    <span class="ml-auto text-sm text-gray-500">${items.length} items</span>
                </h3>
                <div class="space-y-3">
                    ${items.map(item => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <input type="checkbox" class="mr-3 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
                                <div>
                                    <div class="font-medium text-gray-900">${item.name}</div>
                                    <div class="text-sm text-gray-500">${item.quantity} ${item.unit}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-gray-900">₱${item.totalCost}</div>
                                <div class="text-sm text-gray-500">₱${item.unitCost}/${item.unit}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.appendChild(categoryDiv);
        });

        // Add smart suggestions section
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'bg-white rounded-2xl p-6 border border-gray-200 mt-6';
        suggestionsDiv.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-lightbulb mr-3 text-yellow-500"></i>
                Smart Suggestions & Substitutions
            </h3>
            <div class="space-y-3">
                ${shoppingList.suggestions.map(sug => `
                    <div class="p-3 bg-yellow-50 rounded-lg">
                        <div class="font-medium text-gray-900">For ${sug.item}: Suggest ${sug.substitute}</div>
                        <div class="text-sm text-gray-600">Potential savings: ₱${sug.savings}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(suggestionsDiv);
    }

    generateShoppingList() {
        const filteredMeals = this.getFilteredMeals();
        const ingredientMap = new Map();
        const householdSize = parseInt(this.userProfile.householdSize);
        
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                meal.ingredients.forEach(ingredient => {
                    const key = ingredient.name.toLowerCase();
                    const adjustedQuantity = ingredient.quantity * frequency * householdSize;
                    const adjustedCost = ingredient.cost * frequency * householdSize;
                    
                    if (ingredientMap.has(key)) {
                        const existing = ingredientMap.get(key);
                        existing.quantity += adjustedQuantity;
                        existing.totalCost += adjustedCost;
                    } else {
                        ingredientMap.set(key, {
                            name: ingredient.name,
                            quantity: adjustedQuantity,
                            unit: ingredient.unit,
                            unitCost: ingredient.cost / ingredient.quantity,
                            totalCost: adjustedCost,
                            category: this.categorizeIngredient(ingredient.name)
                        });
                    }
                });
            }
        });

        // Group by category
        const categories = {};
        let totalCost = 0;
        let totalItems = 0;

        ingredientMap.forEach(ingredient => {
            const category = ingredient.category;
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(ingredient);
            totalCost += ingredient.totalCost;
            totalItems++;
        });

        // Generate smart suggestions and substitutions
        const suggestions = this.generateSuggestions(ingredientMap);

        return {
            categories,
            totalCost,
            totalItems,
            suggestions
        };
    }

    generateSuggestions(ingredientMap) {
        const suggestions = [];
        
        // Example rules for suggestions
        ingredientMap.forEach((item) => {
            const lowerName = item.name.toLowerCase();
            
            if (lowerName.includes('beef')) {
                suggestions.push({
                    item: item.name,
                    substitute: 'Chicken (cheaper alternative)',
                    savings: Math.round(item.totalCost * 0.3) // 30% savings estimate
                });
            } else if (lowerName.includes('olive oil')) {
                suggestions.push({
                    item: item.name,
                    substitute: 'Vegetable oil',
                    savings: Math.round(item.totalCost * 0.2)
                });
            } else if (lowerName.includes('cheese')) {
                suggestions.push({
                    item: item.name,
                    substitute: 'Local cheese brand',
                    savings: Math.round(item.totalCost * 0.25)
                });
            } else if (item.totalCost > 100) {
                suggestions.push({
                    item: item.name,
                    substitute: 'Buy in bulk or generic brand',
                    savings: Math.round(item.totalCost * 0.15)
                });
            }
        });

        // Add general tips if no specific
        if (suggestions.length < 3) {
            suggestions.push({
                item: 'General',
                substitute: 'Shop at local markets for fresh produce',
                savings: 'Up to 20% on vegetables'
            });
            suggestions.push({
                item: 'General',
                substitute: 'Use frozen ingredients where possible',
                savings: '10-15% savings'
            });
        }

        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }

    categorizeIngredient(name) {
        const categories = {
            'Proteins': ['chicken', 'beef', 'pork', 'fish', 'bacon', 'eggs', 'tofu'],
            'Vegetables': ['broccoli', 'cabbage', 'carrots', 'bell peppers', 'onion', 'tomato', 'spinach', 'cucumber', 'zucchini', 'radish', 'potatoes', 'eggplant', 'beans'],
            'Pantry': ['soy sauce', 'vinegar', 'oil', 'salt', 'pepper', 'garlic', 'sauce', 'pasta', 'rice', 'noodles', 'teriyaki'],
            'Dairy': ['cheese', 'milk', 'butter'],
            'Fruits': ['lemon', 'lime', 'pear'],
            'Other': []
        };

        const lowerName = name.toLowerCase();
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => lowerName.includes(keyword))) {
                return category;
            }
        }
        return 'Other';
    }

    getCategoryIcon(category) {
        const icons = {
            'Proteins': 'fas fa-drumstick-bite',
            'Vegetables': 'fas fa-leaf',
            'Pantry': 'fas fa-box',
            'Dairy': 'fas fa-cheese',
            'Fruits': 'fas fa-apple-alt',
            'Other': 'fas fa-question-circle'
        };
        return icons[category] || icons['Other'];
    }

    loadAnalytics() {
        this.createSpendingChart();
        this.updateBudgetOverview();
        this.updateTopMeals();
        this.updateCostBreakdown();
        this.updateNutritionAnalysis();
        this.updateOptimizationTips();
    }

    createSpendingChart() {
        // Generate historical data
        const historicalData = this.userStats.historicalData.length > 0 ? 
            this.userStats.historicalData : 
            this.generateMockHistoricalData();

        const data = [{
            x: historicalData.map(d => d.date),
            y: historicalData.map(d => d.spent),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Actual Spending',
            line: { color: '#10b981' }
        }, {
            x: historicalData.map(d => d.date),
            y: historicalData.map(d => d.budget),
            type: 'scatter',
            mode: 'lines',
            name: 'Budget',
            line: { color: '#ef4444', dash: 'dash' }
        }];

        const layout = {
            title: 'Monthly Spending Trends',
            xaxis: { title: 'Month' },
            yaxis: { title: 'Amount (₱)' },
            margin: { t: 40, b: 40, l: 60, r: 40 }
        };

        Plotly.newPlot('spending-chart', data, layout, {responsive: true});
    }

    generateMockHistoricalData() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map(month => ({
            date: month,
            spent: Math.floor(Math.random() * 1000) + 2000,
            budget: this.userProfile.monthlyBudget
        }));
    }

    updateBudgetOverview() {
        const totalCost = this.calculateTotalCost();
        const percentage = Math.min((totalCost / this.userProfile.monthlyBudget) * 100, 100);
        
        document.getElementById('budget-percent').textContent = `${Math.round(percentage)}%`;
        document.getElementById('budget-used').textContent = `₱${totalCost.toLocaleString()} of ₱${this.userProfile.monthlyBudget.toLocaleString()}`;
        
        // Update progress circle
        const circle = document.getElementById('budget-circle');
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    }

    updateTopMeals() {
        const container = document.getElementById('top-meals');
        const filteredMeals = this.getFilteredMeals();
        const mealCounts = [];
        
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                mealCounts.push({
                    name: filteredMeals[mealId].name,
                    count: frequency
                });
            }
        });

        mealCounts.sort((a, b) => b.count - a.count);
        
        container.innerHTML = mealCounts.slice(0, 3).map((meal, index) => `
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700">${index + 1}. ${meal.name}</span>
                <span class="text-sm font-semibold text-gray-900">${meal.count}x</span>
            </div>
        `).join('');
    }

    updateCostBreakdown() {
        const container = document.getElementById('cost-breakdown');
        const shoppingList = this.generateShoppingList();
        
        const categoryCosts = Object.keys(shoppingList.categories).map(category => ({
            category,
            cost: shoppingList.categories[category].reduce((sum, item) => sum + item.totalCost, 0)
        })).sort((a, b) => b.cost - a.cost);

        container.innerHTML = categoryCosts.slice(0, 4).map(cat => `
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700">${cat.category}</span>
                <span class="text-sm font-semibold text-gray-900">₱${cat.cost.toLocaleString()}</span>
            </div>
        `).join('');
    }

    updateNutritionAnalysis() {
        const container = document.getElementById('nutrition-analysis');
        const filteredMeals = this.getFilteredMeals();
        let totalProtein = 0, totalCarbs = 0, totalFat = 0, totalCalories = 0;
        const householdSize = parseInt(this.userProfile.householdSize);
        
        this.selectedMeals.forEach((frequency, mealId) => {
            if (filteredMeals[mealId]) {
                const meal = filteredMeals[mealId];
                totalProtein += meal.protein * frequency * householdSize;
                totalCarbs += meal.carbs * frequency * householdSize;
                totalFat += meal.fat * frequency * householdSize;
                totalCalories += meal.calories * frequency * householdSize;
            }
        });

        const totalGrams = totalProtein + totalCarbs + totalFat;
        const proteinPercent = ((totalProtein / totalGrams) * 100).toFixed(1);
        const carbsPercent = ((totalCarbs / totalGrams) * 100).toFixed(1);
        const fatPercent = ((totalFat / totalGrams) * 100).toFixed(1);

        container.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Total Calories</span>
                    <span class="font-semibold">${totalCalories.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Protein</span>
                    <span class="font-semibold">${totalProtein}g (${proteinPercent}%)</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Carbs</span>
                    <span class="font-semibold">${totalCarbs}g (${carbsPercent}%)</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Fat</span>
                    <span class="font-semibold">${totalFat}g (${fatPercent}%)</span>
                </div>
            </div>
        `;
    }

    updateOptimizationTips() {
        const container = document.getElementById('optimization-tips');
        const tips = [
            "Buy ingredients in bulk to save money",
            "Plan meals around seasonal vegetables",
            "Use leftovers creatively for next day's meals",
            "Prep ingredients in advance to save time",
            "Consider frozen vegetables for cost savings"
        ];

        container.innerHTML = tips.map(tip => `
            <div class="flex items-start">
                <i class="fas fa-lightbulb text-yellow-500 mr-2 mt-1"></i>
                <span class="text-sm text-gray-600">${tip}</span>
            </div>
        `).join('');
    }

    updateUserStats() {
        // Update global stats
        document.getElementById('total-users').textContent = '1,247';
        document.getElementById('total-savings').textContent = '₱156,890';
        document.getElementById('total-meals-planned').textContent = '8,934';
        document.getElementById('avg-savings').textContent = '₱125';

        // Update user-specific stats
        document.getElementById('modal-total-plans').textContent = this.userStats.totalPlans;
        document.getElementById('modal-total-savings').textContent = `₱${this.userStats.totalSavings.toLocaleString()}`;
    }

    completePlanning() {
        // Calculate final savings
        const totalCost = this.calculateTotalCost();
        const savings = Math.max(0, this.userProfile.monthlyBudget - totalCost);
        
        // Update user stats
        this.userStats.totalPlans++;
        this.userStats.totalSavings += savings;
        this.userStats.totalMealsPlanned += Array.from(this.selectedMeals.values()).reduce((sum, freq) => sum + freq, 0);
        
        // Add to historical data
        this.userStats.historicalData.push({
            date: new Date().toLocaleDateString('en-US', { month: 'short' }),
            spent: totalCost,
            budget: this.userProfile.monthlyBudget,
            savings: savings
        });

        // Save user data
        this.saveUserData();

        // Update completion screen
        document.getElementById('final-savings').textContent = `₱${savings.toLocaleString()}`;
        document.getElementById('final-meals').textContent = this.userStats.totalMealsPlanned;
        document.getElementById('final-efficiency').textContent = `${Math.round((savings / this.userProfile.monthlyBudget) * 100)}%`;

        // Show completion screen
        document.getElementById('step-5').classList.add('hidden');
        document.getElementById('completion').classList.remove('hidden');
        this.updateStepIndicators();
    }

    downloadShoppingListPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const shoppingList = this.generateShoppingList();
        
        // Title
        doc.setFontSize(20);
        doc.text('Smart Meal Planner - Shopping List', 20, 30);
        
        // User info
        doc.setFontSize(12);
        doc.text(`User: ${this.userProfile.name}`, 20, 45);
        doc.text(`Budget: ₱${this.userProfile.monthlyBudget.toLocaleString()}`, 20, 55);
        doc.text(`Total Cost: ₱${shoppingList.totalCost.toLocaleString()}`, 20, 65);
        
        let yPosition = 80;
        
        // Shopping list categories
        Object.keys(shoppingList.categories).forEach(category => {
            doc.setFontSize(14);
            doc.text(category.toUpperCase(), 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            shoppingList.categories[category].forEach(item => {
                if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.text(`□ ${item.name} - ${item.quantity} ${item.unit} (₱${item.totalCost})`, 25, yPosition);
                yPosition += 8;
            });
            yPosition += 5;
        });
        
        // Add suggestions to PDF
        doc.addPage();
        yPosition = 20;
        doc.setFontSize(14);
        doc.text('Smart Suggestions & Substitutions', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        shoppingList.suggestions.forEach(sug => {
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(`For ${sug.item}: Suggest ${sug.substitute} - Savings: ₱${sug.savings}`, 25, yPosition);
            yPosition += 8;
        });
        
        doc.save(`shopping-list-${this.userProfile.name}-${new Date().toISOString().split('T')[0]}.pdf`);
        this.showNotification('Shopping list downloaded as PDF!', 'success');
    }

    downloadShoppingList() {
        const shoppingList = this.generateShoppingList();
        let content = `Smart Meal Planner - Shopping List\n\n`;
        content += `User: ${this.userProfile.name}\n`;
        content += `Budget: ₱${this.userProfile.monthlyBudget.toLocaleString()}\n`;
        content += `Total Cost: ₱${shoppingList.totalCost.toLocaleString()}\n`;
        content += `Savings: ₱${Math.max(0, this.userProfile.monthlyBudget - shoppingList.totalCost).toLocaleString()}\n\n`;

        Object.keys(shoppingList.categories).forEach(category => {
            content += `${category.toUpperCase()}\n`;
            content += `${'='.repeat(category.length)}\n`;
            shoppingList.categories[category].forEach(item => {
                content += `□ ${item.name} - ${item.quantity} ${item.unit} (₱${item.totalCost})\n`;
            });
            content += '\n';
        });

        content += `Smart Suggestions & Substitutions\n`;
        content += `================================\n`;
        shoppingList.suggestions.forEach(sug => {
            content += `For ${sug.item}: Suggest ${sug.substitute} - Savings: ₱${sug.savings}\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `shopping-list-${this.userProfile.name}-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Shopping list downloaded successfully!', 'success');
    }

    printShoppingList() {
        window.print();
    }

    startOver() {
        if (confirm('Are you sure you want to start a new plan? Your current selections will be cleared.')) {
            // Reset current plan
            this.selectedMeals.clear();
            this.currentStep = 1;
            
            // Hide all steps except first
            document.querySelectorAll('.step-content').forEach(step => {
                step.classList.add('hidden');
            });
            document.getElementById('step-1').classList.remove('hidden');
            document.getElementById('completion').classList.add('hidden');
            
            this.updateStepIndicators();
        }
    }

    showAnalytics() {
        this.showNotification('Analytics dashboard coming soon!', 'info');
    }

    exportAllData() {
        const exportData = {
            userProfile: this.userProfile,
            userStats: this.userStats,
            selectedMeals: Array.from(this.selectedMeals.entries()),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `smart-meal-data-${this.userProfile.name}-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    resetUserData() {
        if (confirm('Are you sure you want to reset all your data? This cannot be undone.')) {
            localStorage.removeItem('smartMealUser');
            location.reload();
        }
    }

    updateBudgetDisplay() {
        document.getElementById('display-budget').textContent = `₱${this.userProfile.monthlyBudget.toLocaleString()}`;
        document.getElementById('nav-budget').textContent = `₱${this.userProfile.monthlyBudget.toLocaleString()}`;
    }

    showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'fixed top-4 right-4 z-50 transform translate-x-full transition-transform duration-300';
            document.body.appendChild(notification);
        }

        const icons = {
            success: 'fas fa-check-circle text-emerald-400',
            warning: 'fas fa-exclamation-triangle text-yellow-400',
            error: 'fas fa-times-circle text-red-400',
            info: 'fas fa-info-circle text-blue-400'
        };

        const colors = {
            success: 'bg-emerald-50 border-emerald-200',
            warning: 'bg-yellow-50 border-yellow-200',
            error: 'bg-red-50 border-red-200',
            info: 'bg-blue-50 border-blue-200'
        };

        notification.innerHTML = `
            <div class="flex items-center p-4 rounded-lg border ${colors[type]} shadow-lg max-w-sm">
                <i class="${icons[type]} text-xl mr-3"></i>
                <p class="text-gray-800 text-sm font-medium">${message}</p>
                <button onclick="this.parentElement.parentElement.classList.add('translate-x-full')" class="ml-4 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Show notification
        notification.classList.remove('translate-x-full');

        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
        }, 5000);
    }
}

// Profile Modal Functions
function showProfileModal() {
    const modal = document.getElementById('profile-modal');
    const user = planner.userProfile;
    
    // Update modal content
    document.getElementById('modal-user-name').textContent = user.name || 'Guest User';
    document.getElementById('modal-user-details').textContent = 
        user.age && user.gender ? `${user.age} years old, ${user.gender}` : 'No profile set up';
    document.getElementById('modal-user-budget').textContent = `₱${user.monthlyBudget.toLocaleString()}`;
    document.getElementById('modal-household-size').textContent = `${user.householdSize} person${user.householdSize > 1 ? 's' : ''}`;
    
    // Update user avatar
    const avatar = document.getElementById('modal-user-avatar');
    if (user.name) {
        avatar.textContent = user.name.charAt(0).toUpperCase();
    } else {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
    }
    
    modal.classList.remove('hidden');
}

function hideProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function editProfile() {
    hideProfileModal();
    planner.prevStep(1);
}

function resetUserData() {
    planner.resetUserData();
}

function exportReport() {
    planner.showNotification('Report export feature coming soon!', 'info');
}

// Global functions for HTML onclick handlers
function nextStep(step) {
    planner.nextStep(step);
}

function prevStep(step) {
    planner.prevStep(step);
}

function filterMeals(category) {
    planner.filterMeals(category);
}

function downloadShoppingListPDF() {
    planner.downloadShoppingListPDF();
}

function downloadShoppingList() {
    planner.downloadShoppingList();
}

function printShoppingList() {
    planner.printShoppingList();
}

function completePlanning() {
    planner.completePlanning();
}

function startOver() {
    planner.startOver();
}

function showAnalytics() {
    planner.showAnalytics();
}

function exportAllData() {
    planner.exportAllData();
}

// Initialize the planner when the page loads
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new SmartMealPlanner();
});
const Foods = require('./foods-model');

const validateFoodBody = (req, res, next) => {
    const { food_name, food_description } = req.body;
    if (!food_name || food_name.trim() === '') {
        next({
            status: 400,
            message: 'Food name is required'
        });
    } else {
        req.food = {
            food_name: food_name.trim(),
            food_description: food_description ? food_description.trim() : 'no description yet'
        };
        next();
    }
};

const checkFoodIsUnique = async (req, res, next) => {
    const { food_name } = req.food;
    const food = await Foods.getFoodBy({ food_name });
    if (food) {
        next({
            status: 400,
            message: 'Looks like that food item already exists!'
        });
    } else {
        next();
    }
};

module.exports = {
    validateFoodBody,
    checkFoodIsUnique
};
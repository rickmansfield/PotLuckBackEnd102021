const db = require('../data/db-config');

const getFoods = () => {
    return db('foods AS f')
        .orderBy('f.food_id');
};

const getFoodBy = filter => {
    return db('foods AS f')
        .where(filter)
        .first();
};

const getFoodById = food_id => {
    return db('foods AS f')
        .where('f.food_id', food_id)
        .first();
};

const createFood = newFood => {
    return db('foods AS f')
        .insert(newFood, ['*']);
};

const editFood = (food_id, edits) => {
    return db('foods AS f')
        .update(edits, ['*'])
        .where({ food_id });
};

const deleteFood = async (food_id) => {
    const deleted = await getFoodById(food_id);
    await db('foods')
        .del()
        .where({ food_id });
    return deleted;
};

module.exports = {
    getFoods,
    getFoodBy,
    getFoodById,
    createFood,
    editFood,
    deleteFood
};
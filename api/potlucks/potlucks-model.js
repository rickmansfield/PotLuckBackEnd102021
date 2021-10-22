const db = require('../data/db-config');

async function getPotlucks() {
    return db('potlucks')
        .orderBy('potluck_id');
}

function getPotluckBy(filter) {
    return db('potlucks')
        .where(filter);
}

async function getPotlucksById(potluck_id) {
    let potluck = await db('potlucks AS p')
        .join(
            'users AS u',
            'u.user_id',
            'p.organizer',
        )
        .where('p.potluck_id', potluck_id)
        .first();

    return {
        potluck_id: potluck.potluck_id,
        potluck_name: potluck.potluck_name,
        details: {
            organizer: potluck.organizer,
            potluck_description: potluck.potluck_description,
            potluck_date: potluck.potluck_date,
            potluck_time: potluck.potluck_time,
            potluck_location: potluck.potluck_location,
        },
    };
}

async function getPotluckUsers(potluck_id) {
    let potluck = await db('potlucks AS p')
        .join(
            'potluck_users AS pu',
            'pu.potluck_id',
            'p.potluck_id'
        )
        .join(
            'users AS u',
            'u.user_id',
            'pu.user_id'
        )
        .where('p.potluck_id', potluck_id);

    return {
        potluck_id: potluck[0].potluck_id,
        potluck_name: potluck[0].potluck_name,
        details: {
            organizer: potluck[0].organizer,
            potluck_description: potluck[0].potluck_description,
            potluck_date: potluck[0].potluck_date,
            potluck_time: potluck[0].potluck_time,
            potluck_location: potluck[0].potluck_location
        },
        users: potluck.map(user => {
            return ({
                user_id: user.user_id,
                username: user.username,
                attending: user.attending ? 'attending' : 'not attending'
            });
        })
    };
}

async function addUserToPotluck(potluck_id, data) {
    await db('potluck_users')
        .insert(data)
        .where({ potluck_id });

    return getPotluckUsers(potluck_id);
}

async function getPotluckFoods(potluck_id) {
    let potluck = await db('potluck_foods AS pf')
        .join(
            'foods AS f',
            'f.food_id',
            'pf.food_id'
        )
        .where('pf.potluck_id', potluck_id);

    return {
        potluck_id: potluck[0].potluck_id,
        foods: potluck.map(food => {
            return ({
                food_id: food.food_id,
                food_name: food.food_name,
                food_description: food.food_description,
                potluck_food_id: food.potluck_food_id
            });
        })
    };
}

async function addFoodToPotluck(potluck_id, data) {
    const newFood = await db('potluck_foods AS pf')
        .insert(data, ["*"])
        .where('pf.potluck_id', potluck_id);
    return getPotluckFoods(newFood[0].potluck_id);
}

async function removeFoodFromPotluck(potluck_food_id) {
    await db('potluck_foods AS pf')
        .del()
        .where({ potluck_food_id });

    return 'successfully removed item';
}


async function createPotluck(newPotluck) {
    const potluck = await db('potlucks')
        .insert(newPotluck, ['*']);
    const id = potluck[0].potluck_id;
    return getPotlucksById(id);
}

function editPotluck(potluck_id, potluckInfo) {
    return db('potlucks')
        .update(potluckInfo)
        .where({ potluck_id })
        .then(() => {
            return getPotlucksById(potluck_id);
        });
}

async function deletePotluck(potluck_id) {
    const deletedPotluck = await getPotlucksById(potluck_id);
    await db('potlucks')
        .where('potluck_id', potluck_id)
        .del();
    return deletedPotluck;
}

module.exports = {
    getPotlucks,
    getPotluckBy,
    getPotlucksById,
    getPotluckUsers,
    getPotluckFoods,
    addUserToPotluck,
    addFoodToPotluck,
    removeFoodFromPotluck,
    createPotluck,
    editPotluck,
    deletePotluck
};
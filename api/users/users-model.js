const db = require('../data/db-config');

async function add(user) {
    const newUser = await db('users AS u')
        .insert(user, ["user_id", "username"]);

    return newUser;
}

function find() {
    return db('users AS u')
        .select('user_id', 'username')
        .orderBy('user_id');
}

function findBy(filter) {
    return db('users AS u')
        .select('user_id', 'username', 'password')
        .where(filter)
        .first();
}

function findById(user_id) {
    return db('users AS u')
        .select('user_id', 'username')
        .where({ user_id })
        .first();
}

async function getUserPotlucks(user_id) {
    const users = await find();
    const user = await findById(user_id);
    const potlucks = await db('potlucks AS p')
        .join(
            'potluck_users AS pu',
            'pu.potluck_id',
            'p.potluck_id'
        )
        .where('pu.user_id', user_id)
        .orderBy('p.potluck_date');

    let userPotlucks = potlucks.map(potluck => {
        //orgainzer logic would need to change if you change if you are able to delete a user
        return ({
            attending: potluck.attending ? 'attending' : 'not attending',
            potluck_id: potluck.potluck_id,
            potluck_name: potluck.potluck_name,
            organizer: users[potluck.organizer].username,
            potluck_description: potluck.potluck_description,
            potluck_date: potluck.potluck_date,
            potluck_time: potluck.potluck_time,
            potluck_location: potluck.potluck_location
        });
    });
    return {
        user_id: user_id,
        username: user.username,
        potlucks: userPotlucks
    };
}

async function getOrganizerPotlucks(organizer) {
    const potlucks = await db('potlucks AS p')
        .join(
            'users AS u',
            'u.user_id',
            'p.organizer'
        )
        .where('p.organizer', organizer)
        .orderBy('p.potluck_date');

    return potlucks.map(potluck => {
        return ({
            potluck_id: potluck.potluck_id,
            potluck_name: potluck.potluck_name,
            organizer: potluck.organizer,
            details: {
                potluck_description: potluck.potluck_description,
                potluck_date: potluck.potluck_date,
                potluck_time: potluck.potluck_time,
                potluck_location: potluck.potluck_location,
            }
        });
    });
}

async function editUser(user_id, newData) {
    return db('users')
        .update(newData, ['*'])
        .where({ user_id });
}

async function deleteUser(user_id) {
    const deleted = await findById({ user_id });
    db('users')
        .where({ user_id })
        .del();
    return deleted;
}




module.exports = {
    add,
    find,
    findBy,
    findById,
    getUserPotlucks,
    getOrganizerPotlucks,
    editUser,
    deleteUser
};
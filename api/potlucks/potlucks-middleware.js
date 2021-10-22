const Potlucks = require('./potlucks-model');

const validatePotluckBody = (req, res, next) => {
    const {
        potluck_name,
        potluck_date,
        potluck_time,
        potluck_location
    } = req.body;
    if (
        !potluck_name || potluck_name.trim() === ''  ||
        !potluck_location || potluck_location.trim() === '' || 
        !potluck_date || 
        !potluck_time 
    ) {
        next({
            status: 400,
            message: 'Potluck details required, please complete!'
        });
    } else {
        req.potluck = {
            ...req.body,
            potluck_name: potluck_name.trim(),
            potluck_date,
            potluck_time,
            potluck_location: potluck_location.trim(),
            potluck_description: req.body.potluck_description.trim()
        };
        next();
    }
};

const checkPotluckNameUnique = async (req, res, next) => {
    const { potluck_name } = req.potluck;
    const [ potluck ] = await Potlucks.getPotluckBy({ potluck_name });
    if (potluck) {
        next({
            status: 400,
            message: 'Potluck name is already taken. Please pick another'
        });
    } else {
        next();
    }
};

module.exports = {
    checkPotluckNameUnique,
    validatePotluckBody
};
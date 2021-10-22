const router = require("express").Router();
const { restricted } = require("../auth/auth-middleware");
const Potlucks = require("./potlucks-model");

const {
    checkPotluckNameUnique,
    validatePotluckBody
} = require('./potlucks-middleware');

//All Potlucks
router.get('/', restricted, (req, res, next) => {
    Potlucks.getPotlucks()
    .then(potlucks => {
        res.status(200).json(potlucks);
    })
    .catch(next);
});
//Potlucks by id
router.get('/:id', restricted, (req, res, next) => {
    Potlucks.getPotlucksById(req.params.id)
    .then(potluck => {
        console.log("potlucks-router.js ln:22 potluck", potluck);
        res.status(200).json(potluck);
    })
    .catch(next);
});
//Potluck Users
router.get('/:id/users', restricted, (req, res, next) => {
    Potlucks.getPotluckUsers(req.params.id)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(next);
});
//Potluck foods
router.get('/:id/foods', restricted, (req, res, next) => {
    Potlucks.getPotluckFoods(req.params.id) 
    .then(foods => {
        res.status(200).json(foods);
    })
    .catch(next);
});
//Add User to Potluck
router.post('/:id/users', restricted, (req, res, next) => {
    Potlucks.addUserToPotluck(req.params.id, req.body)
    .then(users => {
        res.status(201).json(users);
    })
    .catch(next);
});
//add Food to Potluck
router.post('/:id/foods', restricted, (req, res, next) => {
    Potlucks.addFoodToPotluck(req.params.id, req.body)
    .then(foods => {
        res.status(201).json(foods);
    })
    .catch(next);
});
//Delete food from Potlluck
router.delete('/:id/foods', restricted, (req, res, next) => {
    Potlucks.removeFoodFromPotluck(req.params.id, req.params.food_id)
    .then(newList => {
        res.status(200).json(newList);
    })
    .catch(next);
});

//create Potluck
router.post('/', restricted, validatePotluckBody, checkPotluckNameUnique,
(req, res, next) => {
    Potlucks.createPotluck(req.potluck)
    .then(newPotluck => {
        res.status(201).json(newPotluck);
    })
    .catch(next);
});
//edit potluck
router.put('/:id', restricted, validatePotluckBody, (req, res, next) => {
    Potlucks.editPotluck(req.params.id, req.potluck)
    .then(updated => {
        res.status(200).json(updated);
    })
    .catch(next);
});
//delete Potluck
router.delete('/:id', restricted, (req, res, next) => {
    Potlucks.deletePotluck(req.params.id)
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(next);
});

module.exports = router;







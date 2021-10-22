const router = require('express').Router();
const Foods = require('./foods-model');
const {
    validateFoodBody,
    checkFoodIsUnique
} = require('./foods-middleware');
const { restricted } = require('../auth/auth-middleware');

router.get("/", restricted, (req, res, next) => {
    Foods.getFoods()
        .then(foods => {
            res.status(200).json(foods);
        })
        .catch(next);
});

router.get("/:id", restricted, (req, res, next) => {
    Foods.getFoodById(req.params.id)
        .then(food => {
            res.status(200).json(food);
        })
        .catch(next);
});

router.post("/", restricted, validateFoodBody, checkFoodIsUnique, (req, res, next) => {
    Foods.createFood(req.food)
        .then(newFood => {
            res.status(201).json(newFood[0]);
        })
        .catch(next);
});

router.put("/:id", restricted, validateFoodBody, checkFoodIsUnique, (req, res, next) => {
    Foods.editFood(req.params.id, req.food)
        .then(edited => {
            res.status(200).json(edited[0]);
        })
        .catch(next);
});

router.delete("/:id", restricted, (req, res, next) => {
    Foods.deleteFood(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(next);
});

module.exports = router;
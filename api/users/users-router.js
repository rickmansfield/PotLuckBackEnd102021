const router = require("express").Router();
const Users = require("./users-model.js");
const { restricted } = require("../auth/auth-middleware.js");

router.get("/", restricted, (req, res, next) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get("/:user_id", restricted, (req, res, next) => {
    Users.findById(req.params.user_id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});

router.get("/:user_id/potlucks", restricted, (req, res, next) => {
    Users.getUserPotlucks(req.params.user_id)
        .then(potlucks => {
            res.status(200).json(potlucks);
        })
        .catch(next);
});

router.get("/:organizer_id/organizer_potlucks", restricted, (req, res, next) => {
    Users.getOrganizerPotlucks(req.params.organizer_id)
        .then(potlucks => {
            console.log("POTLUCKS", potlucks);
            res.status(200).json(potlucks);
        })
        .catch(next);
});

router.put("/:user_id", restricted, (req, res, next) => {
    Users.editUser(req.params.user_id, req.body)
        .then(edited => {
            res.status(200).json(edited);
        })
        .catch(next);
});

module.exports = router;
const db = require("../models/book.js");

module.exports = {
    findAll: (req, res) => {
        db.find(req.query).sort({ date: -1 })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    },
    create: (req, res) => {
        db.create(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    },
    remove: (req, res) => {
        db.findById({ _id: req.params.id })
        .then(data => data.remove())
        .then(() => res.status(200).json("Success"))
        .catch(err => res.status(400).json(err));
    }
};
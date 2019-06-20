const db = require("../models/book.js");

module.exports = {
    findAll: function (req, res) {
        console.log("Find ALL");
        db.find(req.query).sort({ date: -1 })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    },
    create: function (req, res) {
        console.log("DB CREATE");
        db.create(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    },
    remove: function (req, res) {
        console.log("DB DELETE");
        db.findById({ _id: req.params.id })
        .then(data => data.remove())
        .then(dbRes => res.status(200).json(dbRes))
        .catch(err => res.status(400).json(err));
    }
};
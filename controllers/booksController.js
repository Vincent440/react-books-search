const db = require('../models/book.js')

module.exports = {
  findAll: (req, res) => {
    db.find(req.query).sort({ date: -1 })
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error))
  },
  create: (req, res) => {
    db.create(req.body)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error))
  },
  remove: (req, res) => {
    db.findById({ _id: req.params.id })
      .then(data => data.remove())
      .then(() => res.status(200).json('Success'))
      .catch(error => res.status(400).json(error))
  }
}

// Modela are typically defined using a library called Mongoose when working with MongoDB. Mongoose is an Object Data Modeling (ODM) library that provides a way to define data schemas(structure), models, and interact with MongoDB from your Node.js application.

const mongoose = require('mongoose')

// define Schema for a Note(since its a note app) model
const noteSchema = new mongoose.Schema({
  title:String,
  body:String,
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note

if(process.env.NODE_ENV != "production"){
    require('dotenv').config
}
require('dotenv').config()
const express = require('express')
const connectToDb = require('./config/connectToDb')
const Note = require('./models/note')
const { fetchNotes, fetchNote, createNote, updateNote, deleteNote } = require('./controllers/notesController')
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())

// connecting to mongoDB
connectToDb()

// Getting All Notes
app.get('/notes', fetchNotes)

// ADDING NOTES
app.post('/notes',createNote)

// Getting note with ID
app.get('/notes/:id', fetchNote)

// FIND and UPDATE
app.put('/notes/:id', updateNote)

// FIND and DELETE
app.delete('/notes/:id', deleteNote)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
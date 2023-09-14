
if(process.env.NODE_ENV != "production"){
    require('dotenv').config
}
require('dotenv').config()
const express = require('express')
const connectToDb = require('./config/connectToDb')
const Note = require('./models/note')
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())

// connecting to mongoDB
connectToDb()

// Getting All Notes
app.get('/notes', async(req, res) => {
  // Find The note 
  const notes = await Note.find({})
  // Respond with them
  res.json({notes: notes})
})

// ADDING NOTES
app.post('/notes',async (req,res)=>{
    //Get the sent in data off request body
    const title = req.body.title
    const body = req.body.body

    //Create a note with it
    const note =  await Note.create({
        title: title,
        body: body
    })
    // respond with new note
    res.json({note:note})
})

// Getting note with ID
app.get('/notes/:id', async (req, res)=>{
    // Get note with ID
    const noteId =  req.params.id
    const note = await Note.findById(noteId)
    res.json({note:note})

})

// FIND and UPDATE
app.put('/notes/:id', async (req, res)=>{
    //  Get the data to update with
    const title = req.body.title
    const body = req.body.body
    // Get note with ID
    const noteId =  req.params.id
    const note = await Note.findByIdAndUpdate(noteId,{title:title,body:body},{ new: true })
    
    // Respond with it
    res.json({note:note})

})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
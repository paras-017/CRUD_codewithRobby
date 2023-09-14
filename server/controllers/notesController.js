const Note = require("../models/note")

const fetchNotes = async(req, res) => {
    // Find The note 
    const notes = await Note.find({})
    // Respond with them
    res.json({notes})
  }
const fetchNote = async (req, res)=>{
    // Get note with ID
    const noteId =  req.params.id
    const note = await Note.findById(noteId)
    res.json({note})

  }
const createNote = async (req,res)=>{
    //Get the sent in data off request body
    const title = req.body.title
    const body = req.body.body

    //Create a note with it
    const note =  await Note.create({title,body})
    // respond with new note
    res.json({note})
  }
const updateNote = async (req, res)=>{
    //  Get the data to update with
    const {title,body} = req.body
    // Get note with ID
    const noteId =  req.params.id
    const note = await Note.findByIdAndUpdate(noteId,{title,body},{ new: true })
    
    // Respond with it
    res.json({note})

  }
const deleteNote = async (req,res)=>{
    // Get the note 
    const noteId = req.params.id
    const note = await Note.findByIdAndDelete(noteId)
    res.json({note})
  }

module.exports = {fetchNotes,fetchNote,createNote,updateNote,deleteNote}
import { useEffect, useState } from "react"
import axios from 'axios';

function App() {
  // State
  const [notes, setNotes] = useState(null)
  const [createForm, setCreateForm] = useState({title:'',body:''})
  const [updateForm, setUpdateForm] = useState({_id:null,title:'',body:''})


  // Functions
  const  fetchNotes = async ()=>{
    //fetch notes
   const res =  await axios.get('http://localhost:3000/notes')
   setNotes(res.data.notes)
    // display on UI
  }
  const updateCreateFormField = (e)=>{
    const {name,value} = e.target
    setCreateForm({
      ...createForm,
      [name]:value,
    })
  }
  const createNote = async(e)=>{
    e.preventDefault()
    // create a note
    const res = await axios.post('http://localhost:3000/notes',createForm)
    // updateState
    setNotes([...notes,res.data.note ])
    // clear state of form field
    createForm({title:'',body:''})
  }
  const deleteNote = async(_id)=>{
  // deleteNote
  const res = await axios.delete(`http://localhost:3000/notes/${_id}`)

  // update State
  const newNotes = [...notes].filter(note=>{
    return note._id != _id
  })
  setNotes(newNotes)
  }
  const handleUpdateFieldChange = (e)=>{
    const {name,value} = e.target
    setUpdateForm({
      ...updateForm,
      [name]:value,
    })
  }
  const toggleUpdate = async(note)=>{
  //  Get the current Note value
  setUpdateForm({title:note.title, body:note.body, _id:note._id})
  }
  const updateNote = async(e)=>{
    e.preventDefault()
    const {title,body} = updateForm
    // send the update request
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`,{title,body})
    // update the state
    const newNotes = [...notes]
    const noteIndex = notes.findIndex(note=>{
      return note._id === updateForm._id
    })
    newNotes[noteIndex] = res.data.note
    setNotes(newNotes)


    //clear  update form state
    setUpdateForm({_id:null,title:'',body:''})
  }

  // useEffect
  useEffect(() => {
    fetchNotes()
  }, [])
  
  return (
    <>
      <h1>Notes:</h1>
      {/* displaying notes */}
      <div>
      {notes && notes.map(note=>{
        return (
          <div key={note._id}>
            <h1>Title:{note.title}</h1>
            <h1>Description:{note.body}</h1>
            <button onClick={()=>deleteNote(note._id)}>Delete</button>
            <button onClick={()=>toggleUpdate(note)}>Edit</button>
          </div>
        )
      })}
      </div>
        
      {/* Update a note form */}
     {updateForm._id &&
      <div>
      <h2>Update a form</h2>
      <form onSubmit={updateNote}>
        <input onChange={handleUpdateFieldChange} type="text" name="title" value={updateForm.title}/>
        <textarea onChange={handleUpdateFieldChange} type="text" name="body" value={updateForm.body}/>
        <button type="submit">Update Note</button>
      </form>
    </div>}

      {/* Create a note form */}
      {!updateForm._id && <div>
        <h2>Create a form</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} type="text" name="title" value={createForm.title}/>
          <textarea onChange={updateCreateFormField} type="text" name="body" value={createForm.body}/>
          <button type="submit">Submit</button>
        </form>
      </div>}
    </>
  )
}

export default App

import { useEffect, useState } from "react"
import axios from 'axios';

function App() {
  // State
  const [notes, setNotes] = useState(null)
  const [createForm, setCreateForm] = useState({
    title:'',body:''
  })


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
          </div>
        )
      })}
      </div>
       
       

      {/* Create a note form */}
      <div>
        <h2>Create a form</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} type="text" name="title" value={createForm.title}/>
          <textarea onChange={updateCreateFormField} type="text" name="body" value={createForm.body}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App

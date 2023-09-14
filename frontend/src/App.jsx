import { useEffect, useState } from "react"
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState(null)

  const  fetchNotes = async ()=>{
    //fetch notes
   const res =  await axios.get('http://localhost:3000/notes')
   setNotes(res.data.notes)
    // display on UI
  }
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
          </div>
        )
      })}
      </div>
      
      {/* Create a note form */}
    </>
  )
}

export default App

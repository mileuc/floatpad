import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  //4. keep track of the notes as an array of note objects 
  const [notes, setNotes] = useState([]);

  //5. add the new note to the notes array
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  //10. Upload the existing notes from the database before the page renders
  useEffect(() => {
    axios.get("http://localhost:5000/notes/")
    .then(res => {
      setNotes(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  });

  //8. use the filter function to rid of the note with the id we want to delete
  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  //6. use map function to map the title and text from each note in the notes array
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index} 
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content} 
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
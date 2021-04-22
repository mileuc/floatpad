import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";

function CreateArea(props) {
  //9. state of whether our CreateArea is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  //1. keep track of the note as an object with title and text as it's property
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //2. update either the title or the text depending on which input triggered the event
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  //3. submitNote function to handle the click event for the button
  function submitNote(event){
    props.onAdd(note);
    axios.post("http://localhost:5000/notes/", note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  //10. expand create area when clicked
  function expand(){
    setIsExpanded(true);
  }

  //4. pass the note, whose state we've been tracking back to App and add it to the notes array.
  // setNote back to empty object after passing the note
  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />: null}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3: 1}
          value={note.content}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
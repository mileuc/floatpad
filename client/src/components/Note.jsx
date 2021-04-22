import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { Delete } from "@material-ui/icons";

function Note(props) {
  //7. add a delete notes function that each note component will have
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
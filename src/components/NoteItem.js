import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote} = context;

  const handleEditBtn = () => {
    // editNote(note._id,note.title,note.description,note.tag);
    updateNote(note);
  };
  const handleDeleteBtn = () => { 
    deleteNote(note._id);
  };
  return (
    <>
      <div className="col-md-3 ">
        <div className="card my-3">
          <div className="card-body ">
            <span className="position-absolute top-0 start-13 translate-middle badge rounded-pill bg-primary" style={{zIndex:"1",left:"12%"}}>
            {note.tag}
            </span>

            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div
              className="btn btn-primary btn-sm px-3 mx-2"
              onClick={handleEditBtn}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div
              className="btn btn-primary btn-sm px-3 mx-2"
              onClick={handleDeleteBtn}
            >
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;

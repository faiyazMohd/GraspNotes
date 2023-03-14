import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";

const Notes = () => {
  const context = useContext(NoteContext);
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const navigate = useNavigate();
  const { notes, fetchAllNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllNotes();
    }
    else{
      navigate("/login");
      //show alert to login
      showAlert(true, "Please Login to continue GraspNotes");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    
    refClose.current.click();
  };
  return (
    <>
      <div className="container">
        <AddNote />
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit Note
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="container">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      aria-describedby="emailHelp"
                      onChange={handleOnChange}
                      name="etitle"
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      onChange={handleOnChange}
                      name="edescription"
                      value={note.edescription}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      onChange={handleOnChange}
                      name="etag"
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={
                    note.etitle.length < 3 && note.edescription.length < 5
                  }
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container">
            {notes.length === 0 && "No Notes to Display"}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;

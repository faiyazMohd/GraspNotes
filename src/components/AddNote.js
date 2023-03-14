import React, { useContext ,useState} from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handleOnChange = (event) => {
    setNote({...note,[event.target.name]:event.target.value,})
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
  };
  return (
    <div className="container my-3">
      <form>
        <h3>Add a Note</h3>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            name="title"
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={handleOnChange}
            name="description"
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            onChange={handleOnChange}
            name="tag"
            value={note.tag}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title.length<3 || note.description.length<5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;

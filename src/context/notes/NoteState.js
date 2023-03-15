import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alerts/AlertContext";
const NoteSate = (props) => {
  const host = process.env.REACT_APP_BASE_URL;

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  //Function to Fetch All Notes
  const fetchAllNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json.notes);
    return json;
  };

  // Function to Add a Note
  const addNote = async (title, description, tag) => {
    tag = tag===""?tag="general":tag;
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    showAlert(json.success, json.msg);

    fetchAllNotes();
    return json;
  };

  // Function to Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    showAlert(json.success, json.msg);
    fetchAllNotes();
    return json;
  };

  // Function to Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    showAlert(json.success, json.msg);
    fetchAllNotes();
    return json;
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteSate;

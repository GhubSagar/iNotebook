import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'https://09bb-103-58-155-153.ngrok-free.app';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token') 
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      
      },
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes));

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  //Export a Note
  const exportNote = async (id,title) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/exportnote/${id}`, {
        method: "GET", // Assuming this is a GET request to fetch the PDF
        headers: {
          "Content-Type": "application/pdf",
          "auth-token":
          localStorage.getItem('token')        
        },
      });

      if (response.ok) {
        // Convert response to blob for PDF
        const blob = await response.blob();
        // Create a download link for the PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `note_${title}.pdf`; // Setting a default filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {console.error("Failed to export note")}
    } catch (error) {console.error("An error occurred while exporting the note:", error)}
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote,exportNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;

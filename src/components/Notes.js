import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'
import ExpenseCalculator from "./ExpenseCalculator";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{  navigate("/login"); }
  // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{ 
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
      props.showAlert("Updated successfully","success")
    }

    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }

        // State to manage the toggle switch for enabling/disabling expression calculation
      const [isCalculationEnabled, setIsCalculationEnabled] = useState(false);
      const handleToggleChange = () => {
        setIsCalculationEnabled(!isCalculationEnabled);
      };
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal"
        data-bs-target="#exampleModalLong" >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" aria-labelledby="exampleModalLongTitle"
        aria-hidden="true" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle"> Edit Note:- </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <form className="my-1">
                <div className="mb-3">
                  {/* Toggle switch for enabling/disabling expense calculation */}
          <div className="form-check form-switch ">
            <input className="form-check-input" type="checkbox" id="calculationToggle"
              checked={isCalculationEnabled} onChange={handleToggleChange} />
            <label className="form-check-label" htmlFor="calculationToggle">
              Enable Calculation
            </label>
          </div>
                  <label htmlFor="title" className="form-label"> Title </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}
                    aria-describedby="emailHelp" onChange={onChange} minLength={5} required 
                  />
                </div>

                {/* //FOR NON- MULTILINE TEXT */}
                {/* <div className="mb-3"> 
                <label htmlFor="description" className="form-label">
                Description </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div> */}

                  {/* //FOR MULTILINE TEXT */}
                <div className="mb-3">  
                    <label htmlFor="description" className="form-label">
                      Description (For Expenditure Calculation put '= :' signs before the amount)
                    </label>
                    <textarea className="form-control" id="edescription" name="edescription"
                      value={note.edescription} onChange={onChange}
                      rows="8" // Set the default height to 8 rows
                      minLength={5} required
                    />
                  </div> 
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label"> Tag </label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
               {/* Conditionally render ExpenseCalculator based on the toggle switch */}
                {isCalculationEnabled && <ExpenseCalculator description={note.edescription} />}
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick} type="button" className="btn btn-primary" 
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-2"> {notes.length === 0 && "No notes to display"} </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
}
export default Notes

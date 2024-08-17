import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import ExpenseCalculator from "./ExpenseCalculator";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, exportNote } = context;
  const { note, updateNote } = props;

  // State to control the modal and store the calculated expense
  const [showModal, setShowModal] = useState(false);

  // Toggle function for modal
  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  // Handle update and hide modal
  const handleUpdateNote = () => {
    updateNote(note);
    setShowModal(false); // Hide the modal after updating
  };

  // State to manage the toggle switch for enabling/disabling expression calculation
  const [isCalculationEnabled, setIsCalculationEnabled] = useState(false);
  const handleToggleChange = () => {
    setIsCalculationEnabled(!isCalculationEnabled);
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}>
            </i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
            <i className="fa-light fa-file-pdf mx-2" onClick={() => exportNote(note._id, note.title)}></i>
          </div>
          <p style={{
              display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis",
              whiteSpace: "pre-line", WebkitLineClamp: 4, // Limit to 4 lines
              maxHeight: "6em", // Approx height for 4 lines of text
              lineHeight: "1.5em", // Adjust line height to fit text in the container
              transition: "max-height 0.3s ease", // Smooth transition
            }}> {note.description}
          </p>
          <button type="button" className="btn btn-info" onClick={handleToggleModal}>Read more</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}
          aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> {note.title} </h5>
                <i className="far fa-trash-alt mx-2"
                  onClick={() => {
                    deleteNote(note._id);
                    props.showAlert("Deleted successfully", "success");
                  }}>
                </i>
                <i className="fa-regular fa-pen-to-square mx-2"
                  onClick={() => {
                    handleUpdateNote();
                  }} >
                </i>
                <i className="fa-light fa-file-pdf mx-2"
                  onClick={() => exportNote(note._id, note.title)}
                ></i>

                 

                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleToggleModal}
                  aria-label="Close" > {" "}
                  <span aria-hidden="true">&times;</span>
                </button>
                
              </div>
               {/* Toggle switch for enabling/disabling expense calculation */}
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="calculationToggle"
              checked={isCalculationEnabled} onChange={handleToggleChange} />
            <label className="form-check-label" htmlFor="calculationToggle">
              Enable Calculation
            </label>
          </div>
              <div style={{ whiteSpace: "pre-line" }} className="modal-body" >
                {note.description}
              </div>
              <div className="modal-footer">
                {/* Conditionally render ExpenseCalculator based on the toggle switch */}
                {isCalculationEnabled && <ExpenseCalculator description={note.description} />}
                <button type="button" className="btn btn-secondary" onClick={handleToggleModal}
                  data-bs-dismiss="modal" >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Noteitem;

// import React, { useContext, useState } from "react";
// import noteContext from "../context/notes/noteContext";
// import ExpenseCalculator from "./ExpenseCalculator";

// const AddNote = (props) => {
//   const context = useContext(noteContext);
//   const { addNote } = context;

//   const [note, setNote] = useState({
//     title: "",
//     description: "",
//     tag: "",
//   });

//   const handleClick = (e) => {
//     e.preventDefault();
//     addNote(note.title, note.description, note.tag);
//     setNote({ title: "", description: "", tag: "" });
//     props.showAlert("Added successfully", "success");
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container my-3">
//       <h2>Add a Note</h2>
//       <form className="my-3">
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input type="text" className="form-control" id="title" name="title" value={note.title}
//             onChange={onChange} minLength={5} required />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Description (For Expenditure Calculation put '= - :' signs before the amount)
//           </label>
//           <textarea className="form-control" id="description" name="description" value={note.description}
//             placeholder="To use Expenditure Calculation put '= - :' signs before the amount"
//             onChange={onChange} rows="8" minLength={5} required />
//         </div>

//         {/* Display Total Expense */}
//         <ExpenseCalculator description={note.description} />
//         <div className="mb-3">
//           <label htmlFor="tag" className="form-label"> Tag </label>
//           <input type="text"  className="form-control" id="tag" name="tag" value={note.tag}
//             onChange={onChange} minLength={5} required />
//         </div>

//         <button
//           disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary"
//           onClick={handleClick} > Add Note </button>
//       </form>
//     </div>
//   );
// };
// export default AddNote;

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import ExpenseCalculator from "./ExpenseCalculator";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // State to manage the toggle switch for enabling/disabling expression calculation
  const [isCalculationEnabled, setIsCalculationEnabled] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleToggleChange = () => {
    setIsCalculationEnabled(!isCalculationEnabled);
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title}
            onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description (For Expenditure Calculation put '= :' signs before the amount)
          </label>
          
          <textarea className="form-control" id="description" name="description" value={note.description}
            placeholder="To use Expenditure Calculation put '= :' signs before the amount"
            onChange={onChange} rows="8" minLength={5} required />

            {/* Toggle switch for enabling/disabling expense calculation */}
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="calculationToggle"
              checked={isCalculationEnabled} onChange={handleToggleChange} />
            <label className="form-check-label" htmlFor="calculationToggle">
              Enable Calculation
            </label>
          </div>
        </div>

        {/* Conditionally render ExpenseCalculator based on the toggle switch */}
        {isCalculationEnabled && <ExpenseCalculator description={note.description} />}

        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> Tag </label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag}
            onChange={onChange} minLength={5} required />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary"
          onClick={handleClick} > Add Note </button>
      </form>
    </div>
  );
};
export default AddNote;

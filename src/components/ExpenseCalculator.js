// import React from "react";

// const ExpenseCalculator = ({ description }) => {
//   // Function to extract and calculate total expense from the description text
//   const calculateTotalExpense = () => {
//     const expensePattern = /[-=:]\s*(\d+(\.\d{1,2})?)/g;
//     let total = 0;
//     let match;
//     while ((match = expensePattern.exec(description)) !== null) { total += parseFloat(match[1]); }
//     return total;
//   };

//   return (
//     <div className="mb-3">
//       <label className="form-label"> Total Expense Calculated: Rs. {calculateTotalExpense()} </label>
//     </div>
//   );
// };
// export default ExpenseCalculator;

// import React from "react";

// const ExpenseCalculator = ({ description }) => {
//   // Function to extract and calculate total expense from the description text
//   const calculateTotalExpense = () => {
//     if (!description || typeof description !== 'string') return 0;

//     // Regex to match arithmetic expressions (e.g., -450 + 450 - 785 + 100)
//     const expressionPattern = /[-=:\s]*([0-9+\-*/.\s]+)/g;
//     let total = 0;
//     let match;

//     // Loop through all matched expressions and evaluate them
//     while ((match = expressionPattern.exec(description)) !== null) {
//       try {
//         // Remove spaces from the expression before evaluation
//         const sanitizedExpression = match[1].replace(/\s+/g, "");
        
//         // Safely evaluate the arithmetic expression
//         const expressionResult = eval(sanitizedExpression);
//         total += expressionResult;
//       } catch (error) {
//         console.error("Invalid expression:", match[1], error);
//       }
//     }

//     // Return total expense with two decimal precision
//     return total.toFixed(2);
//   };

//   return (
//     <div className="mb-3">
//       <label className="form-label">
//         Total Expense Calculated: Rs. {calculateTotalExpense()}
//       </label>
//     </div>
//   );
// };

// export default ExpenseCalculator;
import React from "react";

const ExpenseCalculator = ({ description }) => {
  // Function to extract and calculate total expense from the description text
  const calculateTotalExpense = () => {
    if (!description || typeof description !== 'string') return 0;

    // Split the description by both colon (:) and equals sign (=)
    const parts = description.split(/[:=]/);
    let total = 0;

    // Loop through all parts after each delimiter
    for (let i = 1; i < parts.length; i++) {
      const expressionPart = parts[i].trim();

      // Regex to match valid arithmetic expressions
      const expressionPattern = /([+\-*/]?\d+(\.\d+)?)+/g;
      let match;

      // Loop through all matched expressions and evaluate them
      while ((match = expressionPattern.exec(expressionPart)) !== null) {
        try {
          const expression = match[0];  // The matched arithmetic expression

          // Evaluate the arithmetic expression using JavaScript's eval function
          const expressionResult = eval(expression);
          total += expressionResult;
        } catch (error) {
          console.error("Invalid expression:", match[0], error);
        }
      }
    }

    // Return total expense with two decimal precision
    return total.toFixed(2);
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        Total Expense Calculated: Rs. {calculateTotalExpense()}
      </label>
    </div>
  );
};

export default ExpenseCalculator;

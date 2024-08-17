import React from 'react'
const About = () => {
  return (
 <div className="container">
        <h2>About Us :</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse"  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                What is iNotebook??
            </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body" >
                <strong>Analyze Your text</strong> iNotebook, is a full-stack note-taking application that allows users to securely manage their notes, including additional features like calculating expenses. <br /><br />
<strong>Multiline Note Handling:</strong> Users can create and manage notes with multiline text, ensuring proper formatting and display, including automatic trimming for long notes and expanding to view the full content.
The expense calculations are handled on the client side, integrated into the note-taking feature, providing a seamless experience for users to manage their daily expenses. <br /><br />
<strong>User Security: </strong>The project implements a token-based security mechanism, using JWT for user authentication and authorization, securing API endpoints and user sessions.
The project is backed by a server that handles the creation, retrieval, and updating of notes and expense data, with API routes secured by token authentication.
      </div>
            </div>
        </div>
        </div>
    </div>
  )}
export default About

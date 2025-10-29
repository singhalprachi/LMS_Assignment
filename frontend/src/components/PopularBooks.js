import React from "react";
import "./PopularBooks.css";

function PopularBooks() {
  const handleBookClick = (title, imageUrl) => {
    if (!title) return alert("No title available for this book");

    // Open a new window for book details
    const newWindow = window.open("", "_blank");
    newWindow.document.write("<h2>Loading book details...</h2>");

    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`)
      .then((res) => res.json())
      .then((data) => {
        const book = data.docs[0];
        if (!book) {
          newWindow.document.body.innerHTML = "<h3>No book details found.</h3>";
          return;
        }

        const author = book.author_name ? book.author_name.join(", ") : "Unknown";
        const titleText = book.title || title;
        const edition = book.edition_count || "N/A";
        const year = book.first_publish_year || "N/A";

        // Book info content
        newWindow.document.body.innerHTML = `
          <div style="font-family: Arial; padding: 20px;">
            <h1>${titleText}</h1>
            <img src="${imageUrl}" alt="${titleText}" 
                 style="width: 200px; height: auto; border-radius: 8px; margin-bottom: 20px;" />
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Edition Count:</strong> ${edition}</p>
            <p><strong>First Published:</strong> ${year}</p>
            <button id="issueButton" 
              style="background: #007BFF; color: white; border: none; padding: 10px 20px; 
                     border-radius: 5px; cursor: pointer; margin-top: 15px;">
              ISSUE
            </button>

            <!-- Modal -->
            <div id="issueModal" 
                 style="display:none; position:fixed; top:0; left:0; width:100%; height:100%;
                        background-color:rgba(0,0,0,0.5); justify-content:center; align-items:center;">
              <div style="background:white; padding:25px; border-radius:10px; width:350px;">
                <h3>Issue Book</h3>
                <label>Name:</label><br/>
                <input type="text" id="userName" placeholder="Enter your name" 
                       style="width:100%; padding:6px; margin-bottom:10px;"/><br/>
                <label>Phone:</label><br/>
                <input type="text" id="userPhone" placeholder="Enter your phone number" 
                       style="width:100%; padding:6px; margin-bottom:10px;"/><br/>
                <label>Duration:</label><br/>
                <select id="issueDuration" style="width:100%; padding:6px; margin-bottom:10px;">
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                </select><br/>
                <label>
                  <input type="checkbox" id="termsCheckbox"/> I agree to the rules and regulations.
                </label><br/><br/>
                <button id="submitIssue" 
                        style="background:#28A745; color:white; border:none; padding:8px 15px; 
                               border-radius:5px; cursor:pointer;">
                  Submit
                </button>
                <button id="closeModal" 
                        style="background:#dc3545; color:white; border:none; padding:8px 15px; 
                               border-radius:5px; cursor:pointer; margin-left:10px;">
                  Close
                </button>
              </div>
            </div>
          </div>
        `;

        // Modal handling logic
        const issueButton = newWindow.document.getElementById("issueButton");
        const modal = newWindow.document.getElementById("issueModal");
        const closeModal = newWindow.document.getElementById("closeModal");
        const submitBtn = newWindow.document.getElementById("submitIssue");

        issueButton.onclick = () => (modal.style.display = "flex");
        closeModal.onclick = () => (modal.style.display = "none");
        submitBtn.onclick = () => {
          const name = newWindow.document.getElementById("userName").value;
          const phone = newWindow.document.getElementById("userPhone").value;
          const duration = newWindow.document.getElementById("issueDuration").value;
          const checked = newWindow.document.getElementById("termsCheckbox").checked;

          if (!name || !phone || !checked) {
            alert("Please fill all fields and agree to terms!");
            return;
          }

          alert(
            `Book Issued Successfully!\nName: ${name}\nPhone: ${phone}\nDuration: ${duration} days`
          );
          modal.style.display = "none";
        };
      })
      .catch((err) => {
        newWindow.document.body.innerHTML = `<h3>Error fetching book details: ${err.message}</h3>`;
      });
  };

  return (
    <div className="popularbooks-container">
      <h2 className="popularbooks-title">Popular Books</h2>
      <div className="popularbooks">
        <div className="popularbook-images">
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
            alt="Elon Musk"
            onClick={() =>
              handleBookClick(
                "Elon Musk",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
            alt="Idea Man"
            onClick={() =>
              handleBookClick(
                "Idea Man",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
            alt="Critical Thinking"
            onClick={() =>
              handleBookClick(
                "Critical Thinking",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
            alt="Elon Musk"
            onClick={() =>
              handleBookClick(
                "Elon Musk",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
            alt="Idea Man"
            onClick={() =>
              handleBookClick(
                "Idea Man",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
            alt="Critical Thinking"
            onClick={() =>
              handleBookClick(
                "Critical Thinking",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
            alt="Elon Musk"
            onClick={() =>
              handleBookClick(
                "Elon Musk",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
            alt="Idea Man"
            onClick={() =>
              handleBookClick(
                "Idea Man",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
              )
            }
          />
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
            alt="Critical Thinking"
            onClick={() =>
              handleBookClick(
                "Critical Thinking",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PopularBooks;

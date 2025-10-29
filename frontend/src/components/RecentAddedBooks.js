import React from 'react';
import './RecentAddedBooks.css';

function RecentAddedBooks() {
  const handleBookClick = async (title, coverUrl) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<h3>Loading book details for "${title}"...</h3>`);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
      const data = await response.json();

      let content = "";
      if (data.docs && data.docs.length > 0) {
        const book = data.docs[0];
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const bookTitle = book.title || 'Unknown Title';
        const editionCount = book.edition_count || 'N/A';
        const firstPublishYear = book.first_publish_year || 'N/A';

        content = `
          <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f5f5f5; color: #333;">
            <div style="display: flex; align-items: flex-start; gap: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 20px;">
              <img src="${coverUrl}" alt="${bookTitle}" style="width: 200px; height: 300px; border-radius: 10px; object-fit: cover;" />
              <div>
                <h1 style="margin: 0; font-size: 28px;">${bookTitle}</h1>
                <p style="font-size: 18px; color: #666;">by <strong>${author}</strong></p>
                <hr style="margin: 15px 0;">
                <p><strong>Edition Count:</strong> ${editionCount}</p>
                <p><strong>First Published Year:</strong> ${firstPublishYear}</p>
                <button id="issueBtn" style="margin-top:20px;padding:10px 20px;background:#007BFF;color:white;border:none;border-radius:5px;cursor:pointer;">ISSUE</button>
              </div>
            </div>
          </div>

          <div id="issueModal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);justify-content:center;align-items:center;">
            <div style="background:white;padding:25px;border-radius:10px;width:400px;">
              <h2>Issue Book</h2>
              <label>Name:</label><br/>
              <input id="userName" type="text" placeholder="Enter your name" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;"><br/>

              <label>Phone Number:</label><br/>
              <input id="phoneNumber" type="text" placeholder="Enter phone number" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;"><br/>

              <label>Duration:</label><br/>
              <select id="duration" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;">
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select><br/>

              <label><input type="checkbox" id="agreeBox"> I understand the rules and regulations.</label><br/><br/>

              <button id="submitBtn" style="padding:8px 16px;background:green;color:white;border:none;border-radius:5px;cursor:pointer;">Submit</button>
              <button id="closeBtn" style="padding:8px 16px;background:red;color:white;border:none;border-radius:5px;margin-left:10px;cursor:pointer;">Cancel</button>
            </div>
          </div>
        `;
      } else {
        content = `<p>No book details found for "${title}".</p>`;
      }

      newWindow.document.body.innerHTML = content;

      // Add interactivity for modal
      const script = newWindow.document.createElement("script");
      script.innerHTML = `
        const issueBtn = document.getElementById('issueBtn');
        const modal = document.getElementById('issueModal');
        const closeBtn = document.getElementById('closeBtn');
        const submitBtn = document.getElementById('submitBtn');

        issueBtn?.addEventListener('click', () => {
          modal.style.display = 'flex';
        });

        closeBtn?.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        submitBtn?.addEventListener('click', () => {
          const name = document.getElementById('userName').value;
          const phone = document.getElementById('phoneNumber').value;
          const duration = document.getElementById('duration').value;
          const agree = document.getElementById('agreeBox').checked;

          if (!name || !phone) {
            alert('Please enter all fields');
            return;
          }
          if (!agree) {
            alert('Please return the book before the specified time period');
            return;
          }

          alert('Book will be issued successfully by the librarian once approved !\\nName: ' + name + '\\nPhone: ' + phone + '\\nDuration: ' + duration + ' days');
          modal.style.display = 'none';
        });
      `;
      newWindow.document.body.appendChild(script);

    } catch (error) {
      newWindow.document.body.innerHTML = `<p style="color:red;">Error fetching book data. Please try again.</p>`;
    }
  };

  return (
    <div className='recentaddedbooks-container'>
      <h2 className='recentbooks-title'>Recent Uploads</h2>
      <div className='recentbooks'>
        <div className='images'>
          <img className='recent-book' src='https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640' alt='Wings of Fire' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg' alt='Rich Dad Poor Dad' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg' alt='The Lean Startup' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg' alt='Zero To One' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg' alt='The Subtle Art of Not Giving a Fuck' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg' alt='The Startup Way' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498813353l/34267304.jpg' alt='The Startup Way' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />

          <img className='recent-book' src='https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640' alt='Wings of Fire' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg' alt='Rich Dad Poor Dad' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg' alt='The Lean Startup' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg' alt='Zero To One' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg' alt='The Subtle Art of Not Giving a Fuck' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          
          <img className='recent-book' src='https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg' alt='The Startup Way' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
          <img className='recent-book' src='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498813353l/34267304.jpg' alt='The Startup Way' onClick={(e) => handleBookClick(e.target.alt, e.target.src)} />
         
        </div>
      </div>
    </div>
  );
}
export default RecentAddedBooks;

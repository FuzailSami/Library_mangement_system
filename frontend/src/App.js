import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');

  // Fetch books from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(res => res.text())
      .then(data => setBooks([data]));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newBook })
    })
      .then(res => res.text())
      .then(data => {
        setBooks([...books, data]);
        setNewBook('');
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Library Management System</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={newBook}
          onChange={e => setNewBook(e.target.value)}
          placeholder="Book Title"
          required
          style={{ padding: 8, width: '70%' }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10 }}>Add Book</button>
      </form>
      <h2>Books</h2>
      <ul>
        {books.map((book, idx) => (
          <li key={idx}>{book}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
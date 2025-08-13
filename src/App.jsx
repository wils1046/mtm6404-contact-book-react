import { useState, useEffect } from 'react';
import db from './utils/db.js';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

function App() {
  const [contactBook, setContactBook] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    const docSnapshot = await getDocs(collection(db, "contactbook"));
    const data = docSnapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data() 
    }));
    
    const sortedData = data.sort((a, b) => 
      a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
    );
    
    setContactBook(sortedData);
    setFilteredContacts(sortedData);
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredContacts(contactBook);
    } else {
      const filtered = contactBook.filter(contact =>
        contact.firstName.toLowerCase().includes(term.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Contact Book</h1>
        <p className="subtitle">Manage your contacts easily</p>
      </div>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search contacts by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <Link to="/add" className="btn btn-primary icon-plus">
          Add Contact
        </Link>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-message">
            {searchTerm ? 'No contacts found matching your search.' : 'No contacts available.'}
          </div>
        </div>
      ) : (
        <div className="contact-grid">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <Link to={`/contact/${contact.id}`} className="contact-link">
                <h3 className="contact-name">
                  {`${contact.firstName} ${contact.lastName}`}
                </h3>
                <p className="contact-email">{contact.emailAddress}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
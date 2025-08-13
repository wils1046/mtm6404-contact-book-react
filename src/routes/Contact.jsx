import { useState, useEffect } from 'react';
import db from '../utils/db.js';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

export const Contact = () => {
    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchContactById = async (contactId) => {
        try {
            const docRef = doc(db, "contactbook", contactId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                setContact({
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                });
            } else {
                alert("Contact does not exist in our database. Please provide a valid contact information.");
                navigate('/');
            }
        } catch (error) {
            console.error("Error fetching contact:", error);
            alert("Error fetching contact information.");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await deleteDoc(doc(db, "contactbook", id));
                navigate('/');
            } catch (error) {
                console.error("Error deleting contact:", error);
                alert("Error deleting contact.");
            }
        }
    }

    useEffect(() => {
        fetchContactById(id);
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <Link to="/" className="back-link icon-back">
                    Back to Contacts
                </Link>
            </div>

            <div className="contact-detail-card">
                <div className="contact-header">
                    <h1 className="contact-title">
                        {`${contact.firstName} ${contact.lastName}`}
                    </h1>
                    <div className="action-buttons">
                        <Link to={`/edit/${contact.id}`} className="btn btn-secondary icon-edit">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger icon-delete">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="contact-info">
                    <div className="info-group">
                        <div className="info-row">
                            <div className="info-item">
                                <label>Email Address</label>
                                <p>{contact.emailAddress}</p>
                            </div>
                            <div className="info-item">
                                <label>Phone Number</label>
                                <p>{contact.phoneNumber}</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <label>Street Address</label>
                            <p>{contact.street}</p>
                        </div>
                        
                        <div className="info-row">
                            <div className="info-item">
                                <label>City</label>
                                <p>{contact.city}</p>
                            </div>
                            <div className="info-item">
                                <label>Province/State</label>
                                <p>{contact.provinceState}</p>
                            </div>
                            <div className="info-item">
                                <label>Postal/Zip Code</label>
                                <p>{contact.postalZip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
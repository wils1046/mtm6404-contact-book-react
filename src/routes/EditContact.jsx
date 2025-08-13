import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import db from '../utils/db.js';
import '../App.css';

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        street: '',
        city: '',
        provinceState: '',
        postalZip: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchContact = async () => {
        try {
            const docRef = doc(db, "contactbook", id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                setFormData(docSnapshot.data());
            } else {
                alert("Contact does not exist.");
                navigate('/');
            }
        } catch (error) {
            alert("Error fetching contact information.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const docRef = doc(db, "contactbook", id);
            await updateDoc(docRef, formData);
            navigate(`/contact/${id}`);
        } catch (error) {
            alert("Error updating contact. Please try again.");
        }
    };

    useEffect(() => {
        fetchContact();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <Link to={`/contact/${id}`} className="back-link icon-back">
                    Back to Contact
                </Link>
            </div>
            
            <div className="form-container">
                <h1 className="form-title">Edit Contact</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Street Address</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Province/State</label>
                            <input
                                type="text"
                                name="provinceState"
                                value={formData.provinceState}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Postal/Zip Code</label>
                            <input
                                type="text"
                                name="postalZip"
                                value={formData.postalZip}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to={`/contact/${id}`} className="btn btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-success icon-save">
                            Update Contact
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContact;
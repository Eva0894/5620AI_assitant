import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 
import './volunteer.css'; 

const VolunteerSignup = () => {
    const [formData, setFormData] = useState({
        phone_number: '',
        email: '',
        areas: '',
        note: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { phone_number, email, areas, note } = formData;

        try {
            const { data, error } = await supabase
                .from('volunteer')
                .insert([{ phone_number, email, areas, note }]);

            if (error) {
                setMessage('Error occurred during registration: ' + error.message);
                console.error('Error inserting data:', error);
            } else {
                setMessage('Volunteer registered successfully!');
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Unexpected error occurred.');
        }
    };

    return (
      <div className='voldashboard'>
        <div className='container'>
              <h2 className='h2'>Volunteer Registration</h2>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="phone_number">Phone Number:</label>
                      <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="email">Email:</label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="areas">Expertise Area:</label>
                      <select
                          id="areas"
                          name="areas"
                          value={formData.areas}
                          onChange={handleChange}
                          required
                      >
                          <option value="">Select an area</option>
                          <option value="health">Health</option>
                          <option value="emotion">Emotion</option>
                          <option value="others">Others</option>
                      </select>
                  </div>
                  <div>
                      <label htmlFor="note">Note (Special Skills):</label>
                      <input
                          type="text"
                          id="note"
                          name="note"
                          value={formData.note}
                          onChange={handleChange}
                          placeholder="You can mention your special skills, e.g., First Aid knowledge"
                      />
                  </div>

                  <button type="submit">Register</button>
              </form>

              {message && <p>{message}</p>}
          </div>
        </div>
    );
};

export default VolunteerSignup;

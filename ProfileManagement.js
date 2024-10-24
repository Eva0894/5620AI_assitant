import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 
import './ProfileManagement.css'; 
import './elderboard.css';
import { useNavigate } from 'react-router-dom';

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const loggedInUserId = localStorage.getItem('loggedInUserId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!loggedInUserId) {
        console.log('No user ID found in localStorage');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, phone_number, role')
          .eq('id', loggedInUserId)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setPhoneNumber(data.phone_number);
        }
      } catch (err) {
        console.error('Something went wrong:', err);
      }
    };

    fetchUserData();
  }, [loggedInUserId]);

  const handleProfileUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ name, email, phone_number: phoneNumber })
        .eq('id', loggedInUserId);

      if (error) {
        setMessage('Error updating profile');
        console.error(error);
      } else {
        setMessage('Profile updated successfully');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('An error occurred');
    }
  };

  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ password })
        .eq('id', loggedInUserId);

      if (error) {
        setMessage('Error updating password');
        console.error(error);
      } else {
        setMessage('Password updated successfully');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setMessage('An error occurred');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-management">
      <h2>Profile Management</h2>
      <p>ID: {user.id}</p>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number: </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleProfileUpdate}>Update Profile</button>

      <h3>Change Password</h3>
      <div>
        <label>New Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password: </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordUpdate}>Update Password</button>
      {message && <p>{message}</p>}
      <button onClick={() => navigate(-1)}>Home</button>
    </div>
  );
};
export default ProfileManagement;

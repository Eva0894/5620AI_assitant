import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('elder'); 
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const intId = parseInt(id, 10); 
            if (isNaN(intId)) {
                setErrorMessage('Invalid ID');
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .insert([{ id: intId, password, name, email, role }]);

            if (error) {
                setErrorMessage('Error during sign up: ' + error.message);
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An unexpected error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h2 style={styles.title}>Sign Up</h2>
                <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <label>Select your role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
                    <option value="elder">Elder</option>
                    <option value="child">Child</option>
                </select>
                <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '300px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        marginTop: '20px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '300px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default SignUp;

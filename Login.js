import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('elder');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const intId = parseInt(id, 10); 
            if (isNaN(intId)) {
                setErrorMessage('Invalid ID');
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .select('id, password, role')
                .eq('id', intId)
                .eq('password', password);

            if (error || data.length === 0) {
                setErrorMessage('Invalid ID or Password');
                return;
            } 

            const user = data[0];
            localStorage.setItem('loggedInUserId', user.id);
            
            if (user.role === 'elder') {
                navigate(`/elder-dashboard/${user.id}`); 
            } else if (user.role === 'child') {
                navigate(`/child-dashboard/${user.id}`); 
            } else {
                setErrorMessage('Invalid Role');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Something went wrong');
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url(https://ofhsoupkitchen.org/wp-content/uploads/2022/04/reality-meaningful-quotes-on-life-2-1-1024x683.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const title = {
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
    };

    const loginStyle = {
        border: '1px solid #ccc',
        borderRadius: '50px',
        backgroundColor: 'rgba(248, 229, 140, 0.5)',
        padding: '40px',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',        
        flexDirection: 'column', 
        alignItems: 'center',  
        marginTop: '50px',
        height: '770px'
    } 

    const inputStyle = {
        width: '100%',  
        maxWidth: '300px', 
        padding: '12px',  
        borderRadius: '50px',
        border: '1px solid #ccc', 
        marginBottom: '20px',  
        marginTop: '10px',
        textAlign: 'left'  
    };

    const buttonStyle = {
        padding: '12px 24px',  
        backgroundColor: 'green',  
        color: 'white',
        border: 'none',
        borderRadius: '8px', 
        cursor: 'pointer',
        fontSize: '18px', 
        width: '200px',  
        textAlign: 'center', 
        marginTop: '50px',
        display: 'block',
        marginLeft: '100px'
    }

    const volunteerButton = {
        backgroundColor: 'transparent',
        color: 'gray',
        textDecoration: 'underline',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '10px 20px',
        // marginLeft: '100px',
        marginTop: '50px',
        alignItems: 'center',
    }
    
    return (
        <div style={backgroundStyle}>
            <div className="login" style={loginStyle}> 
                <div className="login-container">
                    <h2 style={title}>Login to CareMate</h2>
                    <input style={inputStyle}
                        type="text"
                        placeholder="Please Enter Your ID Here"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input style={inputStyle}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} style={buttonStyle}>Log In</button>
                    <button onClick={() => navigate('/signup')} style={buttonStyle}>Sign Up</button>
                    <button onClick={() => navigate('/volunteer-signup')} style={volunteerButton}>Become Our Volunteer !</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;

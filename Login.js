import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import loginImage from './Users/xinchen/care-mate/src/components/login.jpg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('elder');
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (role === 'elder') navigate('/elder');
      if (role === 'child') navigate('/child');
    };

    const backgroundStyle = {
        // backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
        height: '100vh',
        width: '100%'
    };

    const loginStyle = {
        border: '1px solid #ccc',
        borderRadius: '50px',
        backgroundColor: 'rgba(173, 216, 230, 0.5)',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',        
        flexDirection: 'column', 
        alignItems: 'center',  
        marginTop: '100px'
    } 
    
    const radioStyle = {
        border: '1px solid rgba(255, 255, 255, 0)',
        padding: '10px',
        maxWidth: '50px',
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '15px'

    };
  
    return (
    <div style={backgroundStyle}>
        <div className="login" style={loginStyle}>
            <h2>Login to CareMate</h2>
            <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
            <div style={radioStyle}>
            <input type="radio" value="elder" checked={role === 'elder'} onChange={() => setRole('elder')} /> Elder
            <input type="radio" value="child" checked={role === 'child'} onChange={() => setRole('child')} /> Child
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
    );
  }
  
  export default Login;
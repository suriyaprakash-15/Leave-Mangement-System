import React from 'react';

const Login = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#fff' 
    }}>
      
      <img 
        // src="/Images/Login1.jpg" 
        // alt="Calendar Icon" 
        img src="/Images/Logo1.jpg" alt="Login Background"
        style={{ width: '30%', height: '100', margintop: '2%' }} 
      />
      
      <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '30px 0 20px' }}>Manureva</h1>
      <p style={{ color: '#6b7280', margin: '10px 0 30px' }}>Leave Management System</p>

      <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 10px' }}>Welcome Back</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>
        Sign in with your company Google account to continue
      </p>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #d1d5db',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        width: '250px'
      }}>
        <img 
        //   src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            src="/Images/GoogleLogo.WebP"
          alt="Google Logo" 
          style={{ width: '20px', height: '20px' }} 
        />
        Continue with Google
      </button>

      <p style={{ fontSize: '15px', color: '#9ca3af', marginTop: '30px', textAlign: 'center', width: '70%' }}>
        By signing in, you agree to use this system for leave management purposes only.
      </p>
    </div>
  );
};

export default Login;

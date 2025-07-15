import React, { useState } from 'react';

const Login = ({ error, onClearError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    if (error) {
      onClearError();
    }
    
    // Google OAuth 2.0 configuration
    const clientId = '231307628741-esl0gi53of5l4k5huudvaqeem55gt08c.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:5000/auth/google/callback';
    const scope = 'email profile';
    const responseType = 'code';
    const prompt = 'select_account';
    
    // Construct Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=${responseType}&` +
      `prompt=${prompt}`;
    
    // Redirect to Google OAuth
    window.location.href = googleAuthUrl;
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      
      {/* Error Popup Modal */}
      {error && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ⚠️
              </div>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Access Denied
              </h3>
            </div>
            
            <p style={{
              margin: '0 0 20px 0',
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {error}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={onClearError}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
      <img 
        src="/Images/Logo1.jpg" 
        alt="Login Background"
        style={{ width: '30%', height: '100', marginTop: '2%' }} 
      />
      
      <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '30px 0 20px' }}>Manureva</h1>
      <p style={{ color: '#6b7280', margin: '10px 0 30px' }}>Leave Management System</p>

      <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 10px' }}>Welcome Back</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>
        Sign in with your company Google account to continue
      </p>

      <button 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #d1d5db',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '14px',
          backgroundColor: isLoading ? '#f3f4f6' : '#fff',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: '250px',
          transition: 'all 0.2s ease',
          opacity: isLoading ? 0.7 : 1,
          transform: isLoading ? 'scale(0.98)' : 'scale(1)'
        }}
        onMouseDown={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'scale(0.95)';
          }
        }}
        onMouseUp={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'scale(1)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        <img 
          src="/Images/Googlelogo.webp"
          alt="Google Logo" 
          style={{ width: '20px', height: '20px' }} 
        />
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </button>

      <p style={{ fontSize: '15px', color: '#9ca3af', marginTop: '30px', textAlign: 'center', width: '70%' }}>
        By signing in, you agree to use this system for leave management purposes only.
      </p>
    </div>
  );
};

export default Login;

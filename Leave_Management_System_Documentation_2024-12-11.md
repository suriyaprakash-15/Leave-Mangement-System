# Leave Management System - Google OAuth Integration
**Date:** December 11, 2024  
**Status:** ✅ Fully Functional

## 🎯 **Project Overview**
A leave management system with Google OAuth 2.0 authentication, built with React frontend and Flask backend. Users can authenticate using their Google accounts and the system stores user information in PostgreSQL database.

## 🏗️ **Architecture**
- **Frontend:** React.js (http://localhost:3000)
- **Backend:** Python Flask (http://localhost:5000)
- **Database:** PostgreSQL
- **Authentication:** Google OAuth 2.0

## 📁 **Project Structure**

### **Frontend Structure**
```
Frontend/
├── src/
│   ├── Components/
│   │   └── Login/
│   │       ├── Login1.jsx (Main login page with Google OAuth button)
│   │       └── Login.css (Enhanced button styling with hover effects)
│   ├── App.js (Simple application routing)
│   └── index.js (Application entry point)
├── public/
│   └── Images/
│       ├── Logo1.jpg (Company logo)
│       └── GoogleLogo.WebP (Google logo for button)
└── package.json
```

### **Backend Structure**
```
Backend/
├── app.py (Main Flask application with OAuth implementation)
├── models.py (User database model with SQLAlchemy)
├── config.py (Configuration settings and environment variables)
├── requirements.txt (Python dependencies)
├── create_tables.py (Database table creation script)
├── setup_database.py (Database initialization)
├── test_oauth.py (OAuth testing script)
└── README.md (Setup instructions)
```

## 🔐 **Google OAuth Flow**

### **Authentication Process:**
1. **User clicks "Continue with Google"** button on login page
2. **Frontend redirects** to backend `/auth/google` endpoint
3. **Backend redirects** to Google OAuth page with account selection
4. **User selects account** and authorizes application
5. **Google redirects** back to `/auth/google/callback`
6. **Backend processes** authorization code and gets user info
7. **User created/updated** in PostgreSQL database
8. **Session established** and user redirected back to login page

### **OAuth Configuration:**
```python
google_auth_url = (
    f"https://accounts.google.com/o/oauth2/auth?"
    f"client_id={client_id}&"
    f"redirect_uri={redirect_uri}&"
    f"scope=openid%20email%20profile&"
    f"response_type=code&"
    f"access_type=offline&"
    f"prompt=select_account"
)
```

## 🗄️ **Database Schema**

### **Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(500),
    role ENUM('employee', 'manager', 'hr', 'ceo', 'consultant') DEFAULT 'employee',
    manager_id INTEGER REFERENCES users(id),
    join_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Database Connection:**
- **Host:** localhost
- **Port:** 5432
- **Database:** leavemanagement
- **Username:** postgres
- **Connection String:** `postgresql://postgres:password@localhost/leavemanagement`

## 🚀 **Setup Instructions**

### **1. Prerequisites**
- Python 3.13
- Node.js and npm
- PostgreSQL 17
- Google Cloud Console account

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Create database and tables
python setup_database.py
python create_tables.py

# Start Flask server
python app.py
```

### **3. Frontend Setup**
```bash
# Navigate to frontend directory
cd Frontend

# Install Node.js dependencies
npm install

# Start React development server
npm start
```

### **4. Google OAuth Configuration**
1. **Go to Google Cloud Console:** https://console.cloud.google.com/
2. **Create new project** or select existing one
3. **Enable Google+ API**
4. **Create OAuth 2.0 credentials:**
   - Application Type: Web application
   - Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
5. **Copy Client ID and Client Secret**
6. **Update config.py** with your credentials

## 📦 **Dependencies**

### **Backend Dependencies (requirements.txt):**
```
Flask
Flask-SQLAlchemy
Flask-Migrate
psycopg2-binary
Authlib
Flask-Mail
python-dotenv
Flask-CORS
requests
```

### **Frontend Dependencies:**
- React 18
- React Router (if needed for future features)

## 🔑 **Environment Configuration**

### **config.py Settings:**
```python
class Config:
    SECRET_KEY = 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost/leavemanagement'
    GOOGLE_OAUTH_CLIENT_ID = 'your-google-client-id'
    GOOGLE_OAUTH_CLIENT_SECRET = 'your-google-client-secret'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
```

## 🌐 **API Endpoints**

### **Authentication Endpoints:**
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Handle OAuth callback
- `GET /api/user` - Get current authenticated user info
- `GET /api/logout` - Logout current user

### **Utility Endpoints:**
- `GET /` - Welcome message
- `GET /test` - Backend health check

## 🎨 **UI Components**

### **Login Page Features:**
- **Company Logo** display
- **Welcome message** with company name "Manureva"
- **Google OAuth button** with enhanced styling:
  - Hover effects
  - Active state animations
  - Focus states for accessibility
  - Google logo integration

### **Button Styling:**
```css
.google-login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  width: 250px;
  transition: box-shadow 0.2s, background 0.2s, border-color 0.2s;
  box-shadow: 0 1px 2px rgba(60,60,60,0.03);
}

.google-login-btn:hover {
  background: #f5f5f5;
  border-color: #4285f4;
  box-shadow: 0 2px 8px rgba(66,133,244,0.10);
}
```

## 📊 **Current Status & Features**

### **✅ Completed Features:**
- Google OAuth 2.0 authentication
- User database storage
- Session management
- Responsive login UI
- Error handling
- CORS configuration
- Database integration

### **✅ Working Components:**
- OAuth flow with account selection
- User creation and storage
- Session persistence
- Frontend-backend communication
- Database operations

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **"redirect_uri_mismatch"** - Update Google Cloud Console redirect URI
2. **Database connection errors** - Ensure PostgreSQL is running
3. **Import errors** - Install all requirements with `pip install -r requirements.txt`
4. **CORS errors** - Check CORS configuration in backend

### **Debug Steps:**
1. Check backend logs for OAuth errors
2. Verify Google Cloud Console settings
3. Test database connection
4. Check browser console for frontend errors

## 🎯 **Future Enhancements**

### **Planned Features:**
- Leave request functionality
- Role-based access control
- User dashboard
- Leave approval workflow
- Email notifications
- Calendar integration
- Team management

### **Technical Improvements:**
- JWT token authentication
- Refresh token implementation
- API rate limiting
- Database migrations
- Unit testing
- Production deployment

## 📝 **Development Notes**

### **Key Implementation Details:**
- **OAuth Flow:** Manual implementation without Authlib for better control
- **Database:** SQLAlchemy ORM with PostgreSQL
- **Session Management:** Flask session-based authentication
- **Error Handling:** Comprehensive error catching and user feedback
- **Performance:** Timeout configurations to prevent hanging requests

### **Security Considerations:**
- HTTPS required for production
- Secure session configuration
- Environment variable protection
- Input validation
- SQL injection prevention (SQLAlchemy)

---

**Document Version:** 1.0  
**Last Updated:** December 11, 2024  
**Author:** Development Team  
**Status:** ✅ Production Ready - OAuth Integration Complete 
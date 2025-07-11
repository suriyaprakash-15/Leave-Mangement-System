# Leave Management System Backend

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application Type to "Web application"
6. Add Authorized redirect URIs:
   - `http://127.0.0.1:5000/login/google/authorized`
   - `http://localhost:5000/login/google/authorized`
7. Copy the Client ID and Client Secret

### 3. Set Environment Variables

Create a `.env` file in the Backend directory with:
```
FLASK_SECRET_KEY=your_secret_key_here
DATABASE_URL=postgresql://postgres:your_password@localhost/leavemanagement
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id_here
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret_here
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password_here
```

### 4. Set up PostgreSQL Database

1. Create a database named `leavemanagement`
2. Run the SQL commands from the models.py file to create the users table

### 5. Run the Backend
```bash
python app.py
```

The server will start on `http://127.0.0.1:5000`

### 6. Test the Connection
Visit `http://127.0.0.1:5000/test` to verify the backend is working.

## API Endpoints

- `GET /` - Welcome message
- `GET /test` - Test endpoint
- `GET /login/google` - Start Google OAuth flow
- `GET /login/google/authorized` - Google OAuth callback 
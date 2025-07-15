import os
from flask import Flask, redirect, url_for, session, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User
from datetime import date
from flask_mail import Mail, Message
from flask_cors import CORS
from config import Config
import requests

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS with credentials
CORS(app, origins=["http://localhost:3000"], supports_credentials=True, allow_headers=["Content-Type", "Authorization"])

# Email config
mail = Mail(app)

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    return "Welcome to the Leave Management System!"

@app.route("/auth/google")
def login():
    """Direct redirect to Google OAuth"""
    client_id = app.config['GOOGLE_OAUTH_CLIENT_ID']
    redirect_uri = "http://localhost:5000/auth/google/callback"
    
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/auth?"
        f"client_id={client_id}&"
        f"redirect_uri={redirect_uri}&"
        f"scope=openid%20email%20profile&"
        f"response_type=code&"
        f"access_type=offline&"
        f"prompt=select_account"
    )
    
    print(f"Redirecting to: {google_auth_url}")
    return redirect(google_auth_url)

@app.route("/auth/google/callback")
def authorize():
    try:
        code = request.args.get('code')
        error = request.args.get('error')
        
        if error:
            print(f"Google OAuth error: {error}")
            return redirect("http://localhost:3000/?error=google_oauth_error")
        
        if not code:
            print("No authorization code received")
            return redirect("http://localhost:3000/?error=no_code")
        
        print(f"Received authorization code: {code[:10]}...")
        
        # Exchange code for token
        token_url = 'https://oauth2.googleapis.com/token'
        token_data = {
            'client_id': app.config['GOOGLE_OAUTH_CLIENT_ID'],
            'client_secret': app.config['GOOGLE_OAUTH_CLIENT_SECRET'],
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:5000/auth/google/callback'
        }
        
        print("Exchanging code for token...")
        # Use timeout to prevent hanging
        token_response = requests.post(token_url, data=token_data, timeout=10)
        token_response.raise_for_status()
        token_info = token_response.json()
        
        print("Getting user info...")
        # Get user info with timeout
        userinfo_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
        headers = {'Authorization': f"Bearer {token_info['access_token']}"}
        userinfo_response = requests.get(userinfo_url, headers=headers, timeout=10)
        userinfo_response.raise_for_status()
        user_info = userinfo_response.json()
        
        print(f"User info received: {user_info.get('email', 'No email')}")
        
        # Domain validation - only allow @manureva.com and @manurevasolutions.net emails
        user_email = user_info.get('email', '')
        allowed_domains = ['@manureva.com', '@manurevasolutions.net']
        if not any(user_email.endswith(domain) for domain in allowed_domains):
            print(f"Access denied: {user_email} is not from allowed domains")
            return redirect("http://localhost:3000/?error=unauthorized_domain")
        
        # Check if user exists, create if not
        user = User.query.filter_by(email=user_info["email"]).first()
        if not user:
            user = User(
                google_id=user_info["id"],
                email=user_info["email"],
                name=user_info["name"],
                profile_picture=user_info.get("picture"),
                join_date=date.today()
            )
            db.session.add(user)
            db.session.commit()
            print(f"New user created: {user.email}")
        else:
            print(f"Existing user found: {user.email}")
        
        # Set session
        session["user_id"] = user.id
        session["user_email"] = user.email
        session["user_name"] = user.name
        
        print(f"Session set - user_id: {session.get('user_id')}, user_email: {session.get('user_email')}")
        print("Redirecting to frontend...")
        # Redirect back to frontend with success parameter
        return redirect("http://localhost:3000/?success=true")
    
    except requests.exceptions.Timeout:
        print("Request timeout")
        return redirect("http://localhost:3000/?error=timeout")
    except Exception as e:
        print(f"OAuth error: {e}")
        return redirect("http://localhost:3000/?error=auth_failed")

@app.route("/api/user")
def get_user():
    """API endpoint to get current user info"""
    print(f"Session data: {dict(session)}")
    
    if "user_id" not in session:
        print("No user_id in session")
        return jsonify({"error": "Not authenticated"}), 401
    
    user = User.query.get(session["user_id"])
    if not user:
        print(f"User not found for id: {session['user_id']}")
        return jsonify({"error": "User not found"}), 404
    
    user_data = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "profile_picture": user.profile_picture,
        "role": user.role
    }
    print(f"Returning user data: {user_data}")
    return jsonify(user_data)

@app.route("/api/logout")
def logout():
    """Logout user"""
    session.clear()
    return jsonify({"message": "Logged out successfully"})

@app.route('/api/proxy-image')
def proxy_image():
    image_url = request.args.get('url')
    if not image_url:
        return jsonify({'error': 'No URL provided'}), 400
    try:
        resp = requests.get(image_url, stream=True)
        resp.raise_for_status()
        return Response(resp.content, mimetype=resp.headers['Content-Type'])
    except Exception as e:
        print(f"Image proxy error: {e}")
        return jsonify({'error': 'Failed to fetch image'}), 500

def send_email(to, subject, body):
    try:
        msg = Message(subject, recipients=[to], body=body)
        mail.send(msg)
    except Exception as e:
        print(f"Email sending failed: {e}")

@app.route("/test")
def test():
    return jsonify({"message": "Backend is working!", "status": "success"})

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000) 
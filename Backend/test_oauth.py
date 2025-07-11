from app import app

with app.app_context():
    from flask import url_for
    
    # Test the OAuth URL generation
    client_id = app.config['GOOGLE_OAUTH_CLIENT_ID']
    redirect_uri = url_for('authorize', _external=True)
    
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/auth?"
        f"client_id={client_id}&"
        f"redirect_uri={redirect_uri}&"
        f"scope=openid%20email%20profile&"
        f"response_type=code"
    )
    
    print("=== OAuth URL Test ===")
    print(f"Client ID: {client_id}")
    print(f"Redirect URI: {redirect_uri}")
    print(f"Full Google Auth URL: {google_auth_url}")
    print("\n=== Expected Redirect URIs in Google Cloud Console ===")
    print("Make sure these are added to your Google Cloud Console:")
    print("1. http://localhost:5000/auth/google/callback")
    print("2. http://127.0.0.1:5000/auth/google/callback") 
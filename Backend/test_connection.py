import requests
import json

def test_backend():
    """Test if the backend is running and responding"""
    try:
        # Test the main endpoint
        response = requests.get('http://localhost:5000/')
        print(f"Main endpoint: {response.status_code} - {response.text}")
        
        # Test the test endpoint
        response = requests.get('http://localhost:5000/test')
        print(f"Test endpoint: {response.status_code} - {response.json()}")
        
        print("\n✅ Backend is running successfully!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running. Please start it with: python app.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_backend() 
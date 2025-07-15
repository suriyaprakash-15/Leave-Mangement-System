// api.js
// Utility functions for backend API calls

export async function fetchUser() {
  const response = await fetch('http://localhost:5000/api/user', {
    credentials: 'include',
  });
  return response;
}

export async function logoutUser() {
  return fetch('http://localhost:5000/api/logout', {
    credentials: 'include',
  });
} 
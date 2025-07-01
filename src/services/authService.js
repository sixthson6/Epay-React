import api from './apiService'; // Import the configured Axios instance

// Function for user registration
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    // Your API returns a string message directly
    return response.data; // Expected: "User registered successfully!"
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error; // Re-throw to be handled by the component
  }
};

// Function for user login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // CRITICAL NOTE: Your backend MUST return the full JwtAuthResponse object here,
    // not just the accessToken string, for the frontend to work correctly.
    // Assuming it will return: { accessToken, refreshToken, tokenType, userId, username, roles }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Function for refreshing the access token
export const refreshToken = async (refreshTokenString) => {
  try {
    // Your API expects a raw refresh token string as the body
    const response = await api.post('/auth/refresh-token', refreshTokenString, {
        headers: {
            'Content-Type': 'text/plain' // Specify content type for raw string body
        }
    });
    // Assuming it returns: { accessToken, refreshToken, tokenType, userId, username, roles }
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error.response?.data || error.message);
    throw error;
  }
};
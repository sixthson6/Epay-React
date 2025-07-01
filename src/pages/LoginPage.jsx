// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Make sure to use .jsx
import { login } from '../services/authService'; // Import login function
import api from '../services/apiService'; // Import api for potential refresh in context

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Rename context's login to avoid conflict

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      // Call the login function from authService
      const responseData = await login({ email, password });

      // CRITICAL: Ensure your backend's /auth/login returns the full JwtAuthResponse object.
      // As per your spec, it should be { accessToken, refreshToken, tokenType, userId, username, roles }
      const { accessToken, refreshToken, expiresIn } = responseData;

      // Update AuthContext state and localStorage
      authLogin(accessToken, refreshToken, { expiresIn });

      // Redirect to the home page or a dashboard
      navigate('/');

    } catch (err) {
      const apiError = err.response?.data;
      if (typeof apiError === 'object' && apiError !== null) {
          // Handle general error object if your backend sends it for login failures
          if (apiError.message) {
              setError(apiError.message);
          } else {
              setError('An unexpected error occurred during login.');
          }
      } else if (typeof apiError === 'string') {
          // Fallback for simple string errors (though login should ideally return JSON)
          setError(apiError || 'Login failed. Please check your credentials.');
      } else {
          setError('Login failed. Please check your credentials or network connection.');
      }
      console.error('Login error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Epay</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              id="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage.jsx'; // Ensure .jsx if you renamed it
import LoginPage from './pages/LoginPage.jsx';     // Import LoginPage
import RegisterPage from './pages/RegisterPage.jsx'; // Import RegisterPage
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'; // Import useAuth

// Component for the navigation bar
function Navbar() {
  const { isAuthenticated, logout, user } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-300">Products</Link>
        </li>
        {isAuthenticated && ( // Only show cart if authenticated
          <li>
            <Link to="/cart" className="hover:text-gray-300">Cart (Placeholder)</Link>
          </li>
        )}
        {isAuthenticated ? (
          <>
            <li className="text-gray-400">Hello, {user?.username || 'User'}!</li> {/* Display username */}
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300 bg-transparent border-none cursor-pointer text-white">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Render the Navbar component */}
        {/* Main Content Area - Routes will render here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />       {/* Add Login Route */}
          <Route path="/register" element={<RegisterPage />} /> {/* Add Register Route */}
          {/* Add more routes here as we build out features */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
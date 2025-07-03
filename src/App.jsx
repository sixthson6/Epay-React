import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

import { Button } from './components/ui/button';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from './components/ui/menubar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './components/ui/dropdown-menu';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Menubar className="flex justify-between items-center px-4 py-2 shadow-md">
      <MenubarMenu>
        <Link to="/" className="text-lg font-bold">ePay</Link>
      </MenubarMenu>

      <div className="flex items-center space-x-4">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/">Home</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/products">Products</Link>
          </MenubarTrigger>
        </MenubarMenu>

        {isAuthenticated && (
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/cart">Cart (Placeholder)</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <span>Hello, {user?.username || 'User'}!</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/login">Login</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/register">Register</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}
      </div>
    </Menubar>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
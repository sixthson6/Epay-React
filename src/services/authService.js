import { apiClient } from './api'

// Function for user registration
export const register = async (userData) => {
  return await apiClient.post('/auth/register', userData)
}

// Function for user login
export const login = async (credentials) => {
  const data = await apiClient.post('/auth/login', credentials)
  if (data.accessToken) {
    apiClient.setToken(data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
  }
  return data
}

// Function for user logout
export const logout = () => {
  apiClient.setToken(null)
  localStorage.removeItem('refreshToken')
}

// Function for refreshing the access token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token found')
  }
  return await apiClient.refreshToken(refreshToken)
}

// Initialize authentication from storage
export const initializeAuth = () => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    apiClient.setToken(token)
  }
}

// Get current user from token
export const getCurrentUser = () => {
  const token = apiClient.token
  if (!token) return null

  try {
    // Decode JWT to get user info (basic decoding)
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      id: payload.sub, // Subject (user ID)
      username: payload.username,
      roles: payload.roles || []
    }
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

// Check if user has a specific role
export const hasRole = (role) => {
  const user = getCurrentUser()
  return user?.roles.includes(role) || false
}

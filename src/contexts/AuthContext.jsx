import { createContext, useContext, useReducer, useEffect } from 'react'
import authService from '../services/authService'

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER: 'LOAD_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING'
}

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      }

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error
      }

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }

    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false
      }

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize authentication on app start
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = () => {
    try {
      authService.initializeAuth()
      const user = authService.getCurrentUser()
      
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER,
        payload: { user }
      })
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER,
        payload: { user: null }
      })
    }
  }

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })

    try {
      const response = await authService.login(credentials)
      const user = {
        id: response.userId,
        username: response.username,
        roles: response.roles
      }

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user }
      })

      return response
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START })

    try {
      const response = await authService.register(userData)
      
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS
      })

      return response
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }

  const hasRole = (role) => {
    return authService.hasRole(role)
  }

  const isAdmin = () => {
    return hasRole('ROLE_ADMIN')
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    hasRole,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext


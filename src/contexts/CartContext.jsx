import { createContext, useContext, useReducer, useEffect } from 'react'
import cartService from '@/services/cartService'
import { useAuth } from './AuthContext'

// Initial state
const initialState = {
  cart: null,
  isLoading: false,
  error: null
}

// Action types
const CART_ACTIONS = {
  LOAD_CART_START: 'LOAD_CART_START',
  LOAD_CART_SUCCESS: 'LOAD_CART_SUCCESS',
  LOAD_CART_FAILURE: 'LOAD_CART_FAILURE',
  ADD_TO_CART_START: 'ADD_TO_CART_START',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'ADD_TO_CART_FAILURE',
  UPDATE_CART_START: 'UPDATE_CART_START',
  UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
  UPDATE_CART_FAILURE: 'UPDATE_CART_FAILURE',
  REMOVE_FROM_CART_START: 'REMOVE_FROM_CART_START',
  REMOVE_FROM_CART_SUCCESS: 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILURE: 'REMOVE_FROM_CART_FAILURE',
  CLEAR_CART_START: 'CLEAR_CART_START',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAILURE: 'CLEAR_CART_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_CART: 'RESET_CART'
}

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART_START:
    case CART_ACTIONS.ADD_TO_CART_START:
    case CART_ACTIONS.UPDATE_CART_START:
    case CART_ACTIONS.REMOVE_FROM_CART_START:
    case CART_ACTIONS.CLEAR_CART_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case CART_ACTIONS.LOAD_CART_SUCCESS:
    case CART_ACTIONS.ADD_TO_CART_SUCCESS:
    case CART_ACTIONS.UPDATE_CART_SUCCESS:
    case CART_ACTIONS.REMOVE_FROM_CART_SUCCESS:
    case CART_ACTIONS.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload.cart,
        isLoading: false,
        error: null
      }

    case CART_ACTIONS.LOAD_CART_FAILURE:
    case CART_ACTIONS.ADD_TO_CART_FAILURE:
    case CART_ACTIONS.UPDATE_CART_FAILURE:
    case CART_ACTIONS.REMOVE_FROM_CART_FAILURE:
    case CART_ACTIONS.CLEAR_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }

    case CART_ACTIONS.RESET_CART:
      return {
        ...initialState
      }

    default:
      return state
  }
}

// Create context
const CartContext = createContext()

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { isAuthenticated, user } = useAuth()

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart()
    } else {
      dispatch({ type: CART_ACTIONS.RESET_CART })
    }
  }, [isAuthenticated, user])

  const loadCart = async () => {
    if (!isAuthenticated) return

    dispatch({ type: CART_ACTIONS.LOAD_CART_START })

    try {
      const cart = await cartService.getCart()
      dispatch({
        type: CART_ACTIONS.LOAD_CART_SUCCESS,
        payload: { cart }
      })
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.LOAD_CART_FAILURE,
        payload: { error: error.message }
      })
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add items to cart')
    }

    dispatch({ type: CART_ACTIONS.ADD_TO_CART_START })

    try {
      const cart = await cartService.addToCart(productId, quantity)
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_SUCCESS,
        payload: { cart }
      })
      return cart
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const updateCartItem = async (productId, quantity) => {
    if (!isAuthenticated) return

    dispatch({ type: CART_ACTIONS.UPDATE_CART_START })

    try {
      const cart = await cartService.updateCartItem(productId, quantity)
      dispatch({
        type: CART_ACTIONS.UPDATE_CART_SUCCESS,
        payload: { cart }
      })
      return cart
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.UPDATE_CART_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return

    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART_START })

    try {
      const cart = await cartService.removeFromCart(productId)
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART_SUCCESS,
        payload: { cart }
      })
      return cart
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const clearCart = async () => {
    if (!isAuthenticated) return

    dispatch({ type: CART_ACTIONS.CLEAR_CART_START })

    try {
      const cart = await cartService.clearCart()
      dispatch({
        type: CART_ACTIONS.CLEAR_CART_SUCCESS,
        payload: { cart }
      })
      return cart
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.CLEAR_CART_FAILURE,
        payload: { error: error.message }
      })
      throw error
    }
  }

  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR })
  }

  const getCartItemCount = () => {
    return cartService.getCartItemCount(state.cart)
  }

  const getCartTotal = () => {
    return cartService.calculateCartTotal(state.cart)
  }

  const value = {
    ...state,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    clearError,
    getCartItemCount,
    getCartTotal
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext


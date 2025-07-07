import apiClient from './api.js'

export const cartService = {
  // Get user's cart
  async getCart() {
    return await apiClient.get('/cart')
  },

  // Add product to cart
  async addToCart(productId, quantity = 1) {
    return await apiClient.post('/cart/add', {
      productId,
      quantity
    })
  },

  // Update product quantity in cart
  async updateCartItem(productId, quantity) {
    return await apiClient.put('/cart/update', {
      productId,
      quantity
    })
  },

  // Remove product from cart
  async removeFromCart(productId) {
    return await apiClient.delete(`/cart/remove/${productId}`)
  },

  // Clear entire cart
  async clearCart() {
    return await apiClient.delete('/cart/clear')
  },

  // Get cart item count
  getCartItemCount(cart) {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  },

  // Calculate cart total
  calculateCartTotal(cart) {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((total, item) => total + item.subtotal, 0)
  }
}

export default cartService


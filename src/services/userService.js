import apiClient from './api.js'

export const userService = {
  // Get current user profile
  async getCurrentUserProfile() {
    return await apiClient.get('/users/me')
  },

  // Get user by ID
  async getUserById(userId) {
    return await apiClient.get(`/users/${userId}`)
  },

  // Update user profile
  async updateUserProfile(userId, userData) {
    return await apiClient.put(`/users/${userId}`, userData)
  },

  // Delete user account
  async deleteUser(userId) {
    return await apiClient.delete(`/users/${userId}`)
  },

  // Update current user profile
  async updateCurrentUserProfile(userData) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (!currentUser.id) {
      throw new Error('No current user found')
    }
    
    const updatedUser = await this.updateUserProfile(currentUser.id, userData)
    
    // Update localStorage with new user data
    localStorage.setItem('user', JSON.stringify({
      ...currentUser,
      ...updatedUser
    }))
    
    return updatedUser
  }
}

export default userService


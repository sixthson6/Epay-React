import apiClient from './api.js'

export const productService = {
  // Get all products with optional filters
  async getAllProducts(params = {}) {
    const queryParams = {}
    
    // Add pagination parameters
    if (params.pageNo !== undefined) queryParams.pageNo = params.pageNo
    if (params.pageSize !== undefined) queryParams.pageSize = params.pageSize
    
    // Add sorting parameters
    if (params.sortBy) queryParams.sortBy = params.sortBy
    if (params.sortDir) queryParams.sortDir = params.sortDir
    
    // Add search parameter
    if (params.name) queryParams.name = params.name
    
    return await apiClient.get('/products', queryParams)
  },

  // Get product by ID
  async getProductById(productId) {
    return await apiClient.get(`/products/${productId}`)
  },

  // Get products by category
  async getProductsByCategory(categoryName) {
    return await apiClient.get(`/products/category/${categoryName}`)
  },

  // Get all categories
  async getAllCategories() {
    return await apiClient.get('/categories')
  },

  // Create new product (Admin only)
  async createProduct(productData) {
    return await apiClient.post('/products', productData)
  },

  // Update product (Admin only)
  async updateProduct(productId, productData) {
    return await apiClient.put(`/products/${productId}`, productData)
  },

  // Delete product (Admin only)
  async deleteProduct(productId) {
    return await apiClient.delete(`/products/${productId}`)
  },

  // Search products
  async searchProducts(searchQuery, params = {}) {
    return await this.getAllProducts({
      ...params,
      name: searchQuery
    })
  }
}

export default productService


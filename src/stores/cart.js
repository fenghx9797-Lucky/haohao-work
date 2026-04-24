import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    lastOrder: null
  }),
  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    groupedCartItems: (state) => state.items
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      const index = this.items.findIndex((item) => item.id === productId)

      if (index > -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1
        } else {
          this.items.splice(index, 1)
        }
      }
    },
    clearCart() {
      this.items = []
    },
    submitOrder() {
      if (!this.items.length) {
        return null
      }

      const order = {
        id: `OD${Date.now()}`,
        items: this.items.map((item) => ({ ...item })),
        totalCount: this.totalCount,
        totalPrice: this.totalPrice,
        status: '待制作',
        pickupCode: String(Date.now()).slice(-4),
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
      }

      this.lastOrder = order
      this.items = []

      return order
    }
  }
})

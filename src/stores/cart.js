import { defineStore } from 'pinia'

const createCartKey = (productId, sizeName, toppings) => {
  const toppingKey = [...toppings].sort().join('|')
  return `${productId}__${sizeName}__${toppingKey}`
}

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
    addToCart(product, selection = {}) {
      const selectedSize = selection.selectedSize || product.sizes?.[0] || { name: '默认', price: product.price }
      const selectedToppings = selection.selectedToppings || []
      const cartKey = createCartKey(product.id, selectedSize.name, selectedToppings.map((item) => item.name))
      const existingItem = this.items.find((item) => item.cartKey === cartKey)
      const toppingTotal = selectedToppings.reduce((sum, item) => sum + item.price, 0)
      const finalPrice = selectedSize.price + toppingTotal

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          cartKey,
          id: product.id,
          name: product.name,
          icon: product.icon,
          quantity: 1,
          price: finalPrice,
          basePrice: product.price,
          selectedSize: selectedSize.name,
          selectedToppings: selectedToppings.map((item) => item.name),
          priceLabel: '小冯请客'
        })
      }
    },
    removeFromCart(cartKey) {
      const index = this.items.findIndex((item) => item.cartKey === cartKey)

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
        id: `DM${Date.now()}`,
        items: this.items.map((item) => ({ ...item })),
        totalCount: this.totalCount,
        totalPrice: this.totalPrice,
        status: '制作中',
        pickupCode: String(Date.now()).slice(-4),
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
      }

      this.lastOrder = order
      this.items = []

      return order
    }
  }
})

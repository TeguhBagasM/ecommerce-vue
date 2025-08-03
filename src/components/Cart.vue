<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div v-if="cartItems.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🛒</div>
      <div class="mb-4">
        <p class="text-gray-500 text-lg">Your cart is empty</p>
      </div>
      <router-link
        to="/products"
        class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Continue Shopping
      </router-link>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white p-4 rounded-lg shadow flex justify-between items-center"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="item.product.imageUrl || 'https://via.placeholder.com/80x80'"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 class="font-bold">{{ item.product.name }}</h3>
            <p class="text-blue-600 font-semibold">Rp {{ formatPrice(item.product.price) }}</p>
            <p class="text-sm text-gray-500">
              Subtotal: Rp {{ formatPrice(item.product.price * item.quantity) }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="updateCartQuantity(item.id, item.quantity - 1)"
            class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            -
          </button>
          <span class="font-semibold w-8 text-center">{{ item.quantity }}</span>
          <button
            @click="updateCartQuantity(item.id, item.quantity + 1)"
            class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            +
          </button>
          <button
            @click="removeFromCart(item.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition ml-4"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span class="text-green-600">Rp {{ formatPrice(cartTotal) }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <button
          @click="clearCart()"
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
        >
          Clear Cart
        </button>
        <button
          @click="checkout()"
          :disabled="loading"
          class="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg transition disabled:bg-gray-400"
        >
          {{ loading ? "Processing..." : "Checkout" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cart",
  data() {
    return {
      cartItems: [],
      loading: false,
      baseURL: "http://localhost:8080/api",
      userId: 1,
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },
  },
  async mounted() {
    await this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        const response = await axios.get(`${this.baseURL}/cart/${this.userId}`);
        this.cartItems = response.data;
      } catch (error) {
        this.showError("Error fetching cart", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async updateCartQuantity(cartId, newQuantity) {
      if (newQuantity <= 0) {
        await this.removeFromCart(cartId);
        return;
      }
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        await axios.put(
          `${this.baseURL}/cart/${cartId}?quantity=${newQuantity}&userId=${this.userId}`
        );
        await this.fetchCartItems();
      } catch (error) {
        this.showError("Error updating cart", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async removeFromCart(cartId) {
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        await axios.delete(`${this.baseURL}/cart/${cartId}?userId=${this.userId}`);
        await this.fetchCartItems();
        this.showSuccess("Item removed from cart");
      } catch (error) {
        this.showError("Error removing from cart", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async clearCart() {
      if (!confirm("Are you sure you want to clear your cart?")) return;
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        await axios.delete(`${this.baseURL}/cart/clear/${this.userId}`);
        this.cartItems = [];
        this.showSuccess("Cart cleared!");
      } catch (error) {
        this.showError("Error clearing cart", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async checkout() {
      if (this.cartItems.length === 0) {
        alert("Cart is empty!");
        return;
      }
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        const cartItemIds = this.cartItems.map((item) => item.id);
        await axios.post(`${this.baseURL}/orders/checkout`, {
          userId: this.userId,
          cartItemIds: cartItemIds,
          shippingInfo: "Jl. Default Address, Jakarta",
        });
        this.showSuccess("Order created successfully!");
        this.cartItems = [];
        this.$router.push("/orders");
      } catch (error) {
        this.showError("Error creating order", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },
    showSuccess(message) {
      alert("✅ " + message);
    },
    showError(message, error) {
      console.error(error);
      alert("❌ " + message + ": " + (error.response?.data?.message || error.message));
    },
  },
};
</script>

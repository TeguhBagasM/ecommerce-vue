<template>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Bahara Shop</h1>
      <div class="flex space-x-4">
        <router-link
          to="/products"
          class="px-3 py-1 rounded hover:bg-blue-700 transition"
          active-class="bg-blue-800"
        >
          Products
        </router-link>
        <router-link
          to="/cart"
          class="px-3 py-1 rounded hover:bg-blue-700 transition"
          active-class="bg-blue-800"
        >
          Cart ({{ cartCount }})
        </router-link>
        <router-link
          to="/orders"
          class="px-3 py-1 rounded hover:bg-blue-700 transition"
          active-class="bg-blue-800"
        >
          Orders
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "Navigation",
  data() {
    return {
      cartCount: 0,
      baseURL: "http://localhost:8080/api",
      userId: 1,
    };
  },
  async mounted() {
    await this.fetchCartCount();
  },
  methods: {
    async fetchCartCount() {
      try {
        const response = await axios.get(`${this.baseURL}/cart/count/${this.userId}`);
        this.cartCount = response.data;
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    },
  },
};
</script>

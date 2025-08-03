<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Products</h2>
    <div class="mb-4">
      <input
        v-model="searchKeyword"
        @input="searchProducts"
        placeholder="Search products..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img
          :src="product.imageUrl || 'https://via.placeholder.com/300x200'"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
          <p class="text-xl font-bold text-blue-600 mb-2">Rp {{ formatPrice(product.price) }}</p>
          <p class="text-sm text-gray-500 mb-3">Stock: {{ product.stock }}</p>
          <button
            @click="addToCart(product.id)"
            :disabled="product.stock === 0 || loading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      searchKeyword: "",
      loading: false,
      baseURL: "http://localhost:8080/api",
      userId: 1,
    };
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        const response = await axios.get(`${this.baseURL}/products`);
        this.products = response.data;
      } catch (error) {
        this.showError("Error fetching products", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async searchProducts() {
      if (this.searchKeyword.trim() === "") {
        await this.fetchProducts();
        return;
      }
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        const response = await axios.get(
          `${this.baseURL}/products/search?keyword=${this.searchKeyword}`
        );
        this.products = response.data;
      } catch (error) {
        this.showError("Error searching products", error);
      } finally {
        this.loading = false;
        this.$emit("set-loading", false);
      }
    },
    async addToCart(productId) {
      try {
        this.loading = true;
        this.$emit("set-loading", true);
        await axios.post(`${this.baseURL}/cart`, {
          userId: this.userId,
          productId: productId,
          quantity: 1,
        });
        this.showSuccess("Product added to cart!");
        const product = this.products.find((p) => p.id === productId);
        if (product) {
          product.stock -= 1;
        }
      } catch (error) {
        this.showError("Error adding to cart", error);
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

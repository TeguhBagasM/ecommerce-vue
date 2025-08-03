<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">My Orders</h2>
    <div v-if="orders.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">📦</div>
      <p class="text-gray-500 text-lg">No orders found</p>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-bold text-lg">{{ order.invoiceNumber }}</h3>
            <p class="text-gray-500">{{ formatDate(order.createdAt) }}</p>
          </div>
          <span
            :class="getStatusColor(order.status)"
            class="px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ order.status }}
          </span>
        </div>
        <div class="border-t pt-4">
          <p class="text-2xl font-bold text-green-600 mb-2">Rp {{ formatPrice(order.totalAmount) }}</p>
          <p class="text-gray-600">
            <span class="font-semibold">Shipping:</span> {{ order.shippingInfo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      baseURL: "http://localhost:8080/api",
      userId: 1,
    };
  },
  async mounted() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.$emit("set-loading", true);
        const response = await axios.get(`${this.baseURL}/orders/user/${this.userId}`);
        this.orders = response.data;
      } catch (error) {
        this.showError("Error fetching orders", error);
      } finally {
        this.$emit("set-loading", false);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getStatusColor(status) {
      const colors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PROCESSING: "bg-blue-100 text-blue-800",
        SHIPPED: "bg-green-100 text-green-800",
        DELIVERED: "bg-green-200 text-green-900",
        CANCELLED: "bg-red-100 text-red-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    },
    showError(message, error) {
      console.error(error);
      alert("❌ " + message + ": " + (error.response?.data?.message || error.message));
    },
  },
};
</script>

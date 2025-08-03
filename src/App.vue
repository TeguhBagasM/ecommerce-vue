<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    <div class="container mx-auto p-4">
      <router-view />
      <div
        v-if="loading"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
      userId: 1, // Hardcode untuk testing
      baseURL: "http://localhost:8080/api",
    };
  },
};
</script>

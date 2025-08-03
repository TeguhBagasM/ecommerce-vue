import { createRouter, createWebHistory } from "vue-router";
import Products from "../components/Products.vue";
import Cart from "../components/Cart.vue";
import Orders from "../components/Orders.vue";

const routes = [
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/",
    redirect: "/products",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

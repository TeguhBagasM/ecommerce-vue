Vue E-Commerce Frontend
Proyek ini adalah aplikasi frontend e-commerce yang dibangun menggunakan Vue 3 dengan Vite sebagai build tool. Aplikasi ini mengonsumsi REST API dari backend berbasis Spring Boot untuk mengelola produk, keranjang belanja, dan pesanan. Frontend ini menggunakan pendekatan component-based dengan Vue Router untuk navigasi antar halaman.
🚀 Fitur Utama

Tampilan Produk: Menampilkan daftar produk, mencari produk berdasarkan kata kunci, dan menambahkan produk ke keranjang.
Keranjang Belanja: Mengelola item di keranjang (tambah, kurang, hapus), menampilkan total harga, dan melakukan checkout.
Riwayat Pesanan: Menampilkan daftar pesanan pengguna dengan status dan detail pengiriman.
Desain Responsif: Menggunakan Tailwind CSS untuk antarmuka yang responsif dan modern.
Loading State: Menampilkan overlay loading selama permintaan API untuk pengalaman pengguna yang lebih baik.

🧱 Struktur Proyek
Proyek ini diorganisir dengan struktur berbasis komponen untuk memudahkan pemeliharaan dan pengembangan lebih lanjut:
src/
├── components/
│ ├── Navigation.vue # Komponen navigasi (header)
│ ├── Products.vue # Komponen untuk menampilkan dan mengelola produk
│ ├── Cart.vue # Komponen untuk mengelola keranjang belanja
│ └── Orders.vue # Komponen untuk menampilkan riwayat pesanan
├── router/
│ └── index.js # Konfigurasi Vue Router
├── App.vue # Komponen utama yang mengatur layout dan loading state
├── main.js # Entry point aplikasi
└── style.css # File CSS dengan Tailwind dan custom styles

Arsitektur Frontend

Vue Router: Mengelola navigasi antar halaman (/products, /cart, /orders) dengan redirect default ke /products.
Komponen Modular: Setiap fitur (produk, keranjang, pesanan) dipecah menjadi komponen terpisah untuk modularitas.
State Management: Setiap komponen mengelola data sendiri (produk, item keranjang, pesanan) dengan memanggil API menggunakan Axios.
Loading State: Dikelola di App.vue melalui event set-loading dari komponen anak untuk menampilkan overlay loading.
Styling: Menggunakan Tailwind CSS untuk desain responsif, dengan tambahan custom style untuk fitur seperti line-clamp.

🛠️ Prasyarat
Pastikan Anda memiliki alat-alat berikut sebelum menjalankan proyek:

Node.js (versi 16 atau lebih tinggi)
npm atau yarn
Backend Spring Boot berjalan di http://localhost:8080/api (lihat README backend untuk detail)
Git (opsional, untuk cloning repository)

Link Backend <https://github.com/TeguhBagasM/test-magang-tabeldata-ecommerce>
🔧 Instalasi

Clone Repository (jika menggunakan Git):
git clone <https://github.com/TeguhBagasM/ecommerce-vue.git>
cd vue-ecommerce-frontend

Instal Dependensi:
npm install

Pastikan Backend Berjalan:Pastikan backend Spring Boot berjalan di http://localhost:8080/api. Lihat README backend untuk panduan menjalankan server.

Jalankan Aplikasi:
npm run dev

Aplikasi akan berjalan di http://localhost:5173 (atau port lain yang ditentukan oleh Vite).

📦 Dependensi

Vue 3: Framework JavaScript untuk membangun UI.
Vue Router: Untuk navigasi antar halaman.
Axios: Untuk melakukan permintaan HTTP ke backend.
Tailwind CSS: Untuk styling responsif dan modern.

Instal dependensi ini dengan perintah berikut jika belum terpasang:
npm install vue@3 vue-router@4 axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

Konfigurasi tailwind.config.js:
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./src/**/\*.{vue,js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

🛒 Integrasi dengan Backend
Aplikasi ini mengonsumsi REST API dari backend Spring Boot dengan endpoint berikut:
Produk

GET /api/products: Mengambil daftar semua produk.
GET /api/products/search?keyword={keyword}: Mencari produk berdasarkan kata kunci.
POST /api/cart: Menambahkan produk ke keranjang.

Keranjang

GET /api/cart/{userId}: Mengambil isi keranjang pengguna.
PUT /api/cart/{cartItemId}?quantity={qty}&userId={userId}: Memperbarui jumlah item di keranjang.
DELETE /api/cart/{cartItemId}?userId={userId}: Menghapus item dari keranjang.
DELETE /api/cart/clear/{userId}: Menghapus semua item dari keranjang.
GET /api/cart/count/{userId}: Mengambil jumlah item di keranjang.

Pesanan

GET /api/orders/user/{userId}: Mengambil riwayat pesanan pengguna.
POST /api/orders/checkout: Membuat pesanan baru dari item keranjang.

Catatan: userId saat ini di-hardcode ke 1 untuk keperluan pengembangan. Dalam produksi, ini harus diganti dengan autentikasi pengguna yang dinamis.
🌟 Cara Menggunakan

Navigasi:

Gunakan menu navigasi di bagian atas untuk beralih antara Produk, Keranjang, dan Pesanan.
Halaman default adalah /products.

Produk:

Lihat daftar produk, cari produk menggunakan kolom pencarian, dan tambahkan ke keranjang dengan tombol "Add to Cart".
Produk dengan stok 0 akan menampilkan "Out of Stock" dan tombol dinonaktifkan.

Keranjang:

Lihat item di keranjang, ubah jumlah item dengan tombol +/-, atau hapus item dengan tombol "Remove".
Total harga diperbarui secara otomatis.
Klik "Clear Cart" untuk menghapus semua item, atau "Checkout" untuk membuat pesanan.

Pesanan:

Lihat riwayat pesanan dengan nomor invoice, tanggal, status, total harga, dan informasi pengiriman.
Status pesanan ditampilkan dengan warna berbeda (misalnya, PENDING: kuning, SHIPPED: hijau).

⚙️ Pengembangan Lebih Lanjut

Autentikasi: Tambahkan sistem login untuk mengganti userId yang di-hardcode.
Toast Notification: Ganti alert() dengan library seperti Vue Toastification untuk notifikasi yang lebih elegan.
State Management: Gunakan Pinia untuk mengelola state global (misalnya, data keranjang atau produk) jika aplikasi bertambah kompleks.
Error Handling: Tingkatkan penanganan error dengan menampilkan pesan yang lebih ramah pengguna.

📚 Referensi

Vue 3 Documentation
Vue Router Documentation
Tailwind CSS Documentation
Axios Documentation
Vite Documentation

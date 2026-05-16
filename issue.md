# Setup Backend Project (ElysiaJS + Drizzle + MySQL)

## Tujuan
Membuat kerangka kerja dasar (boilerplate) untuk project backend baru.

## Tech Stack
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **ORM**: Drizzle ORM
- **Database**: MySQL

## Langkah-langkah Implementasi (High Level)

1. **Inisialisasi Project**:
   - Lakukan inisialisasi project Bun baru di dalam direktori ini.
   
2. **Instalasi Dependencies**:
   - Install ElysiaJS sebagai web framework utama.
   - Install Drizzle ORM dan driver MySQL yang kompatibel dengan Bun.

3. **Konfigurasi Database (Drizzle & MySQL)**:
   - Buat file konfigurasi untuk Drizzle.
   - Setup koneksi database ke MySQL menggunakan environment variables.
   - Buat skema database awal (contoh sederhana seperti tabel `users` atau sekadar tabel dummy) menggunakan Drizzle.

4. **Setup Server ElysiaJS**:
   - Inisialisasi instance Elysia.
   - Integrasikan koneksi Drizzle agar bisa digunakan.
   - Buat endpoint sederhana (contoh: `GET /`) untuk memastikan server berjalan dan endpoint untuk mengecek koneksi database.

5. **Dokumentasi & Script**:
   - Sediakan file `.env.example` yang berisi daftar variabel koneksi database yang dibutuhkan.
   - Tambahkan scripts di `package.json` yang diperlukan untuk menjalankan development server dan migrasi Drizzle.

## Kriteria Penerimaan (Acceptance Criteria)
- Project berhasil dijalankan.
- Server Elysia bisa merespon request HTTP.
- Aplikasi berhasil terkoneksi ke database MySQL menggunakan Drizzle ORM.

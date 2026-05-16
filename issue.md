# Fitur Registrasi User (API)

## Deskripsi Tugas
Tugas ini adalah untuk mengimplementasikan fitur registrasi user baru. Kita akan membuat tabel `users` di database, membuat business logic untuk registrasi, dan mengekspos endpoint API.

## Spesifikasi Database (Tabel `users`)
Buat/update skema Drizzle untuk tabel `users` dengan struktur berikut:
- `id`: integer, auto increment, primary key
- `name`: varchar(255), not null
- `email`: varchar(255), unique, not null
- `password`: varchar(255), not null (akan diisi dengan hash password dari bcrypt atau library sejenis)
- `created_at`: datetime, default current_timestamp
- `updated_at`: datetime, default current_timestamp on update current_timestamp

## Spesifikasi API Endpoint
- **Endpoint**: `POST /api/users`
- **Tujuan**: Mendaftarkan user baru.

### Request Body (JSON)
```json
{
    "name": "Tia Widi",
    "email": "tia@localhost",
    "password": "password"
}
```

### Response (Success)
```json
{
    "data": "OK"
}
```

### Response (Error - Email sudah terdaftar)
Jika email sudah ada di database, kembalikan response:
```json
{
    "error": "email sudah terdaftar"
}
```

## Struktur Folder & File
Harap ikuti struktur folder dan penamaan file berikut di dalam direktori `src/`:
- `src/routes/` : Direktori untuk menyimpan file routing ElysiaJS.
  - Buat file: `users-route.ts`
- `src/services/` : Direktori untuk menyimpan logic bisnis aplikasi (query ke database, hashing password, dsb).
  - Buat file: `users-service.ts`

---

## Tahapan Implementasi (Step-by-Step)

Untuk mempermudah pengerjaan (khususnya untuk junior programmer atau model AI), ikuti langkah-langkah berikut secara berurutan:

### Langkah 1: Update Skema Database
1. Buka file `src/db/schema.ts`.
2. Update definisi tabel `users` agar sesuai dengan spesifikasi di atas (tambahkan kolom `password`, `created_at`, dan `updated_at`). Gunakan fungsi-fungsi tipe data dari `drizzle-orm/mysql-core` (seperti `datetime`, `timestamp`, dll).
3. Pastikan konfigurasi default timestamp sesuai.
4. Jalankan command sinkronisasi database (misalnya `bun run db:push`) untuk menerapkan perubahan skema ke MySQL.

### Langkah 2: Install Dependency Tambahan (Opsional, tergantung penggunaan)
1. Kita membutuhkan cara untuk melakukan hashing password.
2. Anda bisa menggunakan API bawaan Bun yaitu `Bun.password.hash` (direkomendasikan karena tidak butuh install apa-apa).
3. Jika menggunakan library eksternal, install `bcrypt` (contoh: `bun add bcrypt` dan `bun add -d @types/bcrypt`).

### Langkah 3: Buat Business Logic (Service)
1. Buat folder baru `src/services`.
2. Buat file `src/services/users-service.ts`.
3. Di dalam file ini, buat fungsi (misal `registerUser(payload)`).
4. Logic di dalam fungsi tersebut:
   - Lakukan query ke database menggunakan Drizzle ORM untuk mengecek apakah user dengan email tersebut sudah ada.
   - Jika sudah ada, throw sebuah error atau kembalikan status kegagalan.
   - Jika email belum terdaftar, lakukan hashing pada string password (misal menggunakan `Bun.password.hash` atau `bcrypt`).
   - Lakukan query `INSERT` data user baru (`name`, `email`, dan `password` yang sudah di-hash) ke dalam tabel `users`.

### Langkah 4: Buat API Route
1. Buat folder baru `src/routes`.
2. Buat file `src/routes/users-route.ts`.
3. Import fungsi `registerUser` dari `users-service.ts`.
4. Buat dan export instance/plugin Elysia untuk mendefinisikan route `POST /api/users`.
5. Di dalam handler route tersebut:
   - Ambil `name`, `email`, dan `password` dari `body` request.
   - Bungkus pemanggilan fungsi `registerUser` dalam blok `try-catch`.
   - Panggil fungsi `registerUser` dengan data dari body.
   - Jika service gagal (karena email terdaftar), return JSON: `{"error": "email sudah terdaftar"}`. Atur juga response status (misal 400 Bad Request) melalui parameter `set`.
   - Jika berhasil, return JSON: `{"data": "OK"}`.

### Langkah 5: Registrasikan Route ke Server Utama
1. Buka file `src/index.ts`.
2. Import module route yang sudah dibuat dari `src/routes/users-route.ts`.
3. Daftarkan route tersebut ke instance utama aplikasi Elysia (menggunakan `app.use(...)`).

### Langkah 6: Testing (Manual Verification)
1. Pastikan database lokal berjalan dan `.env` sudah dikonfigurasi dengan benar.
2. Jalankan server aplikasi (`bun run dev`).
3. Gunakan tools seperti Postman, Insomnia, atau `curl` untuk mengirimkan request HTTP `POST /api/users` dengan format JSON yang diminta.
4. Verifikasi bahwa response sesuai dengan skenario sukses.
5. Kirim ulang request yang sama, dan pastikan mendapat response error `"email sudah terdaftar"`.
6. Cek isi tabel `users` di database untuk memastikan password disimpan dalam format hash, bukan plaintext.

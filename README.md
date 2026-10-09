# Laravel 11 Serkom Master Guide

> Interactive Editorial Study Guide & Code Memorization Drill for Laravel 11 UKK / Serkom LSP RPL.

Aplikasi panduan belajar interaktif berbasis web dengan desain editorial minimalis, *pure inspiration*, dan standar *zero-gradient*. Dibuat untuk menghafal seluruh alur teknis pembuatan aplikasi restoran / kasir Laravel secara runut end-to-end.

---

## Fitur Utama

- **11 Bab Panduan Editorial Mendalam:**
  - Bab 0: Prolog & Mental Model Alur Data (Pelanggan vs Kasir).
  - Bab 1: Menyalakan XAMPP Apache, MySQL, dan Solusi Port 3306.
  - Bab 2: Pembuatan Proyek & Membedah Makna Flag Sakti `-mcr`.
  - Bab 3: 3 File Migration Relasional & Foreign Key Cascade.
  - Bab 4: Eloquent Model (`hasMany`, `belongsTo`) & Mass Assignment `$guarded = ['id']`.
  - Bab 5: Database Seeder & Akun Admin Penguji Default (`admin@gmail.com`).
  - Bab 6: Instalasi Breeze & Perintah Wajib `php artisan storage:link`.
  - Bab 7: Controller CRUD Master Makanan & Siklus Hidup File Foto di Storage.
  - Bab 8: Mesin Transaksi Pelanggan Atomik via `DB::transaction`.
  - Bab 9: Dashboard Monitoring Kasir & Pencegahan Masalah *N+1 Query*.
  - Bab 10: Bedah 5 Bug Kritis dari Modul Sekolah Asli.
  - Bab 11: Speedrun Flashcard Hafalan & Checklist Pengujian Mandiri.

- **Fitur Interaktif:**
  - 1-Click Code Copy dengan umpan balik visual instan.
  - Flashcard Drill (klik untuk membalik kartu dan menguji daya ingat perintah artisan).
  - Checklist Ujian Mandiri tersimpan otomatis di `localStorage`.
  - Navigasi ScrollTrigger dinamis dengan pelacak progress belajar.

---

## Cara Menjalankan

Cukup buka file `index.html` langsung di browser Anda, atau jalankan melalui web server lokal:

```bash
# Buka via browser
start index.html
```

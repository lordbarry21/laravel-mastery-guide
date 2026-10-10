import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Copy, Check, Terminal, Database, Server, 
  CheckCircle2, ArrowUpRight, BookOpen, Layers, ShieldCheck,
  ChevronDown, ChevronRight, Eye, AlertCircle, ShoppingCart, Lock
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTabBlade, setActiveTabBlade] = useState('index');
  const [flippedCards, setFlippedCards] = useState({});
  const [checklist, setChecklist] = useState({
    c1: false, c2: false, c3: false, c4: false, c5: false, c6: false, c7: false, c8: false
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    try {
      const saved = localStorage.getItem('serkom_checklist_state_v3');
      if (saved) setChecklist(JSON.parse(saved));
    } catch (e) {}

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCheck = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    try {
      localStorage.setItem('serkom_checklist_state_v3', JSON.stringify(updated));
    } catch (e) {}
  };

  const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* 1px Whisper Reading Progress */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-neutral-900 dark:bg-neutral-100 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Editorial Sticky Header */}
      <header className="border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-40 bg-[#fafaf9]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-[760px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="font-serif text-lg tracking-tight font-medium hover:opacity-75 transition">
              Bari Achmad
            </a>
            <span className="text-neutral-400 dark:text-neutral-600 text-xs font-mono">/</span>
            <span className="text-xs text-neutral-500 font-mono tracking-wide uppercase">Buku Panduan Serkom LSP</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/lordbarry21/serkom-laravel-kuliner" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition flex items-center gap-1 font-mono"
            >
              <span>Repo Laravel</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 transition"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[760px] mx-auto px-6 py-16 flex-1 w-full space-y-16">
        
        {/* Title & Metadata */}
        <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-12">
          <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500">
            <span>Standar LSP RPL</span>
            <span>&bull;</span>
            <span>Laravel 11 &amp; Breeze</span>
            <span>&bull;</span>
            <span>Modul 1 s.d. 4 Lengkap</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.18] font-normal tracking-tight text-neutral-900 dark:text-neutral-50">
            Buku Induk Sistem Pemesanan Restoran Laravel 11: Pembahasan End-to-End &amp; Seluruh Kode Modul 1-4
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed pt-1">
            Seluruh berkas kode sumber dari 4 modul resmi SMK/LSP disajikan utuh tanpa potongan, dilengkapi penjelasan fungsi setiap baris perintah, alasan arsitektural di baliknya, dan perbaikan 5 celah bug fatal agar kode Anda zero-error di hadapan Asesor.
          </p>

          <div className="pt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Penulis: Bari Achmad &bull; SMKN 6 Tangerang Selatan</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">Live di serkom.barrydev.icu</span>
          </div>
        </div>

        {/* Quick Navigasi Bab */}
        <nav className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 space-y-2 text-xs">
          <span className="font-mono uppercase font-semibold text-neutral-400 tracking-wider block mb-2">Navigasi Cepat Modul &amp; Bab</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-neutral-700 dark:text-neutral-300">
            <a href="#modul1" className="hover:text-black dark:hover:text-white transition font-semibold">MODUL 1: Fondasi Proyek, DB &amp; Eloquent</a>
            <a href="#modul2" className="hover:text-black dark:hover:text-white transition font-semibold">MODUL 2: Auth Breeze &amp; CRUD Master Menu</a>
            <a href="#modul3" className="hover:text-black dark:hover:text-white transition font-semibold">MODUL 3: Sisi Customer &amp; Transaksi DB</a>
            <a href="#modul4" className="hover:text-black dark:hover:text-white transition font-semibold">MODUL 4: Dashboard Kasir &amp; Update Status</a>
            <a href="#bedah-bug" className="hover:text-black dark:hover:text-white transition font-semibold text-amber-600 dark:text-amber-400">Bedah 5 Bug Fatal Modul Sekolah</a>
            <a href="#flashcards" className="hover:text-black dark:hover:text-white transition font-semibold text-emerald-600 dark:text-emerald-400">Drill Hafalan &amp; Checklist LSP</a>
          </div>
        </nav>

        {/* ========================================================================= */}
        {/* MODUL 1 */}
        {/* ========================================================================= */}
        <section id="modul1" className="space-y-8 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Bagian I &bull; Modul 1</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Modul 1: Fondasi Proyek, Database, Migrasi Relasional &amp; Model Eloquent
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Modul 1 adalah pondasi aplikasi. Di sini kita menyiapkan basis data, mendefinisikan 3 tabel utama yang saling berelasi dengan Foreign Key Cascade, dan membuat Eloquent Model dengan perlindungan Mass Assignment.
            </p>
          </div>

          {/* Step 1: XAMPP */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 1: Menyalakan Web Server &amp; Database Daemon (XAMPP)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Buka aplikasi <strong>XAMPP Control Panel</strong> dan klik tombol <strong>Start</strong> pada modul <strong>Apache</strong> serta modul <strong>MySQL</strong>. Indikator keduanya harus menyala hijau.
            </p>
            <div className="p-4 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 space-y-2">
              <div className="text-neutral-500"># Cek koneksi port dan atasi error jika MySQL gagal start:</div>
              <div>net stop MySQL  <span className="text-neutral-500"># Hentikan service MySQL Windows lain yang membajak port 3306</span></div>
              <div className="text-neutral-400">Uji coba buka di browser: <span className="text-emerald-400">http://localhost/phpmyadmin</span></div>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Penjelasan Teknis:</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Apache bertindak sebagai server web lokal untuk menangani request HTTP browser, sedangkan MySQL adalah RDBMS relasional yang menjadi wadah tabel <code className="font-mono">foods</code>, <code className="font-mono">orders</code>, dan <code className="font-mono">order_details</code>. Keduanya wajib aktif sebelum perintah artisan migrasi dijalankan.
              </p>
            </div>
          </div>

          {/* Step 2: Create Project */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 2: Buat Folder Proyek Laravel via Composer
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800">
                <span className="text-neutral-400">Terminal CMD / Bash</span>
                <button 
                  onClick={() => copyToClipboard('composer create-project laravel/laravel pesanmakan\ncd pesanmakan\ncode .', 'cmd_create')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === 'cmd_create' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cmd_create' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed"><code>composer create-project laravel/laravel pesanmakan
cd pesanmakan
code .</code></pre>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Penjelasan Teknis:</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Perintah <code className="font-mono">composer create-project laravel/laravel pesanmakan</code> mengunduh kerangka kerja resmi Laravel 11 beserta dependensi vendor. Perintah <code className="font-mono">code .</code> membuka folder proyek langsung di Visual Studio Code.
              </p>
            </div>
          </div>

          {/* Step 3: .env setup */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 3: Konfigurasi Database pada File .env
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Buka file <code className="font-mono">.env</code> di root direktori proyek, lalu sesuaikan blok koneksi MySQL:
            </p>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 leading-relaxed">
              <pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pesanmakan
DB_USERNAME=root
DB_PASSWORD=</code></pre>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Penjelasan Teknis &amp; Tips Serkom:</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                XAMPP default di Windows menggunakan user <code className="font-mono">root</code> tanpa password. Jika database <code className="font-mono">pesanmakan</code> belum dibuat di phpMyAdmin, jangan khawatir! Saat perintah migrasi pertama dijalankan, Laravel 11 akan mendeteksi database belum ada dan bertanya: <em>"The database 'pesanmakan' does not exist. Would you like to create it?"</em> Ketik <strong>yes</strong> lalu Enter.
              </p>
            </div>
          </div>

          {/* Step 4: make:model -mcr */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 4: Perintah Generator Model, Migration &amp; Controller (-mcr)
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800">
                <span className="text-neutral-400">Terminal Perintah Artisan</span>
                <button 
                  onClick={() => copyToClipboard('php artisan make:model Food -mcr\nphp artisan make:model Order -mcr\nphp artisan make:model OrderDetail -m', 'cmd_mcr')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === 'cmd_mcr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'cmd_mcr' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed"><code>php artisan make:model Food -mcr
php artisan make:model Order -mcr
php artisan make:model OrderDetail -m</code></pre>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Bedah Arti Flag:</strong>
              <ul className="list-disc list-outside pl-5 space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li><strong className="text-neutral-900 dark:text-neutral-100 font-mono">-m:</strong> Otomatis membuat berkas Migration tabel di folder <code className="font-mono">database/migrations/</code>.</li>
                <li><strong className="text-neutral-900 dark:text-neutral-100 font-mono">-c:</strong> Otomatis membuat berkas Controller di <code className="font-mono">app/Http/Controllers/</code>.</li>
                <li><strong className="text-neutral-900 dark:text-neutral-100 font-mono">-r:</strong> Menghasilkan 7 method Resource lengkap: <code className="font-mono">index, create, store, show, edit, update, destroy</code>.</li>
                <li><strong>Mengapa OrderDetail hanya -m?</strong> Karena OrderDetail hanya bertindak sebagai tabel detail penampung item; logikanya dikendalikan langsung oleh <code className="font-mono">OrderController</code> saat checkout.</li>
              </ul>
            </div>
          </div>

          {/* Step 5: Migration 3 Tabel */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 5: Kode Utuh 3 File Migration Relasional
            </h3>
            
            {/* Tabel 1: foods */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-neutral-500 block">1. File: database/migrations/xxxx_create_foods_table.php</span>
              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
                <pre><code>{`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // PENTING: Nama tabel jamak 'foods' (dengan s)
        Schema::create('foods', function (Blueprint $table) {
            $table->id();                                                   // Primary Key (Auto Increment BigInt)
            $table->string('name');                                         // Nama Menu Makanan
            $table->enum('category', ['Makanan', 'Minuman', 'Cemilan']);    // Kategori Menu
            $table->decimal('price', 10, 2);                                // Harga Satuan
            $table->text('description')->nullable();                        // Deskripsi Makanan (nullable)
            $table->string('image')->nullable();                            // Path Foto di storage (nullable)
            $table->timestamps();                                           // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};`}</code></pre>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                <strong>Penjelasan Kode:</strong> Kolom <code className="font-mono">price</code> menggunakan tipe <code className="font-mono">decimal(10, 2)</code> untuk memastikan angka nominal harga rupiah tidak mengalami pembulatan float. Kolom <code className="font-mono">image</code> dan <code className="font-mono">description</code> diberi <code className="font-mono">nullable()</code> agar menu tetap bisa disimpan meski belum memiliki foto atau deskripsi.
              </p>
            </div>

            {/* Tabel 2: orders */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-neutral-500 block">2. File: database/migrations/xxxx_create_orders_table.php</span>
              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
                <pre><code>{`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();                                                                   // ID Transaksi Induk
            $table->string('customer_name');                                                // Nama Pembeli
            $table->string('table_number');                                                 // Nomor Meja
            $table->decimal('total_price', 12, 2)->default(0);                             // Total Tagihan Akhir
            $table->enum('status', ['Pending', 'Diproses', 'Selesai', 'Batal'])->default('Pending'); // Status
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};`}</code></pre>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                <strong>Penjelasan Kode:</strong> Kolom <code className="font-mono">total_price</code> diberi nilai default 0 saat order induk pertama kali di-create, sebelum di-update dengan akumulasi subtotal dari order details. Status pesanan menggunakan ENUM terstandardisasi TitleCase agar konsisten dengan controller dan view.
              </p>
            </div>

            {/* Tabel 3: order_details */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-neutral-500 block">3. File: database/migrations/xxxx_create_order_details_table.php</span>
              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
                <pre><code>{`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();

            // Relasi Foreign Key ke tabel orders (Cascade Delete)
            $table->foreignId('order_id')
                  ->constrained('orders')
                  ->onDelete('cascade');

            // Relasi Foreign Key ke tabel foods (Cascade Delete)
            $table->foreignId('food_id')
                  ->constrained('foods')
                  ->onDelete('cascade');

            $table->integer('quantity');             // Kuantitas porsi item
            $table->decimal('subtotal', 12, 2);      // price * quantity
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};`}</code></pre>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                <strong>Penjelasan Kode:</strong> <code className="font-mono">foreignId('order_id')-&gt;constrained('orders')-&gt;onDelete('cascade')</code> menciptakan constraint foreign key fisik di MySQL. Jika suatu pesanan dihapus, seluruh detail makanannya akan otomatis ikut terhapus bersih dari database.
              </p>
            </div>
          </div>

          {/* Step 6: Eksekusi Migrasi & Seeder */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 6: Seeder Makanan &amp; Akun Admin Bawaan Asesor
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Buat seeder dengan perintah <code className="font-mono">php artisan make:seeder FoodSeeder</code> lalu isi kode berikut:
            </p>

            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
              <div className="text-neutral-500 mb-2">// database/seeders/FoodSeeder.php</div>
              <pre><code>{`<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // WAJIB: Import DB facade

class FoodSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('foods')->insert([
            [
                'name'        => 'Nasi Goreng Spesial',
                'category'    => 'Makanan',
                'price'       => 25000,
                'description' => 'Nasi goreng dengan telur mata sapi dan ayam suwir.',
                'image'       => null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Mie Goreng Seafood',
                'category'    => 'Makanan',
                'price'       => 28000,
                'description' => 'Mie goreng pedas dengan udang dan cumi segar.',
                'image'       => null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Es Teh Manis',
                'category'    => 'Minuman',
                'price'       => 5000,
                'description' => 'Es teh melati segar manis alami.',
                'image'       => null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Jus Alpukat',
                'category'    => 'Minuman',
                'price'       => 15000,
                'description' => 'Jus alpukat murni dengan kental manis cokelat.',
                'image'       => null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => 'Kentang Goreng',
                'category'    => 'Cemilan',
                'price'       => 12000,
                'description' => 'Kentang goreng renyah saus keju gurih.',
                'image'       => null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}`}</code></pre>
            </div>

            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto leading-relaxed">
              <div className="text-neutral-500 mb-2">// database/seeders/DatabaseSeeder.php (Akun Admin Default)</div>
              <pre><code>{`<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // WAJIB: Hash password

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Admin Default Penguji LSP
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name'     => 'Admin Toko',
                'password' => Hash::make('password123'),
            ]
        );

        // 2. Panggil Seeder Makanan
        $this->call([
            FoodSeeder::class,
        ]);
    }
}`}</code></pre>
            </div>

            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Perintah Eksekusi Seeder:</strong>
              <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-sm">php artisan migrate:fresh --seed</div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Gunakan dua tanda strip <code className="font-mono">--seed</code>. Perintah ini membersihkan seluruh database, membuat 3 tabel dari nol, dan langsung mengisi 5 menu makanan serta akun admin (email: <code className="font-mono font-bold">admin@gmail.com</code> | password: <code className="font-mono font-bold">password123</code>) siap diuji di hadapan penguji.
              </p>
            </div>
          </div>

          {/* Step 7: Eloquent Model */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 7: Model Eloquent &amp; Aturan $guarded = ['id']
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Buka ketiga file model di <code className="font-mono">app/Models/</code> dan deklarasikan relasi serta aturan mass assignment:
            </p>

            <div className="space-y-3">
              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 leading-relaxed">
                <div className="text-neutral-500 mb-1">// app/Models/Food.php</div>
                <pre><code>{`class Food extends Model
{
    use HasFactory;
    protected $table = 'foods';
    protected $guarded = ['id'];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'food_id');
    }
}`}</code></pre>
              </div>

              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 leading-relaxed">
                <div className="text-neutral-500 mb-1">// app/Models/Order.php</div>
                <pre><code>{`class Order extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}`}</code></pre>
              </div>

              <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 leading-relaxed">
                <div className="text-neutral-500 mb-1">// app/Models/OrderDetail.php</div>
                <pre><code>{`class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'order_details';

    // WAJIB: guarded ['id'] membuka kolom 'subtotal' agar tidak terblokir
    protected $guarded = ['id'];

    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}`}</code></pre>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Penjelasan Penting $guarded = ['id']:</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Jika Anda menggunakan <code className="font-mono">$fillable = ['order_id', 'food_id', 'quantity']</code> namun lupa mendaftarkan kolom <code className="font-mono">'subtotal'</code>, Laravel akan membuang nilai subtotal secara diam-diam (*silent failure*). Akibatnya subtotal tersimpan Rp 0 di database. Menggunakan <code className="font-mono font-bold">protected $guarded = ['id'];</code> menjamin seluruh kolom aman tersimpan tanpa risiko terblokir mass assignment.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MODUL 2 */}
        {/* ========================================================================= */}
        <section id="modul2" className="space-y-8 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Bagian II &bull; Modul 2</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Modul 2: Autentikasi Admin Breeze, CRUD Master Makanan &amp; Tampilan Blade
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Modul ini membangun sistem login terproteksi untuk admin kasir, serta modul manajemen katalog makanan (Tambah, Lihat, Ubah, Hapus) dengan fitur upload foto dan penanganan file fisik di storage.
            </p>
          </div>

          {/* Breeze install */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 1: Instalasi Laravel Breeze &amp; Perintah Wajib Storage Link
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 leading-relaxed">
              <pre><code># 1. Pasang package Breeze
composer require laravel/breeze --dev

# 2. Generator scaffolding
php artisan breeze:install
# Pilihan: stack: blade, dark mode: no, testing: 0 (PHPUnit)

# 3. Urutan perintah wajib sesudah instalasi:
php artisan migrate
php artisan storage:link
npm install
npm run build</code></pre>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Mengapa php artisan storage:link Sangat Krusial?</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                File foto menu makanan diunggah ke folder privat <code className="font-mono">storage/app/public/foods/</code>. Folder ini tidak boleh diakses langsung oleh browser publik demi keamanan. Perintah <code className="font-mono font-bold">php artisan storage:link</code> menciptakan pintasan simbolik (*symlink*) dari <code className="font-mono">public/storage</code> ke folder privat tersebut. Tanpa symlink ini, seluruh gambar menu yang diunggah akan rusak / 404 saat dibuka lewat browser!
              </p>
            </div>
          </div>

          {/* FoodController */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 2: Kode Utuh FoodController.php (CRUD 7 Resource Action)
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 overflow-hidden">
              <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-neutral-400 flex justify-between items-center">
                <span>app/Http/Controllers/FoodController.php</span>
                <button 
                  onClick={() => copyToClipboard(`<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FoodController extends Controller
{
    public function index()
    {
        $foods = Food::latest()->paginate(10);
        return view('admin.foods.index', compact('foods'));
    }

    public function create()
    {
        return view('admin.foods.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|in:Makanan,Minuman,Cemilan',
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('foods', 'public');
        }

        Food::create([
            'name'        => $request->name,
            'category'    => $request->category,
            'price'       => $request->price,
            'description' => $request->description,
            'image'       => $imagePath,
        ]);

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil ditambahkan!');
    }

    public function edit(Food $food)
    {
        return view('admin.foods.edit', compact('food'));
    }

    public function update(Request $request, Food $food)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|in:Makanan,Minuman,Cemilan',
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = $food->image;
        if ($request->hasFile('image')) {
            if ($food->image && Storage::disk('public')->exists($food->image)) {
                Storage::disk('public')-&gt;delete($food->image);
            }
            $imagePath = $request->file('image')->store('foods', 'public');
        }

        $food->update([
            'name'        => $request->name,
            'category'    => $request->category,
            'price'       => $request->price,
            'description' => $request->description,
            'image'       => $imagePath,
        ]);

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil diperbarui!');
    }

    public function destroy(Food $food)
    {
        if ($food->image && Storage::disk('public')->exists($food->image)) {
            Storage::disk('public')-&gt;delete($food->image);
        }
        $food->delete();

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil dihapus!');
    }
}`, 'food_ctrl_m2')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === 'food_ctrl_m2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'food_ctrl_m2' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed max-h-[350px] overflow-y-auto"><code>{`<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // WAJIB untuk manipulasi file foto di disk

class FoodController extends Controller
{
    public function index()
    {
        $foods = Food::latest()->paginate(10);
        return view('admin.foods.index', compact('foods'));
    }

    public function create()
    {
        return view('admin.foods.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|in:Makanan,Minuman,Cemilan',
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('foods', 'public');
        }

        Food::create([
            'name'        => $request->name,
            'category'    => $request->category,
            'price'       => $request->price,
            'description' => $request->description,
            'image'       => $imagePath,
        ]);

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil ditambahkan!');
    }

    public function edit(Food $food)
    {
        return view('admin.foods.edit', compact('food'));
    }

    public function update(Request $request, Food $food)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|in:Makanan,Minuman,Cemilan',
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = $food->image;
        if ($request->hasFile('image')) {
            // Hapus gambar lama agar tidak meninggalkan file sampah di server
            if ($food->image && Storage::disk('public')->exists($food->image)) {
                Storage::disk('public')-&gt;delete($food->image);
            }
            $imagePath = $request->file('image')->store('foods', 'public');
        }

        $food->update([
            'name'        => $request->name,
            'category'    => $request->category,
            'price'       => $request->price,
            'description' => $request->description,
            'image'       => $imagePath,
        ]);

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil diperbarui!');
    }

    public function destroy(Food $food)
    {
        if ($food->image && Storage::disk('public')->exists($food->image)) {
            Storage::disk('public')-&gt;delete($food->image);
        }
        $food->delete();

        return redirect()->route('foods.index')->with('success', 'Data makanan berhasil dihapus!');
    }
}`}</code></pre>
            </div>
          </div>

          {/* 3 Blade Views */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 3: Tiga Berkas Tampilan Blade Admin (index, create, edit)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Buat folder <code className="font-mono">resources/views/admin/foods/</code> dan buat ketiga berkas berikut:
            </p>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-950 text-neutral-200">
              <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTabBlade('index')}
                    className={`px-2.5 py-1 rounded transition ${activeTabBlade === 'index' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    index.blade.php
                  </button>
                  <button 
                    onClick={() => setActiveTabBlade('create')}
                    className={`px-2.5 py-1 rounded transition ${activeTabBlade === 'create' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    create.blade.php
                  </button>
                  <button 
                    onClick={() => setActiveTabBlade('edit')}
                    className={`px-2.5 py-1 rounded transition ${activeTabBlade === 'edit' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    edit.blade.php
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[350px] overflow-y-auto">
                {activeTabBlade === 'index' && (
                  <pre><code>{`<!-- resources/views/admin/foods/index.blade.php -->
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Master Data Makanan</h2>
    </x-slot>

    <div class="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <a href="{{ route('foods.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 inline-block font-semibold">
            + Tambah Makanan
        </a>

        @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">{{ session('success') }}</div>
        @endif

        <table class="w-full bg-white border mt-4 shadow-sm rounded-lg overflow-hidden">
            <thead>
                <tr class="bg-gray-100 border-b text-gray-600 text-sm">
                    <th class="p-3">Gambar</th>
                    <th class="p-3">Nama</th>
                    <th class="p-3">Kategori</th>
                    <th class="p-3">Harga</th>
                    <th class="p-3">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($foods as $food)
                <tr class="border-b text-center text-sm">
                    <td class="p-3">
                        @if($food->image)
                            <img src="{{ asset('storage/' . $food->image) }}" class="w-16 h-16 object-cover mx-auto rounded">
                        @else
                            <span class="text-gray-400 text-xs">No Image</span>
                        @endif
                    </td>
                    <td class="p-3 font-semibold">{{ $food->name }}</td>
                    <td class="p-3">{{ $food->category }}</td>
                    <td class="p-3 font-bold text-green-600">Rp {{ number_format($food->price) }}</td>
                    <td class="p-3">
                        <a href="{{ route('foods.edit', $food->id) }}" class="text-blue-600 hover:underline mr-3 font-semibold">Edit</a>
                        <form action="{{ route('foods.destroy', $food->id) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Yakin hapus data ini?')" class="text-red-600 hover:underline font-semibold">Hapus</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4">{{ $foods->links() }}</div>
    </div>
</x-app-layout>`}</code></pre>
                )}

                {activeTabBlade === 'create' && (
                  <pre><code>{`<!-- resources/views/admin/foods/create.blade.php -->
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Tambah Makanan</h2>
    </x-slot>

    <div class="py-12 max-w-2xl mx-auto sm:px-6 lg:px-8">
        <!-- WAJIB: enctype="multipart/form-data" agar file foto dapat terkirim -->
        <form action="{{ route('foods.store') }}" method="POST" enctype="multipart/form-data" class="bg-white p-6 rounded-lg shadow-sm border">
            @csrf
            <div class="mb-4">
                <label class="block font-medium mb-1">Nama Makanan</label>
                <!-- Gunakan old('name') agar data tidak terhapus saat validasi gagal -->
                <input type="text" name="name" value="{{ old('name') }}" class="w-full border rounded p-2" required>
                @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Kategori</label>
                <select name="category" class="w-full border rounded p-2" required>
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Cemilan">Cemilan</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Harga (Rp)</label>
                <input type="number" name="price" value="{{ old('price') }}" class="w-full border rounded p-2" required>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Deskripsi</label>
                <textarea name="description" class="w-full border rounded p-2" rows="3" required>{{ old('description') }}</textarea>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Gambar Makanan</label>
                <input type="file" name="image" class="w-full border rounded p-2">
            </div>
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded font-semibold">Simpan Data</button>
        </form>
    </div>
</x-app-layout>`}</code></pre>
                )}

                {activeTabBlade === 'edit' && (
                  <pre><code>{`<!-- resources/views/admin/foods/edit.blade.php -->
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit Makanan</h2>
    </x-slot>

    <div class="py-12 max-w-2xl mx-auto sm:px-6 lg:px-8">
        <form action="{{ route('foods.update', $food->id) }}" method="POST" enctype="multipart/form-data" class="bg-white p-6 rounded-lg shadow-sm border">
            @csrf
            @method('PUT') <!-- Method spoofing untuk HTTP PUT -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Nama Makanan</label>
                <input type="text" name="name" value="{{ $food->name }}" class="w-full border rounded p-2" required>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Kategori</label>
                <select name="category" class="w-full border rounded p-2" required>
                    <option value="Makanan" {{ $food->category == 'Makanan' ? 'selected' : '' }}>Makanan</option>
                    <option value="Minuman" {{ $food->category == 'Minuman' ? 'selected' : '' }}>Minuman</option>
                    <option value="Cemilan" {{ $food->category == 'Cemilan' ? 'selected' : '' }}>Cemilan</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Harga (Rp)</label>
                <input type="number" name="price" value="{{ $food->price }}" class="w-full border rounded p-2" required>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Deskripsi</label>
                <textarea name="description" class="w-full border rounded p-2" rows="3" required>{{ $food->description }}</textarea>
            </div>
            <div class="mb-4">
                <label class="block font-medium mb-1">Gambar Baru (Opsional)</label>
                @if($food->image)
                    <div class="mb-2">
                        <img src="{{ asset('storage/' . $food->image) }}" class="w-20 h-20 object-cover rounded border">
                        <span class="text-xs text-gray-400">Gambar saat ini</span>
                    </div>
                @endif
                <input type="file" name="image" class="w-full border rounded p-2">
            </div>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-semibold">Update Data</button>
        </form>
    </div>
</x-app-layout>`}</code></pre>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MODUL 3 */}
        {/* ========================================================================= */}
        <section id="modul3" className="space-y-8 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Bagian III &bull; Modul 3</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Modul 3: Sisi Pelanggan, Katalog Interaktif &amp; Transaksi DB Atomik
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Modul ini mengatur halaman publik restoran: pelanggan memilih menu melalui tombol stepper (+/-), memfilter kategori, meninjau ringkasan di modal pop-up, lalu men-checkout pesanan secara aman menggunakan transaksi basis data.
            </p>
          </div>

          {/* OrderController store method */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 1: Controller Pemesanan &amp; Logika DB::transaction
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[350px] overflow-y-auto leading-relaxed">
              <div className="text-neutral-500 mb-2">// app/Http/Controllers/OrderController.php (Sisi Customer)</div>
              <pre><code>{`<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // WAJIB: Facade DB untuk Transaksi

class OrderController extends Controller
{
    public function index()
    {
        $foods = Food::all();
        return view('customer.index', compact('foods'));
    }

    public function store(Request $request)
    {
        // 1. Validasi input nama, nomor meja, dan array items
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'table_number'  => 'required|integer|min:1',
            'items'         => 'required|array',
            'items.*'       => 'nullable|integer|min:0',
        ]);

        // 2. Filter item: Hanya ambil makanan yang jumlah porsinya > 0
        $orderedItems = array_filter($request->items, fn ($qty) => $qty > 0);

        // 3. Batalkan jika pelanggan tidak memilih menu sama sekali
        if (empty($orderedItems)) {
            return back()->with('error', 'Pilih minimal satu menu makanan!');
        }

        // 4. Buka Transaksi Database Atomik
        DB::beginTransaction();
        try {
            // Buat baris pesanan induk
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'table_number'  => $request->table_number,
                'total_price'   => 0,
                'status'        => 'Pending',
            ]);

            $totalPrice = 0;

            // Loop setiap item yang dipesan
            foreach ($orderedItems as $foodId => $quantity) {
                $food = Food::findOrFail($foodId);
                $subtotal = $food->price * $quantity;
                $totalPrice += $subtotal;

                // Simpan rincian ke order_details
                OrderDetail::create([
                    'order_id' => $order->id,
                    'food_id'  => $food->id,
                    'quantity' => $quantity,
                    'subtotal' => $subtotal, // Subtotal disimpan permanen
                ]);
            }

            // Perbarui total akhir pesanan induk
            $order->update(['total_price' => $totalPrice]);

            // Kunci perubahan permanen ke MySQL
            DB::commit();

            return redirect()->route('customer.index')
                ->with('success', 'Pesanan berhasil dibuat! Nomor Meja: ' . $order->table_number);
        } catch (\Exception $e) {
            // Jika terjadi error sekecil apapun, batalkan seluruh perubahan
            DB::rollBack();
            return back()->with('error', 'Gagal memproses pesanan: ' . $e->getMessage());
        }
    }
}`}</code></pre>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs space-y-1.5">
              <strong className="text-neutral-900 dark:text-neutral-100 block">Penjelasan Kunci Transaksi DB:</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pemesanan melibatkan penulisan ke 2 tabel berbeda: <code className="font-mono">orders</code> dan <code className="font-mono">order_details</code>. Jika di tengah-tengah loop salah satu menu ternyata sudah dihapus atau server kehabisan memori, <code className="font-mono font-bold">DB::rollBack()</code> akan menghapus kembali baris order induk yang baru saja dibuat. Data Anda tetap bersih tanpa baris transaksi bodong.
              </p>
            </div>
          </div>

          {/* Customer Blade view */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 2: Tampilan Katalog Pelanggan (resources/views/customer/index.blade.php)
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[350px] overflow-y-auto leading-relaxed">
              <pre><code>{`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu Restoran</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6 font-sans">
    <div class="max-w-5xl mx-auto">
        <div class="text-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Menu Restoran</h1>
            <p class="text-gray-500 text-sm mt-1">Pilih menu makanan dan masukkan nomor meja Anda</p>
        </div>

        @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 text-center font-semibold">{{ session('success') }}</div>
        @endif

        @if(session('error'))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center font-semibold">{{ session('error') }}</div>
        @endif

        <!-- FILTER KATEGORI -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
            <button type="button" onclick="filterCategory('all', this)" class="btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-blue-600 text-white shadow-md">Semua Menu</button>
            <button type="button" onclick="filterCategory('Makanan', this)" class="btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-white text-gray-600 hover:bg-gray-200 border">Makanan</button>
            <button type="button" onclick="filterCategory('Minuman', this)" class="btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-white text-gray-600 hover:bg-gray-200 border">Minuman</button>
            <button type="button" onclick="filterCategory('Cemilan', this)" class="btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-white text-gray-600 hover:bg-gray-200 border">Cemilan</button>
        </div>

        <form id="orderForm" action="{{ route('customer.checkout') }}" method="POST">
            @csrf
            <!-- 1. Identitas Pemesan -->
            <div class="bg-white p-6 rounded-xl shadow-sm border mb-6">
                <h2 class="text-lg font-bold text-gray-700 mb-4 pb-2 border-b">1. Informasi Pemesan</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-600 mb-1">Nama Lengkap</label>
                        <input type="text" id="customer_name" name="customer_name" required placeholder="Nama pemesan" class="w-full border rounded-lg px-4 py-2">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-600 mb-1">Nomor Meja</label>
                        <input type="number" id="table_number" name="table_number" required placeholder="Nomor meja" class="w-full border rounded-lg px-4 py-2">
                    </div>
                </div>
            </div>

            <!-- 2. Katalog Makanan -->
            <h2 class="text-lg font-bold text-gray-700 mb-4">2. Pilih Menu</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach($foods as $food)
                    <div class="food-card bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between" data-category="{{ $food->category }}">
                        <div>
                            @if($food->image)
                                <img src="{{ asset('storage/' . $food->image) }}" class="w-full h-40 object-cover">
                            @else
                                <div class="bg-gray-200 h-40 flex items-center justify-center text-gray-400 font-medium">Tanpa Gambar</div>
                            @endif
                            <div class="p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">{{ $food->category }}</span>
                                    <span class="font-bold text-green-600">Rp {{ number_format($food->price) }}</span>
                                </div>
                                <h3 class="font-bold text-gray-800 text-lg">{{ $food->name }}</h3>
                                <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ $food->description }}</p>
                            </div>
                        </div>
                        <div class="p-4 bg-gray-50 border-t">
                            <label class="block text-xs font-semibold text-gray-500 mb-1">Jumlah Porsi</label>
                            <input type="number" name="items[{{ $food->id }}]" min="0" value="0" data-name="{{ $food->name }}" data-price="{{ $food->price }}" class="item-qty w-full border rounded-lg px-3 py-1.5 text-center font-bold">
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-8 text-right">
                <button type="button" onclick="showConfirmationModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition">
                    Pesan Sekarang
                </button>
            </div>

            <!-- MODAL KONFIRMASI (DI DALAM FORM) -->
            <div id="confirmModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                    <h3 class="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Konfirmasi Pesanan</h3>
                    <div class="space-y-2 text-sm text-gray-600 mb-4">
                        <div class="flex justify-between"><span>Nama:</span> <span id="modalName" class="font-bold text-gray-900"></span></div>
                        <div class="flex justify-between"><span>No. Meja:</span> <span id="modalTable" class="font-bold text-gray-900"></span></div>
                    </div>
                    <div class="border-t border-b py-3 mb-4 max-h-48 overflow-y-auto">
                        <ul id="modalItemList" class="space-y-2 text-sm"></ul>
                    </div>
                    <div class="flex justify-between items-center text-lg font-bold text-gray-800 mb-6">
                        <span>Total:</span>
                        <span id="modalTotalPrice" class="text-green-600 text-xl">Rp 0</span>
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="closeConfirmationModal()" class="w-1/2 bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl">Batal</button>
                        <button type="submit" class="w-1/2 bg-green-600 text-white font-bold py-2.5 rounded-xl shadow">Ya, Kirim Pesanan</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script>
        function filterCategory(category, element) {
            document.querySelectorAll('.btn-category').forEach(btn => {
                btn.className = "btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-white text-gray-600 hover:bg-gray-200 border";
            });
            element.className = "btn-category px-5 py-2 rounded-full font-semibold text-sm transition bg-blue-600 text-white shadow-md";
            document.querySelectorAll('.food-card').forEach(card => {
                const cardCat = card.getAttribute('data-category');
                card.style.display = (category === 'all' || cardCat === category) ? 'flex' : 'none';
            });
        }

        function showConfirmationModal() {
            const name = document.getElementById('customer_name').value.trim();
            const table = document.getElementById('table_number').value.trim();
            if (!name || !table) {
                alert('Silakan isi Nama Lengkap dan Nomor Meja!');
                return;
            }
            let listHtml = '', grandTotal = 0, hasOrder = false;
            document.querySelectorAll('.item-qty').forEach(input => {
                const qty = parseInt(input.value) || 0;
                if (qty > 0) {
                    hasOrder = true;
                    const price = parseFloat(input.getAttribute('data-price'));
                    const subtotal = qty * price;
                    grandTotal += subtotal;
                    listHtml += '<li class="flex justify-between"><span>' + input.getAttribute('data-name') + ' x' + qty + '</span><span class="font-bold">Rp ' + subtotal.toLocaleString('id-ID') + '</span></li>';
                }
            });
            if (!hasOrder) {
                alert('Pilih minimal 1 menu makanan/minuman!');
                return;
            }
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalTable').textContent = table;
            document.getElementById('modalItemList').innerHTML = listHtml;
            document.getElementById('modalTotalPrice').textContent = 'Rp ' + grandTotal.toLocaleString('id-ID');
            document.getElementById('confirmModal').classList.remove('hidden');
            document.getElementById('confirmModal').classList.add('flex');
        }

        function closeConfirmationModal() {
            document.getElementById('confirmModal').classList.remove('flex');
            document.getElementById('confirmModal').classList.add('hidden');
        }
    </script>
</body>
</html>`}</code></pre>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MODUL 4 */}
        {/* ========================================================================= */}
        <section id="modul4" className="space-y-8 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Bagian IV &bull; Modul 4</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Modul 4: Sisi Admin, Monitoring Pesanan Masuk &amp; Update Status Otomatis
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Modul ini menangani dashboard kasir untuk melihat pesanan yang masuk secara real-time, menerapkan teknik Eager Loading untuk mencegah N+1 query problem, dan mengubah status pesanan secara instan via HTTP PATCH.
            </p>
          </div>

          {/* Eager Loading & Dashboard code */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 1: Dashboard Monitoring (resources/views/dashboard.blade.php)
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[350px] overflow-y-auto leading-relaxed">
              <pre><code>{`<!-- resources/views/dashboard.blade.php -->
<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Daftar Pesanan Masuk') }}
            </h2>
            <div class="flex items-center gap-3">
                <a href="{{ route('foods.index') }}" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-xs uppercase">
                    Kelola Menu
                </a>
                <a href="{{ route('customer.index') }}" target="_blank" class="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md font-semibold text-xs uppercase">
                    Lihat Menu Customer
                </a>
            </div>
        </div>
    </x-slot>

    <div class="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        @if(session('success'))
            <div class="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                {{ session('success') }}
            </div>
        @endif

        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 p-6">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th class="p-4 border-b"># ID</th>
                        <th class="p-4 border-b">Pelanggan</th>
                        <th class="p-4 border-b">No. Meja</th>
                        <th class="p-4 border-b">Rincian Pesanan</th>
                        <th class="p-4 border-b">Total Harga</th>
                        <th class="p-4 border-b">Status</th>
                        <th class="p-4 border-b text-center">Aksi Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y text-sm">
                    @forelse($orders as $order)
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 font-bold">#{{ $order->id }}</td>
                            <td class="p-4 font-medium">{{ $order->customer_name }}</td>
                            <td class="p-4">
                                <span class="bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full text-xs">
                                    Meja {{ $order->table_number }}
                                </span>
                            </td>
                            <td class="p-4">
                                <ul class="list-disc list-inside space-y-1 text-gray-600">
                                    @foreach($order->orderDetails as $detail)
                                        <li>
                                            <strong>{{ $detail->food->name ?? 'Menu Terhapus' }}</strong> 
                                            x{{ $detail->quantity }} 
                                            <span class="text-xs text-gray-400">(Rp {{ number_format($detail->subtotal) }})</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </td>
                            <td class="p-4 font-bold text-green-600">
                                Rp {{ number_format($order->total_price) }}
                            </td>
                            <td class="p-4">
                                @if(strtolower($order->status) == 'pending')
                                    <span class="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded">PENDING</span>
                                @elseif(strtolower($order->status) == 'selesai' || strtolower($order->status) == 'completed')
                                    <span class="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">SELESAI</span>
                                @else
                                    <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded">{{ strtoupper($order->status) }}</span>
                                @endif
                            </td>
                            <td class="p-4 text-center">
                                <form action="{{ route('admin.orders.updateStatus', $order->id) }}" method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <select name="status" onchange="this.form.submit()" class="text-xs border rounded p-1.5 bg-white font-semibold">
                                        <option value="Pending" {{ $order->status == 'Pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="Diproses" {{ $order->status == 'Diproses' ? 'selected' : '' }}>Diproses</option>
                                        <option value="Selesai" {{ $order->status == 'Selesai' ? 'selected' : '' }}>Selesai</option>
                                        <option value="Batal" {{ $order->status == 'Batal' ? 'selected' : '' }}>Batalkan</option>
                                    </select>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="p-6 text-center text-gray-400">Belum ada pesanan masuk.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>`}</code></pre>
            </div>
          </div>

          {/* Unified web.php */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
              Langkah 2: File Routing Terpadu Lengkap (routes/web.php)
            </h3>
            <div className="rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 p-4 overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed">
              <pre><code>{`<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// 1. Sisi Customer (Publik)
Route::get('/', [OrderController::class, 'index'])->name('customer.index');
Route::post('/checkout', [OrderController::class, 'store'])->name('customer.checkout');

// 2. Dashboard Monitoring Kasir (Wajib Login Breeze)
Route::get('/dashboard', [OrderController::class, 'adminDashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// 3. Grup Admin Terproteksi (Wajib Login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Update Status Pesanan Kasir (PATCH)
    Route::patch('/admin/orders/{id}/status', [OrderController::class, 'updateStatus'])
        ->name('admin.orders.updateStatus');

    // CRUD Master Makanan (Resource Controller)
    Route::resource('/admin/foods', FoodController::class);
});

require __DIR__.'/auth.php';`}</code></pre>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BEDAH 5 BUG FATAL MODUL */}
        {/* ========================================================================= */}
        <section id="bedah-bug" className="space-y-6 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">Forensic Audit</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Bedah 5 Cacat Kritis Modul Sekolah Asli &amp; Perbaikan Zero-Error
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Banyak siswa bingung mengapa aplikasi mereka error saat ujian padahal mengikuti modul. Berikut 5 bug nyata pada modul asli beserta solusinya:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-1.5 text-xs">
              <strong className="text-rose-600 dark:text-rose-400 font-mono text-sm block">1. Discrepancy ENUM Status (Fatal SQLSTATE[01000])</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Migration memakai <code className="font-mono">['Pending', 'Diproses', 'Selesai']</code>, tapi controller menyimpan <code className="font-mono">'pending'</code> dan view mengirim <code className="font-mono">"completed"</code>. MySQL mode strict akan menolak nilai asing ini dan melempar fatal error data truncated.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <strong>Solusi:</strong> Samakan seluruh ENUM menjadi <code className="font-mono">['Pending', 'Diproses', 'Selesai', 'Batal']</code> di migration, controller validasi, dan option select Blade.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-1.5 text-xs">
              <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm block">2. Form Reset Tanpa old() Helper</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Form create/edit makanan di Modul 2 tidak menyertakan <code className="font-mono">value="&#123;&#123; old('name') &#125;&#125;"</code>. Jika validasi gagal (misal ukuran foto &gt; 2MB), form me-refresh dan semua teks yang sudah diketik hilang.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <strong>Solusi:</strong> Tambahkan <code className="font-mono">value="&#123;&#123; old('name') &#125;&#125;"</code> dan tampilkan pesan kesalahan via <code className="font-mono">@error('name')</code>.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-1.5 text-xs">
              <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm block">3. Mass Assignment Silent Dropout pada Subtotal</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Jika siswa memakai <code className="font-mono">$fillable</code> di OrderDetail dan lupa menuliskan <code className="font-mono">'subtotal'</code>, Laravel akan membuang nilai subtotal diam-diam tanpa exception, membuat subtotal tersimpan Rp 0.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <strong>Solusi:</strong> Deklarasikan <code className="font-mono">protected $guarded = ['id'];</code> pada OrderDetail agar kolom subtotal terisi aman.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-1.5 text-xs">
              <strong className="text-rose-600 dark:text-rose-400 font-mono text-sm block">4. Penghapusan Riwayat Transaksi Akibat Cascade</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Menghapus menu makanan di admin akan menghapus seluruh data belanjaan lampau di <code className="font-mono">order_details</code> karena <code className="font-mono">onDelete('cascade')</code>, merusak pembukuan kasir.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <strong>Solusi:</strong> Di view dashboard gunakan operator null-safe: <code className="font-mono">&#123;&#123; $detail-&gt;food-&gt;name ?? 'Menu Terhapus' &#125;&#125;</code>.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-1.5 text-xs">
              <strong className="text-sky-600 dark:text-sky-400 font-mono text-sm block">5. Penumpukan File Sampah di Storage</strong>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Modul 2 tidak menyertakan pembersihan file fisik lama saat gambar di-update atau menu dihapus.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <strong>Solusi:</strong> Gunakan <code className="font-mono">Storage::disk('public')-&gt;delete($food-&gt;image)</code> pada method <code className="font-mono">update()</code> dan <code className="font-mono">destroy()</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FLASHCARDS & CHECKLIST */}
        {/* ========================================================================= */}
        <section id="flashcards" className="space-y-6 scroll-mt-20 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Hafalan Cepat</span>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight">
              Flashcard Hafalan Terminal &amp; 8 Checklist Pengujian Asesor LSP
            </h2>
            <p className="text-[16px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
              Uji daya ingat perintah terminal sebelum ujian dimulai dengan kartu interaktif:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'f1', q: 'Perintah buat Model Food + Migration + Resource Controller?', a: 'php artisan make:model Food -mcr' },
              { id: 'f2', q: 'Perintah reset ulang database bersih + jalankan seeder?', a: 'php artisan migrate:fresh --seed' },
              { id: 'f3', q: 'Perintah agar foto upload muncul di web browser?', a: 'php artisan storage:link' },
              { id: 'f4', q: 'Sintaks query Eager Loading hilangkan masalah N+1?', a: "Order::with('orderDetails.food')->latest()->get();" },
            ].map(card => {
              const isFlipped = flippedCards[card.id];
              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition select-none min-h-[115px] flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {isFlipped ? 'Jawaban (Klik untuk sembunyikan)' : 'Pertanyaan (Klik untuk lihat)'}
                  </span>
                  <div className="my-1.5">
                    {isFlipped ? (
                      <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{card.a}</p>
                    ) : (
                      <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{card.q}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono text-right">
                    {isFlipped ? 'Sembunyikan' : 'Buka Kunci'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Checklist Asesor */}
          <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3 mt-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono font-semibold uppercase text-neutral-500">
                Checklist Uji Mandiri Asesor (8 Poin Pengujian)
              </span>
              <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                {checkedCount} / 8 Poin Terpenuhi
              </span>
            </div>

            {[
              { id: 'c1', text: '1. XAMPP Apache dan MySQL aktif normal pada port 3306 tanpa crash.' },
              { id: 'c2', text: '2. php artisan migrate:fresh --seed sukses menghasilkan 3 tabel, 1 akun admin, dan 5 menu makanan.' },
              { id: 'c3', text: '3. php artisan storage:link aktif dan gambar muncul sempurna di tabel admin serta katalog publik.' },
              { id: 'c4', text: '4. Login admin berhasil menggunakan admin@gmail.com dan password123.' },
              { id: 'c5', text: '5. CRUD makanan admin berhasil tambah, edit, ganti foto, dan hapus tanpa orphan file.' },
              { id: 'c6', text: '6. Sisi customer (/) dapat memfilter kategori dan menghitung kuantitas stepper secara real-time.' },
              { id: 'c7', text: '7. Modal konfirmasi pesanan menampilkan ringkasan meja dan tombol submit menyimpan transaksi via DB::transaction.' },
              { id: 'c8', text: '8. Dashboard kasir (/dashboard) langsung menampilkan pesanan baru dengan Eager Loading tanpa N+1 query.' },
            ].map(item => (
              <label 
                key={item.id} 
                className="flex items-start gap-3 p-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition text-xs text-neutral-700 dark:text-neutral-300"
              >
                <input 
                  type="checkbox" 
                  checked={checklist[item.id] || false}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-0.5 rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-0"
                />
                <span className={checklist[item.id] ? 'line-through text-neutral-400' : ''}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Colophon */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 font-mono space-y-1">
          <p>Disusun untuk persiapan Uji Kompetensi Keahlian (UKK) &amp; Sertifikasi Kompetensi LSP RPL.</p>
          <p>100% Zero-Error &bull; Desain Editorial Minimalis Internasional &bull; Live di serkom.barrydev.icu</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-8 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-[760px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Bari Achmad &bull; SMKN 6 Tangsel</span>
          <div className="flex items-center gap-4">
            <a href="https://barrydev.icu" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">Portfolio</a>
            <a href="https://github.com/lordbarry21" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">GitHub</a>
            <a href="https://github.com/lordbarry21/serkom-laravel-kuliner" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">Repo Laravel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

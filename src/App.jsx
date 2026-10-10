import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Copy, Check, Terminal, Database, ShieldAlert, 
  CheckCircle2, ArrowUpRight, BookOpen, Layers, CornerDownRight, RotateCcw
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('controller');
  const [activeBug, setActiveBug] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [checklist, setChecklist] = useState({
    c1: false, c2: false, c3: false, c4: false, c5: false, c6: false, c7: false
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    try {
      const savedCheck = localStorage.getItem('serkom_checklist_state');
      if (savedCheck) setChecklist(JSON.parse(savedCheck));
    } catch (e) {}

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
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
      localStorage.setItem('serkom_checklist_state', JSON.stringify(updated));
    } catch (e) {}
  };

  const toggleCardFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const codeSnippets = {
    controller: {
      title: 'app/Http/Controllers/OrderController.php',
      code: `public function store(Request $request): RedirectResponse
{
    $request->validate([
        'customer_name' => 'required|string|max:255',
        'table_number'  => 'required|string|max:50',
        'items'         => 'required|array',
    ]);

    $orderedItems = array_filter($request->items, fn ($qty) => (int)$qty > 0);
    if (empty($orderedItems)) {
        return back()->with('error', 'Select at least one food or drink item.');
    }

    DB::beginTransaction();
    try {
        $order = Order::create([
            'customer_name' => $request->customer_name,
            'table_number'  => $request->table_number,
            'total_price'   => 0,
            'status'        => 'Pending',
        ]);

        $totalPrice = 0;
        foreach ($orderedItems as $foodId => $quantity) {
            $food = Food::findOrFail($foodId);
            $subtotal = $food->price * (int)$quantity;
            $totalPrice += $subtotal;

            OrderDetail::create([
                'order_id' => $order->id,
                'food_id'  => $food->id,
                'quantity' => (int)$quantity,
                'subtotal' => $subtotal,
            ]);
        }

        $order->update(['total_price' => $totalPrice]);
        DB::commit();

        return redirect()->route('customer.index')
            ->with('success', "Order #{$order->id} placed for Table {$order->table_number}.");
    } catch (\\Throwable $e) {
        DB::rollBack();
        return back()->with('error', 'Transaction aborted: ' . $e->getMessage());
    }
}`
    },
    migration: {
      title: 'database/migrations/xxxx_create_order_details_table.php',
      code: `Schema::create('order_details', function (Blueprint $table) {
    $table->id();

    // Cascading foreign keys maintaining referential integrity
    $table->foreignId('order_id')
          ->constrained('orders')
          ->onDelete('cascade');

    $table->foreignId('food_id')
          ->constrained('foods')
          ->onDelete('cascade');

    $table->integer('quantity');
    $table->decimal('subtotal', 12, 2);
    $table->timestamps();
});`
    },
    model: {
      title: 'app/Models/OrderDetail.php',
      code: `class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'order_details';

    // Guarding only primary key prevents mass assignment blocking on subtotal
    protected $guarded = ['id'];

    public function food(): BelongsTo
    {
        return $this->belongsTo(Food::class, 'food_id');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}`
    }
  };

  const bugList = [
    {
      title: "1. ENUM Value Discrepancy",
      severity: "Fatal Crash",
      desc: "Migration defined status as TitleCase ('Pending', 'Diproses', 'Selesai'), while the controller stored lowercase 'pending', and the Blade dropdown submitted English terms ('completed', 'cancelled').",
      consequence: "Under MySQL strict mode, inserting an undeclared ENUM value throws a fatal SQLSTATE[01000]: Data truncated error.",
      solution: "Standardize status across migration, validation rules (in:Pending,Diproses,Selesai,Batal), and Blade select options."
    },
    {
      title: "2. Form State Amnesia on Validation Error",
      severity: "UX Defect",
      desc: "Form input fields in create.blade.php omitted the old() helper function.",
      consequence: "When file upload failed (e.g., file size > 2MB), the page reloaded and wiped every description and name the student typed.",
      solution: "Always bind values with value=\"{{ old('name') }}\" and display scoped field errors using @error('name')."
    },
    {
      title: "3. Mass Assignment Silent Dropout",
      severity: "Financial Data Loss",
      desc: "Switching from $guarded to $fillable on OrderDetail while omitting 'subtotal'.",
      consequence: "Laravel silently discards non-fillable attributes without throwing exceptions, saving transaction totals as 0.",
      solution: "Declare protected $guarded = ['id']; to whitelist all transactional attributes automatically."
    },
    {
      title: "4. Historical Ledger Cascade Corruption",
      severity: "Audit Failure",
      desc: "Deleting a menu item purged all historical receipts referencing that item due to onDelete('cascade').",
      consequence: "Cashiers lost past order history and financial reports became inconsistent.",
      solution: "In dashboard views, use null-safe accessors like $detail->food->name ?? 'Archived Menu Item' to preserve ledger records."
    },
    {
      title: "5. Storage Disk Orphan File Leaks",
      severity: "Server Storage Leak",
      desc: "Updating a photo or deleting a food item never removed previous files from storage/app/public/foods.",
      consequence: "Hundreds of orphan image assets remain on disk permanently.",
      solution: "Invoke Storage::disk('public')->delete($food->image) upon update and destroy actions."
    }
  ];

  const flashcards = [
    {
      id: 'f1',
      q: 'Artisan shorthand for Model, Migration, and Resource Controller?',
      a: 'php artisan make:model Food -mcr'
    },
    {
      id: 'f2',
      q: 'Reset database tables completely and seed default records?',
      a: 'php artisan migrate:fresh --seed'
    },
    {
      id: 'f3',
      q: 'Command to expose uploaded assets to public HTTP requests?',
      a: 'php artisan storage:link'
    },
    {
      id: 'f4',
      q: 'Eloquent eager-loading query syntax to prevent N+1 queries?',
      a: "Order::with('orderDetails.food')->latest()->get();"
    }
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 1px Whisper Reading Progress */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-neutral-900 dark:bg-neutral-100 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Minimal Header */}
      <header className="border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 z-40 bg-[#fafaf9]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-[720px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <a href="#" className="font-serif text-lg tracking-tight font-medium hover:opacity-70 transition">
              Bari Achmad
            </a>
            <span className="text-neutral-400 dark:text-neutral-600 text-xs font-mono">/</span>
            <span className="text-xs text-neutral-500 font-mono tracking-wide uppercase">Engineering Notes</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/lordbarry21/serkom-laravel-kuliner" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition flex items-center gap-1"
            >
              <span>Repository</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 transition"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Container */}
      <main className="max-w-[720px] mx-auto px-6 py-16 flex-1 w-full">
        
        {/* Meta & Title */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>October 2026</span>
            <span>&bull;</span>
            <span>14 min read</span>
            <span>&bull;</span>
            <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300">
              System Architecture
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] leading-[1.2] font-normal tracking-tight text-neutral-900 dark:text-neutral-50">
            The Architecture of a Food Ordering Engine: From Bare MySQL to Atomic Transactions
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed pt-2">
            A first-principles guide to building relational catalog pipelines, eager-loading order ledgers, and resolving five critical defects in modern PHP assessments.
          </p>

          <div className="pt-4 flex items-center gap-3 border-t border-neutral-200 dark:border-neutral-800/80">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black flex items-center justify-center font-bold text-xs">
              B
            </div>
            <div className="text-xs">
              <span className="font-medium block text-neutral-900 dark:text-neutral-100">Bari Achmad</span>
              <span className="text-neutral-500 block">Vocational Software Engineer &bull; Tangerang Selatan</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="space-y-12 text-[17px] leading-[1.8] text-neutral-800 dark:text-neutral-300">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              1. The Mental Model: Separation of Public & Merchant Ledgers
            </h2>
            <p>
              In practical certification exams such as the Indonesian National Vocational Standard (LSP RPL), developers are evaluated on their comprehension of two distinct workflows coexisting in one cohesive web application:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-neutral-700 dark:text-neutral-400">
              <li>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Customer Facing (Public):</strong> A self-service menu accessible without authentication. Diners select food portions, submit their table identification, and initiate an atomic checkout.
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Merchant Facing (Authenticated):</strong> Cashiers and restaurant administrators monitor real-time orders, transition preparation stages, and conduct full catalog maintenance with image lifecycle management.
              </li>
            </ul>
            <p>
              When candidates fail this assessment, the underlying cause is rarely unfamiliarity with PHP syntax; it is almost always architectural confusion regarding how table state travels across the HTTP lifecycle.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              2. Daemon Initialization & Port Safety
            </h2>
            <p>
              Before running any framework command, verify that the relational database daemon is listening on port <code className="text-sm font-mono px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800/60">3306</code>. If Apache and MySQL fail to start in XAMPP, the primary culprit in school laboratory machines is a rogue instance of a pre-existing Windows service.
            </p>
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 space-y-2">
              <div className="text-neutral-400 uppercase tracking-widest font-semibold">Diagnostic Terminal Check</div>
              <div># Terminate rogue background services competing for MySQL's port</div>
              <div className="text-black dark:text-white font-semibold">net stop MySQL</div>
              <div># Confirm database readiness via curl or browser verification</div>
              <div className="text-neutral-500">http://127.0.0.1/phpmyadmin</div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              3. The Power of Artifact Generation: What <span className="font-mono text-xl">-mcr</span> Truly Means
            </h2>
            <p>
              Under high-pressure exam conditions, manually constructing migration files, models, and controllers individually wastes up to twenty minutes and introduces typographical errors. Laravel's Artisan command line offers consolidated flag composition:
            </p>
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-neutral-800 mb-2">
                <span className="text-neutral-400">bash</span>
                <button 
                  onClick={() => copyToClipboard('php artisan make:model Food -mcr\nphp artisan make:model Order -mcr\nphp artisan make:model OrderDetail -m', 'mcr_cmd')}
                  className="hover:text-black dark:hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === 'mcr_cmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mcr_cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre>php artisan make:model Food -mcr
php artisan make:model Order -mcr
php artisan make:model OrderDetail -m</pre>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <span className="font-bold block text-neutral-900 dark:text-neutral-100 mb-1">-m (Migration)</span>
                <span className="text-neutral-500">Creates the schema blueprint in database/migrations/.</span>
              </div>
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <span className="font-bold block text-neutral-900 dark:text-neutral-100 mb-1">-c (Controller)</span>
                <span className="text-neutral-500">Generates the class under app/Http/Controllers/.</span>
              </div>
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <span className="font-bold block text-neutral-900 dark:text-neutral-100 mb-1">-r (Resource)</span>
                <span className="text-neutral-500">Scaffolds 7 RESTful methods: index, create, store, edit, etc.</span>
              </div>
            </div>
          </section>

          {/* Section 4: Interactive Code Explorer */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              4. Code Implementation Explorer
            </h2>
            <p>
              Inspect the finalized, production-ready code below. Each component has been verified to adhere strictly to PSR standards and transactional atomicity:
            </p>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-950 text-neutral-200">
              <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('controller')}
                    className={`px-2.5 py-1 rounded transition ${activeTab === 'controller' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    OrderController.php
                  </button>
                  <button 
                    onClick={() => setActiveTab('migration')}
                    className={`px-2.5 py-1 rounded transition ${activeTab === 'migration' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    Migration (order_details)
                  </button>
                  <button 
                    onClick={() => setActiveTab('model')}
                    className={`px-2.5 py-1 rounded transition ${activeTab === 'model' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                  >
                    OrderDetail.php
                  </button>
                </div>
                <button 
                  onClick={() => copyToClipboard(codeSnippets[activeTab].code, 'tab_code')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === 'tab_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'tab_code' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[380px] overflow-y-auto">
                <pre>{codeSnippets[activeTab].code}</pre>
              </div>
            </div>
          </section>

          {/* Section 5: The 5 Fatal Bugs Autopsy */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              5. The Post-Mortem: Five Fatal Flaws Found in Classroom Curriculum
            </h2>
            <p>
              Many students doubt their own programming capabilities when their exam code crashes, when in fact the teaching modules distributed in their classrooms contained systemic logic discrepancies. Here is the forensic breakdown of those five bugs:
            </p>

            <div className="space-y-3 pt-2">
              {bugList.map((bug, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveBug(idx)}
                  className={`p-4 rounded-lg border cursor-pointer transition ${
                    activeBug === idx 
                      ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/70 dark:bg-neutral-900' 
                      : 'border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-neutral-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">{bug.title}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {bug.severity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                    {bug.desc}
                  </p>
                  {activeBug === idx && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                      <div>
                        <span className="text-neutral-500 font-medium">Impact: </span>
                        <span className="text-rose-600 dark:text-rose-400">{bug.consequence}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-medium">Resolution: </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">{bug.solution}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Muscle Memory Drill */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              6. Terminal Muscle Memory Drill
            </h2>
            <p>
              Speed in practical examinations relies on automatic recall. Click any flashcard below to test whether you remember the command syntax without referencing notes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {flashcards.map(card => {
                const isFlipped = flippedCards[card.id];
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCardFlip(card.id)}
                    className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition select-none min-h-[120px] flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {isFlipped ? 'Answer (Click to flip)' : 'Question (Click to reveal)'}
                    </span>
                    <div className="my-2">
                      {isFlipped ? (
                        <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{card.a}</p>
                      ) : (
                        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{card.q}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono text-right">
                      {isFlipped ? 'Tap to hide' : 'Tap to solve'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 7: Persistent Self-Audit Checklist */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-4">
              7. Examiner Readiness Verification
            </h2>
            <p>
              Tick each requirement as you verify your local implementation before demonstrating to assessors. Your progress persists in your browser:
            </p>

            <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-semibold uppercase text-neutral-500">
                  Pre-Flight Checklist
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                  {checkedCount} / 7 Completed
                </span>
              </div>

              {[
                { id: 'c1', label: 'MySQL and Apache running stably on port 3306 without socket errors.' },
                { id: 'c2', label: 'Database migrations execute cleanly with foreign key cascade bindings.' },
                { id: 'c3', label: 'Seeder creates default test administrator (admin@gmail.com / password123).' },
                { id: 'c4', label: 'php artisan storage:link verified; images render correctly in public browser.' },
                { id: 'c5', label: 'Self-ordering customer catalog recalculates subtotal and renders confirmation modal.' },
                { id: 'c6', label: 'Checkout submits via DB::transaction with zero silent rollbacks.' },
                { id: 'c7', label: 'Admin order monitor uses Eager Loading with zero N+1 database queries.' },
              ].map(item => (
                <label 
                  key={item.id} 
                  className="flex items-start gap-3 p-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-850 cursor-pointer transition text-xs text-neutral-700 dark:text-neutral-300"
                >
                  <input 
                    type="checkbox" 
                    checked={checklist[item.id] || false}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-0.5 rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-0"
                  />
                  <span className={checklist[item.id] ? 'line-through text-neutral-400' : ''}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

        </article>

        {/* Article Colophon */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 font-mono space-y-2">
          <p>Published for Indonesian SMK RPL Practical Certification candidates.</p>
          <p>Typeset in Instrument Serif and Inter. Zero gradient, high-contrast editorial standard.</p>
        </div>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-8 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-[720px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Bari Achmad</span>
          <div className="flex items-center gap-4">
            <a href="https://barrydev.icu" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">Portfolio</a>
            <a href="https://github.com/lordbarry21" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">GitHub</a>
            <a href="https://github.com/lordbarry21/serkom-laravel-kuliner" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition">Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

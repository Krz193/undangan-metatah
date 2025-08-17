<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/mepandes', fn () => Inertia::render('mepandes/index'))->name('mepandes');
Route::get('/mepandes-mochi', fn () => Inertia::render('mepandes/index'))->name('mepandes.mochi');

route::get('/', fn () => to_route('mepandes') );


// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

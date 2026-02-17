<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth','verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Http\Controllers\UserController::class)->names('users');
    Route::resource('roles', \App\Http\Controllers\RoleController::class)->names('roles');
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class)->names('permissions');
    Route::resource('tasks', \App\Http\Controllers\TaskController::class)->names('tasks');

});



require __DIR__.'/settings.php';

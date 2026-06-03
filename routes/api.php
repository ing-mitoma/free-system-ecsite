<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::apiResource("products", ProductController::class);
Route::apiResource("users", UserController::class);

Route::post('/cart/summary', [CartController::class, 'getSummary']);
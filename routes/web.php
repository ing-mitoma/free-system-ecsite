<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;


Route::get("/{any?}", function () {
  return view("app");
})->where("any", '^(?!api\/).*$');

Route::post('/api/admin/login', [AdminAuthController::class, 'login']);

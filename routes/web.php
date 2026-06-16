<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;


Route::get("/{any?}", function () {
  return view("app");
})->where("any", '^(?!api\/).*$');

Route::post('/api/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::get('/api/admin/me', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });
    Route::post('/api/admin/logout', [AdminAuthController::class, 'logout']);
});

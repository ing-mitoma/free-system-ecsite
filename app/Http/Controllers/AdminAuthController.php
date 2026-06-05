<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $confirmedInformation = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if(Auth::attempt($confirmedInformation)){
                $request->session()->regenerate();
                return response() -> json([
                    'message'=>'Login Success',
                    'user'=>Auth::user(),
                ], 200);
        };
        return response()->json([
            'message' => 'メールアドレスまたはパスワードが違います。'
        ], 401);
    }
}

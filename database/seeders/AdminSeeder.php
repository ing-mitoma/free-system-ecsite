<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str; 
use Illuminate\Support\Facades\Hash; 

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 💡 パターン1: ログインテスト用に決まったアカウントを作っておく（推奨）
        DB::table('admins')->insert([
            'name'       => 'システム管理者',
            'email'      => 'admin@example.com',
            'password'   => Hash::make('password123'), // 👈 ログイン時は「password123」と入力
            'role'       => 'super_admin',
            'is_active'  => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 💡 パターン2: テスト用にランダムな管理者も数人追加しておく
        for ($i = 0; $i < 3; $i++) {
            DB::table('admins')->insert([
                'name'       => '管理者_' . Str::random(4),
                'email'      => Str::random(8) . '@example.com',
                'password'   => Hash::make('password'),
                'role'       => 'operator', // デフォルト値のままでよければこの行は省略も可能です
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
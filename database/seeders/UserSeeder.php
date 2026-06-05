<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder

{
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'name'              => 'テストユーザー_' . Str::random(4),
                'email'             => Str::random(8) . '@example.com',
                'password'          => Hash::make('password'),
                'created_at'        => now(),
                'updated_at'        => now(),
            ]);
        }
    }
}

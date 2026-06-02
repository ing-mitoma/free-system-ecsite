<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 100; $i++) {
            DB::table('products')->insert([
            'name'       => 'aaabbb',
            'price'      => '123123',
            'stock'  => '123',
            'category' => 'アパレル',
            'emoji' => 'aaaa',
            'description' => 'ccccccccc',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        }
    }
}

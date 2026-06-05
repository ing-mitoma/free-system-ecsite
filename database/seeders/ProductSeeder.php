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
        $productTemplates = [
            ['name' => 'ヘンリーネックTシャツ', 'emoji' => '👕'],
            ['name' => 'クラシックデニムジーンズ', 'emoji' => '👖'],
            ['name' => 'ウールテーラードジャケット', 'emoji' => '🧥'],
            ['name' => 'カジュアルスニーカー', 'emoji' => '👟'],
            ['name' => 'キャンバストートバッグ', 'emoji' => '👜'],
            ['name' => 'マウンテンパーカー', 'emoji' => '🧥'],
            ['name' => 'コーデュロイキャップ', 'emoji' => '🧢'],
            ['name' => 'レザーベルト', 'emoji' => '🥋'],
            ['name' => 'オックスフォードシャツ', 'emoji' => '👔'],
            ['name' => 'スウェットパーカー', 'emoji' => '👚'],
        ];

        for ($i = 0; $i < 100; $i++) {
            $randomIndex = array_rand($productTemplates);
            $selectedProduct = $productTemplates[$randomIndex];

            DB::table('products')->insert([
                'name'        => $selectedProduct['name'],
                'price'       => "{$i}0000",
                'stock'       => '123',
                'category'    => 'アパレル',
                'emoji'       => $selectedProduct['emoji'],
                'description' => '優れた吸汗力と通気性を持つ生地を使用した商品です。',
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}

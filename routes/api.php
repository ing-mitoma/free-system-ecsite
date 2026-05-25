<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 🛒 フロントエンドのReactが商品一覧を取得するためのAPIURL
Route::get('/products', function () {
    $products = [
        ['id' => 1, 'name' => 'プレミアム レザーミニウォレット', 'price' => 12800, 'category' => '財布・小物', 'emoji' => '👛', 'is_new' => true],
        ['id' => 2, 'name' => 'クラシックキャンバス トートバッグ', 'price' => 8500, 'category' => 'バッグ', 'emoji' => '👜', 'is_new' => false],
        ['id' => 3, 'name' => 'コンフォート ニットスニーカー', 'price' => 14200, 'category' => 'シューズ', 'emoji' => '👟', 'is_new' => true],
        ['id' => 4, 'name' => 'ミニマル デニムジャケット', 'price' => 18000, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => false],
    ];

    return response()->json($products);
});

Route::get('/products/{id}', function ($id) {
    // 本来はデータベースから探しますが、今回は同じダミー配列（説明文付き）から探します
    $products = [
        ['id' => 1, 'name' => 'プレミアム レザーミニウォレット', 'price' => 12800, 'category' => '財布・小物', 'emoji' => '👛', 'is_new' => true, 'description' => '【APIから取得】厳選された高級牛革を贅沢に使用したミニウォレット。手のひらサイズでありながら、抜群の収納力を誇ります。使い込むほどに味わいが増す経年変化をお楽しみください。'],
        ['id' => 2, 'name' => 'クラシックキャンバス トートバッグ', 'price' => 8500, 'category' => 'バッグ', 'emoji' => '👜', 'is_new' => false, 'description' => '【APIから取得】厚手のタフなキャンバス生地を使用したトートバッグ。A4サイズが余裕で入る大容量設計で、通勤通学から普段使いまで幅広く活躍します。'],
        ['id' => 3, 'name' => 'コンフォート ニットスニーカー', 'price' => 14200, 'category' => 'シューズ', 'emoji' => '👟', 'is_new' => true, 'description' => '【APIから取得】通気性と伸縮性に優れたニット素材を使用した超軽量スニーカー。まるで靴下を履いているかのような極上のフィット感で、長時間の歩行でも疲れません。'],
        ['id' => 4, 'name' => 'ミニマル デニムジャケット', 'price' => 18000, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => false, 'description' => '【APIから取得】洗練されたミニマルなデザインのデニムジャケット。程よい厚みのストレッチデニムを採用し、美しいシルエットと動きやすさを両立しました。'],
    ];

    // 配列の中からIDが一致するものを検索
    $product = collect($products)->firstWhere('id', (int)$id);

    // もし見つからなければ404エラーを返す
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    return response()->json($product);
});
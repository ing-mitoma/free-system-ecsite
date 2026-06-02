<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource("products", ProductController::class);
Route::apiResource("admins", AdminController::class);

// 🛒 フロントエンドのReactが商品一覧を取得するためのAPIURL
// Route::get('/products', function () {
//     $products = [
//         ['id' => 1, 'name' => 'プレミアム レザーミニウォレット', 'price' => 12800, 'category' => '財布・小物', 'emoji' => '👛', 'is_new' => true],
//         ['id' => 2, 'name' => 'クラシックキャンバス トートバッグ', 'price' => 8500, 'category' => 'バッグ', 'emoji' => '👜', 'is_new' => false],
//         ['id' => 3, 'name' => 'コンフォート ニットスニーカー', 'price' => 14200, 'category' => 'シューズ', 'emoji' => '👟', 'is_new' => true],
//         ['id' => 4, 'name' => 'ミニマル デニムジャケット', 'price' => 18000, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => false],
//         ['id' => 5, 'name' => 'オーガニックコットン リラックスTシャツ', 'price' => 4900, 'category' => 'アパレル', 'emoji' => '👕', 'is_new' => true],
//         ['id' => 6, 'name' => 'ウォータープルーフ バックパック', 'price' => 16500, 'category' => 'バッグ', 'emoji' => '🎒', 'is_new' => true],
//         ['id' => 7, 'name' => 'チタンフレーム ミニマルアイウェア', 'price' => 24000, 'category' => 'アクセサリー', 'emoji' => '👓', 'is_new' => false],
//         ['id' => 8, 'name' => 'スマート メッシュクロノグラフ', 'price' => 32000, 'category' => '時計', 'emoji' => '⌚', 'is_new' => true],
//         ['id' => 9, 'name' => 'シルク混 クルーネックセーター', 'price' => 11000, 'category' => 'アパレル', 'emoji' => '🧶', 'is_new' => false],
//         ['id' => 10, 'name' => 'ヴィーガンレザー チェルシーブーツ', 'price' => 19800, 'category' => 'シューズ', 'emoji' => '🥾', 'is_new' => false],
//         ['id' => 11, 'name' => '真鍮製 ミニマルキーリング', 'price' => 3500, 'category' => '財布・小物', 'emoji' => '🔑', 'is_new' => false],
//         ['id' => 12, 'name' => 'トラベル アルミニウムスーツケース', 'price' => 45000, 'category' => 'バッグ', 'emoji' => '🧳', 'is_new' => true],
//         ['id' => 13, 'name' => '高音質ノイズキャンセリング ヘッドホン', 'price' => 29800, 'category' => 'ガジェット', 'emoji' => '🎧', 'is_new' => true],
//         ['id' => 14, 'name' => 'ウールフェルト ミニマルハット', 'price' => 7800, 'category' => 'アクセサリー', 'emoji' => '👒', 'is_new' => false],
//         ['id' => 15, 'name' => 'テーラード ストレッチチノパン', 'price' => 9800, 'category' => 'アパレル', 'emoji' => '👖', 'is_new' => false],
//         ['id' => 16, 'name' => '超軽量 カーボンアンブレラ', 'price' => 6200, 'category' => 'アクセサリー', 'emoji' => '🌂', 'is_new' => false],
//         ['id' => 17, 'name' => 'マグネット式 アルミニウムカードケース', 'price' => 5500, 'category' => '財布・小物', 'emoji' => '💳', 'is_new' => true],
//         ['id' => 18, 'name' => 'プレミアムリネン リラックスシャツ', 'price' => 8800, 'category' => 'アパレル', 'emoji' => '👔', 'is_new' => false],
//         ['id' => 19, 'name' => 'クラシック スエードローファー', 'price' => 17500, 'category' => 'シューズ', 'emoji' => '👞', 'is_new' => false],
//         ['id' => 20, 'name' => 'ワイヤレス急速充電 メタルスタンド', 'price' => 4800, 'category' => 'ガジェット', 'emoji' => '⚡', 'is_new' => true],
//         ['id' => 21, 'name' => 'リサイクルポリエステル ウインドブレーカー', 'price' => 13500, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => true],
//         ['id' => 22, 'name' => '本革 マグネットウォッチバンド', 'price' => 6800, 'category' => '時計', 'emoji' => '📿', 'is_new' => false],
//         ['id' => 23, 'name' => 'キャンバス ミニサコッシュ', 'price' => 4200, 'category' => 'バッグ', 'emoji' => '🛍️', 'is_new' => false],
//         ['id' => 24, 'name' => 'アルミニウム メカニカルペンシル', 'price' => 3800, 'category' => 'ステーショナリー', 'emoji' => '✏️', 'is_new' => false],
//         ['id' => 25, 'name' => 'ハードカバー ミニマルノート（A5）', 'price' => 2400, 'category' => 'ステーショナリー', 'emoji' => '📓', 'is_new' => true],
//         ['id' => 26, 'name' => 'ヘビーウェイト スウェットパーカー', 'price' => 10500, 'category' => 'アパレル', 'emoji' => '🧘', 'is_new' => false],
//         ['id' => 27, 'name' => 'コンパクト 真空断熱サーモボトル', 'price' => 3900, 'category' => 'ライフスタイル', 'emoji' => '🥛', 'is_new' => true],
//         ['id' => 28, 'name' => 'イタリアンレザー マネークリップ', 'price' => 8900, 'category' => '財布・小物', 'emoji' => '💵', 'is_new' => false],
//         ['id' => 29, 'name' => 'ブークレニット ビーニー', 'price' => 3500, 'category' => 'アクセサリー', 'emoji' => '🧢', 'is_new' => false],
//         ['id' => 30, 'name' => 'アロマディフューザー ソリッドウッド', 'price' => 7200, 'category' => 'ライフスタイル', 'emoji' => '🪵', 'is_new' => true],
//         ['id' => 31, 'name' => 'ポータブル 超薄型メカニカルキーボード', 'price' => 18500, 'category' => 'ガジェット', 'emoji' => '⌨️', 'is_new' => true],
//         ['id' => 32, 'name' => 'ヴィンテージツイル キャップ', 'price' => 4500, 'category' => 'アクセサリー', 'emoji' => '👒', 'is_new' => false],
//         ['id' => 33, 'name' => 'コンフォート サンダル（EVA）', 'price' => 5800, 'category' => 'シューズ', 'emoji' => '🩴', 'is_new' => true],
//         ['id' => 34, 'name' => 'スターリングシルバー ミニマルリング', 'price' => 12000, 'category' => 'アクセサリー', 'emoji' => '💍', 'is_new' => false],
//     ];

//     return response()->json($products);
// });

// Route::get('/products/{id}', function ($id) {
//     // 本来はデータベースから探しますが、今回は同じダミー配列（説明文付き）から探します
//     $products = [
//     // 既存の4件
//     ['id' => 1, 'name' => 'プレミアム レザーミニウォレット', 'price' => 12800, 'category' => '財布・小物', 'emoji' => '👛', 'is_new' => true],
//     ['id' => 2, 'name' => 'クラシックキャンバス トートバッグ', 'price' => 8500, 'category' => 'バッグ', 'emoji' => '👜', 'is_new' => false],
//     ['id' => 3, 'name' => 'コンフォート ニットスニーカー', 'price' => 14200, 'category' => 'シューズ', 'emoji' => '👟', 'is_new' => true],
//     ['id' => 4, 'name' => 'ミニマル デニムジャケット', 'price' => 18000, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => false],

//     // 追加の30件（ID: 5 〜 34）
//     ['id' => 5, 'name' => 'オーガニックコットン リラックスTシャツ', 'price' => 4900, 'category' => 'アパレル', 'emoji' => '👕', 'is_new' => true],
//     ['id' => 6, 'name' => 'ウォータープルーフ バックパック', 'price' => 16500, 'category' => 'バッグ', 'emoji' => '🎒', 'is_new' => true],
//     ['id' => 7, 'name' => 'チタンフレーム ミニマルアイウェア', 'price' => 24000, 'category' => 'アクセサリー', 'emoji' => '👓', 'is_new' => false],
//     ['id' => 8, 'name' => 'スマート メッシュクロノグラフ', 'price' => 32000, 'category' => '時計', 'emoji' => '⌚', 'is_new' => true],
//     ['id' => 9, 'name' => 'シルク混 クルーネックセーター', 'price' => 11000, 'category' => 'アパレル', 'emoji' => '🧶', 'is_new' => false],
//     ['id' => 10, 'name' => 'ヴィーガンレザー チェルシーブーツ', 'price' => 19800, 'category' => 'シューズ', 'emoji' => '🥾', 'is_new' => false],
//     ['id' => 11, 'name' => '真鍮製 ミニマルキーリング', 'price' => 3500, 'category' => '財布・小物', 'emoji' => '🔑', 'is_new' => false],
//     ['id' => 12, 'name' => 'トラベル アルミニウムスーツケース', 'price' => 45000, 'category' => 'バッグ', 'emoji' => '🧳', 'is_new' => true],
//     ['id' => 13, 'name' => '高音質ノイズキャンセリング ヘッドホン', 'price' => 29800, 'category' => 'ガジェット', 'emoji' => '🎧', 'is_new' => true],
//     ['id' => 14, 'name' => 'ウールフェルト ミニマルハット', 'price' => 7800, 'category' => 'アクセサリー', 'emoji' => '👒', 'is_new' => false],
//     ['id' => 15, 'name' => 'テーラード ストレッチチノパン', 'price' => 9800, 'category' => 'アパレル', 'emoji' => '👖', 'is_new' => false],
//     ['id' => 16, 'name' => '超軽量 カーボンアンブレラ', 'price' => 6200, 'category' => 'アクセサリー', 'emoji' => '🌂', 'is_new' => false],
//     ['id' => 17, 'name' => 'マグネット式 アルミニウムカードケース', 'price' => 5500, 'category' => '財布・小物', 'emoji' => '💳', 'is_new' => true],
//     ['id' => 18, 'name' => 'プレミアムリネン リラックスシャツ', 'price' => 8800, 'category' => 'アパレル', 'emoji' => '👔', 'is_new' => false],
//     ['id' => 19, 'name' => 'クラシック スエードローファー', 'price' => 17500, 'category' => 'シューズ', 'emoji' => '👞', 'is_new' => false],
//     ['id' => 20, 'name' => 'ワイヤレス急速充電 メタルスタンド', 'price' => 4800, 'category' => 'ガジェット', 'emoji' => '⚡', 'is_new' => true],
//     ['id' => 21, 'name' => 'リサイクルポリエステル ウインドブレーカー', 'price' => 13500, 'category' => 'アパレル', 'emoji' => '🧥', 'is_new' => true],
//     ['id' => 22, 'name' => '本革 マグネットウォッチバンド', 'price' => 6800, 'category' => '時計', 'emoji' => '📿', 'is_new' => false],
//     ['id' => 23, 'name' => 'キャンバス ミニサコッシュ', 'price' => 4200, 'category' => 'バッグ', 'emoji' => '🛍️', 'is_new' => false],
//     ['id' => 24, 'name' => 'アルミニウム メカニカルペンシル', 'price' => 3800, 'category' => 'ステーショナリー', 'emoji' => '✏️', 'is_new' => false],
//     ['id' => 25, 'name' => 'ハードカバー ミニマルノート（A5）', 'price' => 2400, 'category' => 'ステーショナリー', 'emoji' => '📓', 'is_new' => true],
//     ['id' => 26, 'name' => 'ヘビーウェイト スウェットパーカー', 'price' => 10500, 'category' => 'アパレル', 'emoji' => '🧘', 'is_new' => false],
//     ['id' => 27, 'name' => 'コンパクト 真空断熱サーモボトル', 'price' => 3900, 'category' => 'ライフスタイル', 'emoji' => '🥛', 'is_new' => true],
//     ['id' => 28, 'name' => 'イタリアンレザー マネークリップ', 'price' => 8900, 'category' => '財布・小物', 'emoji' => '💵', 'is_new' => false],
//     ['id' => 29, 'name' => 'ブークレニット ビーニー', 'price' => 3500, 'category' => 'アクセサリー', 'emoji' => '🧢', 'is_new' => false],
//     ['id' => 30, 'name' => 'アロマディフューザー ソリッドウッド', 'price' => 7200, 'category' => 'ライフスタイル', 'emoji' => '🪵', 'is_new' => true],
//     ['id' => 31, 'name' => 'ポータブル 超薄型メカニカルキーボード', 'price' => 18500, 'category' => 'ガジェット', 'emoji' => '⌨️', 'is_new' => true],
//     ['id' => 32, 'name' => 'ヴィンテージツイル キャップ', 'price' => 4500, 'category' => 'アクセサリー', 'emoji' => '👒', 'is_new' => false],
//     ['id' => 33, 'name' => 'コンフォート サンダル（EVA）', 'price' => 5800, 'category' => 'シューズ', 'emoji' => '🩴', 'is_new' => true],
//     ['id' => 34, 'name' => 'スターリングシルバー ミニマルリング', 'price' => 12000, 'category' => 'アクセサリー', 'emoji' => '💍', 'is_new' => false],
// ];

//     // 配列の中からIDが一致するものを検索
//     $product = collect($products)->firstWhere('id', (int)$id);

//     // もし見つからなければ404エラーを返す
//     if (!$product) {
//         return response()->json(['message' => 'Product not found'], 404);
//     }
//     if (!isset($product['description'])) {
//         $product['description'] = "【APIから取得】ミニマルなデザインと機能性を両立した「{$product['name']}」。洗練されたライフスタイルに寄り添う、当ショップ厳選のクオリティをお楽しみください。";
//     }

//     return response()->json($product);
// });

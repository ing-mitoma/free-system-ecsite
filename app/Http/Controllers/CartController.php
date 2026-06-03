<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getSummary(Request $request){
        $cartItems = $request->input('items');

        $calculatedItems = [];
        $totalAmount = 0;
        foreach($cartItems as $cartItem){
            $productId = $cartItem['product_id'];
            $quantity = $cartItem['quantity'];

            $product = Product::find($productId);

            if(!$product){
                continue;
            }
            $subtotal = $product -> price * $quantity;
            $totalAmount += $subtotal;

            $calculatedItems[] = [
                'product_id' => $product->id,
                'name'       => $product->name,
                'emoji'      => $product->emoji,
                'price'      => $product->price,
                'quantity'   => $quantity,
                'subtotal'   => $subtotal,
            ];
           }

    return response()->json([
    'items' => $calculatedItems,
    'total_amount' => $totalAmount,
    ], 200);
    }
}

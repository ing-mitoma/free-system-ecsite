<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $users = User::all();
    return response()->json($users);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $user = User::create($request->all());
    return response()->json($user, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $user = User::find($id);
    return response()->json($user);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $user = User::find($id);
    $user->update($request->all());
    return response()->json($user);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $user = User::find($id);
    $user->delete();
    return response()->json(null, 204);
  }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\ItemListController2;
use App\Http\Controllers\ShopListController;
use App\Http\Controllers\ShopItemListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup', [UserController::class, 'signup']);
Route::post('login', [UserController::class, 'login']);
Route::post('addList', [ListController::class, 'addList']);
Route::post('viewList', [ListController::class, 'viewList']);
Route::post('addShopList', [ShopListController::class, 'addShopList']);
Route::post('viewShopList', [ShopListController::class, 'viewShopList']);
Route::post('addItem', [ItemListController2::class, 'addItem']);
Route::post('viewItem', [ItemListController2::class, 'viewItem']);
Route::delete('deleteItem/{id}', [ItemListController2::class, 'deleteItem']);
Route::delete('deleteList/{id}', [ItemListController2::class, 'deleteList']);
Route::get('getItem/{id}', [ItemListController2::class, 'getItem']);
Route::post('updateCheck/{id}', [ItemListController2::class, 'updateCheck']);
Route::post('updateItem', [ItemListController2::class, 'updateItem']);
Route::post('deleteImage/{id}', [ItemListController2::class, 'deleteImage']);
Route::post('addShopItem', [ShopItemListController::class, 'addShopItem']);
Route::post('viewShopItem', [ShopItemListController::class, 'viewShopItem']);
Route::delete('deleteShopItem/{id}', [ShopItemListController::class, 'deleteShopItem']);
Route::delete('deleteShopList/{id}', [ShopItemListController::class, 'deleteShopList']);
Route::get('getShopItem/{id}', [ShopItemListController::class, 'getShopItem']);
Route::post('updateShopCheck/{id}', [ShopItemListController::class, 'updateShopCheck']);
Route::post('updateShopItem', [ShopItemListController::class, 'updateShopItem']);
Route::post('deleteShopImage/{id}', [ShopItemListController::class, 'deleteShopImage']);

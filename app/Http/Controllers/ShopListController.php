<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shoplist;

class ShopListController extends Controller
{
	function addShopList(Request $req) {
		$shoplist = new Shoplist;
		$shoplist->name = $req->input('name');
		$shoplist->id_user = $req->input('id');
		$shoplist->save();
		return $shoplist;
	}
	function viewShopList(Request $req) {
		$result = Shoplist::where('id_user',$req->id)->get();
		return $result;
	}
}

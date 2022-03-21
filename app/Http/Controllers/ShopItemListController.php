<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shopitemlist;
use App\Models\Shoplist;

class ShopItemListController extends Controller
{
 	function addShopItem(Request $req) {
		$shopitemlist = new Shopitemlist;
		$shopitemlist->idlist = $req->input('idlist');
		$shopitemlist->name = $req->input('name');
		$shopitemlist->save();
		return $shopitemlist;
	}

	function viewShopItem(Request $req) {
		$result = Shopitemlist::where('idlist',$req->idlist)->get();
		return $result;
	}

	function deleteShopItem($id) {
		$result = Shopitemlist::where('id',$id)->delete();
		if($result) {
			return ["result"=>"item has been deleted"];
		} else {
			return ["error"=>"process failed"];
		}
	}

	function deleteShopList($id) {
		$result = Shoplist::where('id',$id)->delete();
		$result = Shopitemlist::where('idlist',$id)->delete();
		if($result) {
			return ["result"=>"item has been deleted"];
		} else {
			return ["error"=>"process failed"];
		}
	}

	function getShopItem($id) {
		return Shopitemlist::find($id);
	}
	function updateShopCheck($id) {
		$result = Shopitemlist::find($id);
		$result->done = !$result->done;
		$result->save();
		return $result;
	}

	function deleteShopImage($id) {
		$result = Shopitemlist::find($id);
		$result->image = NULL;
		$result->done = false;
		$result->save();
		return $result;
	}

	function updateShopItem(Request $req) {
		$result = Shopitemlist::where('id',$req->id)->first();
		$result->name = $req->input('name');
		$result->done = false;
		if($req->description == 'null')
			$result->description = NULL;
		else
			$result->description = $req->input('description');
		if($req->file('file'))
			$result->image=$req->file('file')->store('items');
		$result->quantity = $req->input('quantity');
		$result->save();
		return $result;
	}

}

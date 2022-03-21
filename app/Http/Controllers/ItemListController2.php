<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Itemlist;
use App\Models\Lists;

class ItemListController2 extends Controller
{
 	function addItem(Request $req) {
		$itemlist = new Itemlist;
		$itemlist->idlist = $req->input('idlist');
		$itemlist->name = $req->input('name');
		$itemlist->save();
		return $itemlist;
	}

	function viewItem(Request $req) {
		$result = Itemlist::where('idlist',$req->idlist)->get();
		return $result;
	}

	function deleteItem($id) {
		$result = Itemlist::where('id',$id)->delete();
		if($result) {
			return ["result"=>"item has been deleted"];
		} else {
			return ["error"=>"process failed"];
		}
	}

	function deleteList($id) {
		$result = Itemlist::where('idlist',$id)->delete();
		$result = Lists::where('id',$id)->delete();
		if($result) {
			return ["result"=>"item has been deleted"];
		} else {
			return ["error"=>"process failed"];
		}
	}

	function getItem($id) {
		return Itemlist::find($id);
	}
	function updateCheck($id) {
		$result = Itemlist::find($id);
		$result->done = !$result->done;
		$result->save();
		return $result;
	}

	function deleteImage($id) {
		$result = Itemlist::find($id);
		$result->image = NULL;
		$result->done = false;
		$result->save();
		return $result;
	}

	function updateItem(Request $req) {
		$result = Itemlist::where('id',$req->id)->first();
		$result->name = $req->input('name');
		$result->done = false;
		if($req->description == 'null')
			$result->description = NULL;
		else
			$result->description = $req->input('description');
		if($req->file('file'))
			$result->image=$req->file('file')->store('items');
		$result->save();
		return $result;
	}

}

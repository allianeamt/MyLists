<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lists;

class ListController extends Controller
{
	function addList(Request $req) {
		$lists = new Lists;
		$lists->name = $req->input('name');
		$lists->id_user = $req->input('id');
		$lists->save();
		return $lists;
	}
	function viewList(Request $req) {
		$result = Lists::where('id_user',$req->id)->get();
		return $result;
	}
}

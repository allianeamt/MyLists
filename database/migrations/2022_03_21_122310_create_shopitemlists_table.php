<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopItemListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopitemlists', function (Blueprint $shopitemlist) {
            $shopitemlist->increments('id');
            $shopitemlist->string('name',100);
            $shopitemlist->integer('idlist');
            $shopitemlist->string('description',100)->nullable()->default(NULL);
            $shopitemlist->string('image',100)->nullable()->default(NULL);
            $shopitemlist->boolean('done')->default(0);
            $shopitemlist->integer('quantity')->default(1); 
            $shopitemlist->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopitemlists');
    }
}

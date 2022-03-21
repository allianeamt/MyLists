<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('itemlists', function (Blueprint $itemlist) {
            $itemlist->increments('id');
            $itemlist->string('name',100);
            $itemlist->integer('idlist');
            $itemlist->string('description',100)->nullable()->default(NULL);
            $itemlist->string('image',100)->nullable()->default(NULL);
            $itemlist->boolean('done')->default(0);
            $itemlist->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('itemlists');
    }
}

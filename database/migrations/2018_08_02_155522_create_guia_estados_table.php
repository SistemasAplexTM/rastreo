<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGuiaEstadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guia_estados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('observacion', 255);
            $table->timestamps();
        });
        Schema::table('guia_estados', function (Blueprint $table) {
            $table->unsignedInteger('guia_id')  ;
            $table->foreign('guia_id')->references('id')->on('guias');
            $table->unsignedInteger('estado_id')  ;
            $table->foreign('estado_id')->references('id')->on('estados');
            $table->unsignedInteger('user_id')  ;
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guia_estados');
    }
}

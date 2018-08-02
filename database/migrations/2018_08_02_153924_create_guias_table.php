<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGuiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('numero', 100);
            $table->date('fecha_embarque');
            $table->date('fecha_dex');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('guias', function (Blueprint $table) {
            $table->unsignedInteger('tipo_guia_id')  ;
            $table->foreign('tipo_guia_id')->references('id')->on('tipo_guias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guias');
    }
}

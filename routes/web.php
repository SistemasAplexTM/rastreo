<?php

Auth::routes();

Route::get('rastreo', 'DocumentoController@rastreo')->name('rastreo');
Route::get('rastrear/{numero}', 'DocumentoController@rastrear');
Route::get('home', 'HomeController@index')->name('home');
Route::group(['middleware' => ['auth']],function(){
  Route::get('/', 'DocumentoController@index');

  Route::delete('user/{id}', 'UserController@destroy');
  Route::put('users/{id}', 'UserController@update');
  Route::post('users', 'UserController@store');
  Route::get('users', 'UserController@index')->name('user');
  Route::get('user/validateEmail/{email}', 'UserController@validateEmail');
  Route::get('users/all', 'UserController@all');

  // Rutas del módulo tipo de guia
  Route::get('tipo_guia/all', 'TipoGuiaController@all');
  Route::resource('tipo_guia', 'TipoGuiaController')->except([
    'create', 'edit', 'show'
  ]);

  // Rutas del módulo documento
  Route::get('validarestado/{guia}/{estado}', 'DocumentoController@validarestado');
  Route::delete('estado/{guia}/{estado}', 'DocumentoController@destroy_estado');
  Route::post('crearEstado', 'DocumentoController@crearEstado');
  Route::put('updateEstado', 'DocumentoController@updateEstado');
  Route::get('documento/all', 'DocumentoController@all');
  Route::resource('documento', 'DocumentoController')->except([
    'create', 'edit', 'show'
  ]);

  // Rutas del módulo estado
  Route::get('estado/allSelect', 'EstadoController@allSelect');
  Route::get('estado/all', 'EstadoController@all');
  Route::resource('estado', 'EstadoController')->except([
    'create', 'edit', 'show'
  ]);

});

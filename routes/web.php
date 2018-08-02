<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('home', 'HomeController@index')->name('home');
Route::get('users', 'UserController@index')->name('user');
Route::get('users/all', 'UserController@all');

Route::get('document', 'DocumentController@index')->name('document');

// Rutas del módulo estado
Route::get('estado/all', 'EstadoController@all');
Route::resource('estado', 'EstadoController')->except([
    'create', 'edit', 'show'
]);



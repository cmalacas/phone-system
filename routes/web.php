<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware' => 'auth:web'], function() {

    Route::get('/', function () {
        return view('layouts.app');
    }); 


    Route::prefix('/dashboard')->group(function() {

        Route::get('/', function () {
            return view('layouts.app');
        });

        Route::post('/save', 'DashboardController@save');
        Route::get('/{id}/success', 'DashboardController@success');

    });

    Route::post('/get-user-data', 'UserController@get');

    Route::prefix('/companies')->group(function() {

        Route::post('/save', 'CompanyController@save');
        Route::post('/get', 'CompanyController@get');   
        Route::post('/update', 'CompanyController@update');
        Route::post('/delete', 'CompanyController@delete');     
        Route::post('/save-scripts', 'CompanyController@saveScripts');

    });

    Route::prefix('/contacts')->group(function() {

        Route::post('/{id}/get', 'ContactController@get');
        Route::post('/save', 'ContactController@save');   
        Route::post('/update', 'ContactController@update');
        Route::post('/delete', 'ContactController@delete');     

    });

});
